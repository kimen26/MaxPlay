import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const server = new McpServer({
  name: "llm-copains",
  version: "2.0.0",
});

// Option A — Logs auto (filet de sécurité 2026-05-13)
// Chaque appel LLM créatif est sauvegardé dans infra/mcp/logs/<date>/<timestamp>-<tool>-<hash>.md
// → permet de récupérer un texte si main thread crash avant Write tool.
// Dossier gitignored.
const MCP_DIR = dirname(fileURLToPath(import.meta.url));
const LOGS_DIR = join(MCP_DIR, "logs");

async function logCall(
  toolName: string,
  model: string,
  body: Record<string, unknown>,
  responseText: string
): Promise<void> {
  try {
    const now = new Date();
    const dateDir = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const ts = now.toISOString().replace(/[:.]/g, "-");
    const hash = createHash("sha256").update(responseText).digest("hex").slice(0, 8);
    const dir = join(LOGS_DIR, dateDir);
    await mkdir(dir, { recursive: true });
    const filePath = join(dir, `${ts}-${toolName}-${hash}.md`);
    const meta = [
      `tool: ${toolName}`,
      `model: ${model}`,
      `date: ${now.toISOString()}`,
      `request_body: ${JSON.stringify(body)}`,
    ].join("\n");
    const content = `---\n${meta}\n---\n\n${responseText}\n`;
    await writeFile(filePath, content, "utf8");
  } catch {
    // Logging ne doit JAMAIS casser l'appel principal. Silent fail = OK.
  }
}

async function callOpenAICompat(
  baseUrl: string,
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string,
  extraHeaders: Record<string, string> = {},
  temperature?: number,
  extraBody: Record<string, unknown> = {},
  toolName?: string
): Promise<string> {
  const body: Record<string, unknown> = {
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    ...extraBody,
  };
  if (typeof temperature === "number") {
    body.temperature = temperature;
  }

  const verbose = process.env.MCP_VERBOSE === "1";
  const timeoutMs = Number(process.env.MCP_FETCH_TIMEOUT_MS ?? 600000);
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const log = (msg: string) => {
    if (verbose) process.stderr.write(`[mcp:${toolName ?? "?"}] ${msg}\n`);
  };

  log(`→ POST ${baseUrl}/chat/completions model=${model} promptChars=${userPrompt.length} timeoutMs=${timeoutMs}`);

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        ...extraHeaders,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (e) {
    clearTimeout(timer);
    const elapsed = Date.now() - started;
    const aborted = (e as Error).name === "AbortError";
    const reason = aborted
      ? `timeout after ${elapsed}ms (limite ${timeoutMs}ms) — endpoint ${baseUrl} n'a pas répondu`
      : `network error after ${elapsed}ms: ${(e as Error).message}`;
    log(`✗ ${reason}`);
    throw new Error(reason);
  }
  clearTimeout(timer);
  const elapsed = Date.now() - started;

  if (!response.ok) {
    const err = await response.text();
    log(`✗ HTTP ${response.status} after ${elapsed}ms: ${err.slice(0, 500)}`);
    throw new Error(`API error ${response.status} (${elapsed}ms): ${err}`);
  }

  const data = (await response.json()) as {
    choices: { message: { content: string } }[];
  };
  const text = data.choices[0]?.message?.content ?? "(réponse vide)";
  log(`✓ HTTP ${response.status} after ${elapsed}ms, responseChars=${text.length}`);
  if (toolName) {
    await logCall(toolName, model, body, text);
  }
  return text;
}

server.tool(
  "ask_grok",
  "Pose une question à Grok 4.3 (xAI). reasoning_effort='low' par défaut (juste au-dessus de none, évite le thinking long). Param 'temperature' optionnel (0.0=déterministe, 0.7=nominal, 1.0+=créatif).",
  {
    prompt: z.string().describe("La question ou le texte à soumettre à Grok"),
    system: z.string().optional().describe("Prompt système (rôle, règles, contexte statique). Passé tel quel sans préfixe."),
    temperature: z.number().min(0).max(2).optional().describe("Température LLM (0=déterministe, 0.7=nominal défaut Grok, 1.0+=plus créatif)"),
  },
  async ({ prompt, system, temperature }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { content: [{ type: "text", text: "Erreur: XAI_API_KEY non définie." }], isError: true };
    const systemPrompt = system ?? "Tu es un assistant expert, précis et concis.";
    try {
      const result = await callOpenAICompat(
        "https://api.x.ai/v1",
        apiKey,
        "grok-4.3",
        systemPrompt,
        prompt,
        {},
        temperature,
        { reasoning_effort: "low" },
        "ask_grok"
      );
      return { content: [{ type: "text", text: result }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Erreur Grok: ${(e as Error).message}` }], isError: true };
    }
  }
);

server.tool(
  "ask_kimi",
  "Pose une question à Kimi K2 (via endpoint coding kimi.com qui accepte aussi du créatif/narratif, mode passe-partout). Param 'temperature' optionnel (0=déterministe, 0.6=nominal, 1.0+=créatif).",
  {
    prompt: z.string().describe("La question ou le texte à soumettre à Kimi"),
    system: z.string().optional().describe("Prompt système (rôle, règles, contexte statique). Passé tel quel sans préfixe."),
    temperature: z.number().min(0).max(2).optional().describe("Température LLM (Kimi défaut ~0.6 ; 0=déterministe, 1.0+=plus créatif)"),
  },
  async ({ prompt, system, temperature }) => {
    const apiKey = process.env.MOONSHOT_API_KEY;
    if (!apiKey) return { content: [{ type: "text", text: "Erreur: MOONSHOT_API_KEY non définie." }], isError: true };
    const systemPrompt = system ?? "Tu es un assistant expert, précis et concis.";
    try {
      const result = await callOpenAICompat(
        "https://api.kimi.com/coding/v1",
        apiKey,
        "kimi-for-coding",
        systemPrompt,
        prompt,
        {
          "User-Agent": "claude-code/1.9.0 (win32; x64)",
          "X-Client-Name": "claude-code",
          "X-Client-Version": "1.9.0",
        },
        temperature,
        {},
        "ask_kimi"
      );
      return { content: [{ type: "text", text: result }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Erreur Kimi: ${(e as Error).message}` }], isError: true };
    }
  }
);

server.tool(
  "ask_kimi_payant",
  "Pose une question à Kimi K2.6 via l'API Moonshot OFFICIELLE PAYANTE (platform.moonshot.ai). USAGE STRICTEMENT RÉSERVÉ aux 2 writers narratifs qui en ont besoin : kimi-reco (Instant, top_p 0.95, temp 1.0) et kimi-thinking (mode thinking activé, K2.6 défaut). Pour tout autre usage, utiliser ask_kimi (gratuit). Voir narration/pmo/INVARIANTS.md § Casting writers étape 4. NB : K2.6 utilise température fixe 1.0 et a le thinking ACTIVÉ par défaut — pour Instant il faut explicitement disabled.",
  {
    prompt: z.string().describe("La question ou le texte à soumettre à Kimi (USAGE WRITERS NARRATIFS UNIQUEMENT)"),
    system: z.string().optional().describe("Prompt système (rôle, règles, contexte statique). Passé tel quel sans préfixe."),
    temperature: z.number().min(0).max(2).optional().describe("Température (K2.6 = 1.0 fixe selon doc Moonshot)"),
    top_p: z.number().min(0).max(1).optional().describe("Top-p (reco Moonshot : 0.95)"),
    thinking: z.enum(["enabled", "disabled"]).optional().describe("Mode thinking K2.6 — 'enabled' (writer #9 kimi-thinking, défaut K2.6) ou 'disabled' (writer #8 kimi-reco Instant). Si omis = défaut K2.6 = enabled."),
  },
  async ({ prompt, system, temperature, top_p, thinking }) => {
    const apiKey = process.env.MOONSHOT_PAYANT_API_KEY;
    if (!apiKey) return { content: [{ type: "text", text: "Erreur: MOONSHOT_PAYANT_API_KEY non définie. Cette key est distincte de MOONSHOT_API_KEY (gratuit) et réservée aux writers narratifs kimi-reco + kimi-thinking. Voir narration/equipe/references/temperatures-llm.md." }], isError: true };
    const systemPrompt = system ?? "Tu es un assistant expert, précis et concis.";
    const extraBody: Record<string, unknown> = {};
    if (typeof top_p === "number") extraBody.top_p = top_p;
    if (thinking) extraBody.thinking = { type: thinking };
    try {
      const result = await callOpenAICompat(
        "https://api.moonshot.ai/v1",
        apiKey,
        "kimi-k2.6",
        systemPrompt,
        prompt,
        {},
        temperature,
        extraBody,
        "ask_kimi_payant"
      );
      return { content: [{ type: "text", text: result }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Erreur Kimi PAYANT: ${(e as Error).message}` }], isError: true };
    }
  }
);

server.tool(
  "ask_deepseek",
  "Pose une question à DeepSeek V4. Modèle 'pro' (défaut, plus capable) ou 'flash' (rapide). Mode non-thinking. Promo -75% sur V4-Pro jusqu'au 2026-05-31.",
  {
    prompt: z.string().describe("La question ou le texte à soumettre à DeepSeek"),
    system: z.string().optional().describe("Prompt système (rôle, règles, contexte statique). Passé tel quel sans préfixe."),
    model: z.enum(["deepseek-v4-pro", "deepseek-v4-flash"]).optional().default("deepseek-v4-pro").describe("v4-pro = plus capable (1.6T params, promo -75% jusqu'au 2026-05-31) | v4-flash = rapide (284B params)"),
    temperature: z.number().min(0).max(2).optional().describe("Température LLM (DeepSeek défaut ~1.0 ; 0=déterministe, 1.5=plus créatif)"),
  },
  async ({ prompt, system, model, temperature }) => {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) return { content: [{ type: "text", text: "Erreur: DEEPSEEK_API_KEY non définie." }], isError: true };
    const systemPrompt = system ?? "Tu es un assistant expert, précis et concis.";
    try {
      const result = await callOpenAICompat(
        "https://api.deepseek.com/v1",
        apiKey,
        model ?? "deepseek-v4-pro",
        systemPrompt,
        prompt,
        {},
        temperature,
        {},
        "ask_deepseek"
      );
      return { content: [{ type: "text", text: result }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Erreur DeepSeek: ${(e as Error).message}` }], isError: true };
    }
  }
);

server.tool(
  "tts_elevenlabs",
  "Convertit du texte en audio via ElevenLabs. Retourne le chemin du fichier MP3 généré dans temp/. Pour utiliser les audio tags v3 (`[softly]`, `[laughs]`, `[whispers]`, etc.), passer `model_id: \"eleven_v3\"` (sinon les tags sont prononcés littéralement).",
  {
    text: z.string().max(5000).describe("Texte à synthétiser"),
    voice_id: z.string().optional().default("21m00Tcm4TlvDq8ikWAM").describe("ID de voix ElevenLabs (défaut: Rachel)"),
    output_name: z.string().optional().default("tts_output").describe("Nom du fichier de sortie (sans extension)"),
    model_id: z
      .enum(["eleven_v3", "eleven_multilingual_v2", "eleven_turbo_v2_5", "eleven_flash_v2_5"])
      .optional()
      .default("eleven_multilingual_v2")
      .describe(
        "Modèle ElevenLabs. `eleven_v3` (alpha) supporte les audio tags inline ([softly], [laughs], etc.). `eleven_multilingual_v2` (défaut) = stable, pas de tags. `turbo`/`flash` = temps réel low-latency."
      ),
    stability: z.number().min(0).max(1).optional().default(0.5).describe("Voice stability (0=créatif, 1=stable)"),
    similarity_boost: z.number().min(0).max(1).optional().default(0.75).describe("Similarity boost (proximité voice_id source)"),
    style: z.number().min(0).max(1).optional().default(0).describe("Style exaggeration (0=neutre, 1=très expressif). Recommandé 0.2-0.55 pour narration."),
    speaker_boost: z.boolean().optional().default(false).describe("Speaker boost (clarté augmentée)"),
  },
  async ({ text, voice_id, output_name, model_id, stability, similarity_boost, style, speaker_boost }) => {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) return { content: [{ type: "text", text: "Erreur: ELEVENLABS_API_KEY non définie." }], isError: true };

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text,
          model_id,
          voice_settings: {
            stability,
            similarity_boost,
            style,
            use_speaker_boost: speaker_boost,
          },
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`ElevenLabs error ${response.status}: ${err}`);
      }

      const audioBuffer = await response.arrayBuffer();
      const outputPath = `c:/ProjetsPerso/Claude_Projects/MaxPlay/temp/${output_name}.mp3`;
      await Bun.write(outputPath, audioBuffer);

      return {
        content: [
          {
            type: "text",
            text: `Audio généré : ${outputPath} (${Math.round(audioBuffer.byteLength / 1024)} KB) · modèle: ${model_id} · stability: ${stability} · style: ${style}`,
          },
        ],
      };
    } catch (e) {
      return { content: [{ type: "text", text: `Erreur ElevenLabs: ${(e as Error).message}` }], isError: true };
    }
  }
);

async function elevenLabsRequest(
  apiKey: string,
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(init.headers);
  headers.set("xi-api-key", apiKey);
  const response = await fetch(`https://api.elevenlabs.io${path}`, {
    ...init,
    headers,
  });
  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`ElevenLabs ${response.status} on ${path}: ${errBody}`);
  }
  return response;
}

async function pollChapterReady(
  apiKey: string,
  projectId: string,
  chapterId: string,
  maxAttempts: number = 60,
  delayMs: number = 5000
): Promise<{ chapter_snapshot_id: string }> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    const r = await elevenLabsRequest(
      apiKey,
      `/v1/studio/projects/${projectId}/chapters/${chapterId}`
    );
    const data = (await r.json()) as {
      state: string;
      conversion_progress?: number;
      can_be_downloaded?: boolean;
    };
    if (data.state === "default" && data.can_be_downloaded !== false) {
      const snapshotsRes = await elevenLabsRequest(
        apiKey,
        `/v1/studio/projects/${projectId}/chapters/${chapterId}/snapshots`
      );
      const snapshots = (await snapshotsRes.json()) as {
        snapshots: { chapter_snapshot_id: string; created_at_unix: number }[];
      };
      const latest = snapshots.snapshots.sort(
        (a, b) => b.created_at_unix - a.created_at_unix
      )[0];
      if (!latest) {
        throw new Error("Conversion terminée mais aucun snapshot disponible.");
      }
      return { chapter_snapshot_id: latest.chapter_snapshot_id };
    }
  }
  throw new Error(
    `Conversion non terminée après ${(maxAttempts * delayMs) / 1000}s. Vérifier l'état du projet via l'UI ElevenLabs.`
  );
}

server.tool(
  "studio_audiobook_from_segments",
  "Crée un projet ElevenCreative Studio multi-voix à partir de segments [{voice_id, text}], lance la conversion, récupère le MP3 final. Idéal pour audiobooks avec dialogues entre plusieurs personnages. Tous les audio tags v3 (`[softly]`, `[laughs]`, etc.) inline dans le texte sont supportés.",
  {
    project_name: z.string().describe("Nom du projet Studio (visible dans l'UI ElevenLabs)"),
    segments: z
      .array(
        z.object({
          voice_id: z.string().describe("ID de la voix ElevenLabs pour ce segment"),
          text: z.string().describe("Texte du segment (avec audio tags v3 inline si modèle v3)"),
        })
      )
      .min(1)
      .describe("Liste ordonnée des segments à synthétiser, chacun avec son voice_id"),
    output_path: z
      .string()
      .describe(
        "Chemin absolu de sortie du fichier MP3 final (ex: c:/.../assets/audio/001-final.mp3)"
      ),
    model_id: z
      .enum(["eleven_v3", "eleven_multilingual_v2", "eleven_turbo_v2_5", "eleven_flash_v2_5"])
      .optional()
      .default("eleven_v3")
      .describe("Modèle (eleven_v3 par défaut pour supporter les audio tags inline)"),
    quality_preset: z
      .enum(["standard", "high", "ultra", "ultra_lossless"])
      .optional()
      .default("high")
      .describe("Qualité audio finale"),
    max_wait_seconds: z
      .number()
      .int()
      .min(30)
      .max(900)
      .optional()
      .default(300)
      .describe("Temps max d'attente de la conversion (défaut 5 min)"),
  },
  async ({ project_name, segments, output_path, model_id, quality_preset, max_wait_seconds }) => {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return {
        content: [{ type: "text", text: "Erreur: ELEVENLABS_API_KEY non définie." }],
        isError: true,
      };
    }

    try {
      const chapterContent = [
        {
          name: project_name,
          blocks: segments.map((s) => ({
            sub_type: "p",
            nodes: [
              {
                voice_id: s.voice_id,
                text: s.text,
                type: "tts_node",
              },
            ],
          })),
        },
      ];

      const formData = new FormData();
      formData.append("name", project_name);
      formData.append("from_content_json", JSON.stringify(chapterContent));
      formData.append("default_paragraph_voice_id", segments[0]!.voice_id);
      formData.append("default_model_id", model_id);
      formData.append("quality_preset", quality_preset);
      formData.append("auto_convert", "true");

      const createRes = await elevenLabsRequest(apiKey, "/v1/studio/projects", {
        method: "POST",
        body: formData,
      });
      const createData = (await createRes.json()) as {
        project: { project_id: string };
      };
      const projectId = createData.project.project_id;

      const chaptersRes = await elevenLabsRequest(
        apiKey,
        `/v1/studio/projects/${projectId}/chapters`
      );
      const chaptersData = (await chaptersRes.json()) as {
        chapters: { chapter_id: string }[];
      };
      const chapterId = chaptersData.chapters[0]?.chapter_id;
      if (!chapterId) {
        throw new Error(
          `Projet ${projectId} créé mais aucun chapitre trouvé.`
        );
      }

      const maxAttempts = Math.ceil(max_wait_seconds / 5);
      const { chapter_snapshot_id } = await pollChapterReady(
        apiKey,
        projectId,
        chapterId,
        maxAttempts,
        5000
      );

      const streamRes = await elevenLabsRequest(
        apiKey,
        `/v1/studio/projects/${projectId}/chapters/${chapterId}/snapshots/${chapter_snapshot_id}/stream`,
        { method: "POST" }
      );
      const audioBuffer = await streamRes.arrayBuffer();
      await Bun.write(output_path, audioBuffer);

      const sizeKB = Math.round(audioBuffer.byteLength / 1024);
      return {
        content: [
          {
            type: "text",
            text: `Audiobook généré : ${output_path} (${sizeKB} KB) · ${segments.length} segments · projet Studio ${projectId} · chapter ${chapterId} · snapshot ${chapter_snapshot_id}`,
          },
        ],
      };
    } catch (e) {
      return {
        content: [
          { type: "text", text: `Erreur Studio audiobook: ${(e as Error).message}` },
        ],
        isError: true,
      };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
