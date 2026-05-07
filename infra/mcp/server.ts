import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "llm-copains",
  version: "2.0.0",
});

async function callOpenAICompat(
  baseUrl: string,
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string,
  extraHeaders: Record<string, string> = {},
  temperature?: number,
  extraBody: Record<string, unknown> = {}
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
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = (await response.json()) as {
    choices: { message: { content: string } }[];
  };
  return data.choices[0]?.message?.content ?? "(réponse vide)";
}

server.tool(
  "ask_grok",
  "Pose une question à Grok 4.3 (xAI). reasoning_effort='low' par défaut (juste au-dessus de none, évite le thinking long). Param 'temperature' optionnel (0.0=déterministe, 0.7=nominal, 1.0+=créatif).",
  {
    prompt: z.string().describe("La question ou le texte à soumettre à Grok"),
    context: z.string().optional().describe("Contexte optionnel (ex: extrait de l'histoire)"),
    temperature: z.number().min(0).max(2).optional().describe("Température LLM (0=déterministe, 0.7=nominal défaut Grok, 1.0+=plus créatif)"),
  },
  async ({ prompt, context, temperature }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { content: [{ type: "text", text: "Erreur: XAI_API_KEY non définie." }], isError: true };
    const systemPrompt = context ? `Tu es un assistant expert. Contexte fourni:\n\n${context}` : "Tu es un assistant expert, précis et concis.";
    try {
      const result = await callOpenAICompat(
        "https://api.x.ai/v1",
        apiKey,
        "grok-4.3",
        systemPrompt,
        prompt,
        {},
        temperature,
        { reasoning_effort: "low" }
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
    context: z.string().optional().describe("Contexte optionnel (ex: extrait de l'histoire)"),
    temperature: z.number().min(0).max(2).optional().describe("Température LLM (Kimi défaut ~0.6 ; 0=déterministe, 1.0+=plus créatif)"),
  },
  async ({ prompt, context, temperature }) => {
    const apiKey = process.env.MOONSHOT_API_KEY;
    if (!apiKey) return { content: [{ type: "text", text: "Erreur: MOONSHOT_API_KEY non définie." }], isError: true };
    const systemPrompt = context ? `Tu es un assistant expert. Contexte fourni:\n\n${context}` : "Tu es un assistant expert, précis et concis.";
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
        temperature
      );
      return { content: [{ type: "text", text: result }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Erreur Kimi: ${(e as Error).message}` }], isError: true };
    }
  }
);

server.tool(
  "ask_deepseek",
  "Pose une question à DeepSeek V4. Modèle 'pro' (défaut, plus capable) ou 'flash' (rapide). Mode non-thinking. Promo -75% sur V4-Pro jusqu'au 2026-05-31.",
  {
    prompt: z.string().describe("La question ou le texte à soumettre à DeepSeek"),
    context: z.string().optional().describe("Contexte optionnel"),
    model: z.enum(["deepseek-v4-pro", "deepseek-v4-flash"]).optional().default("deepseek-v4-pro").describe("v4-pro = plus capable (1.6T params, promo -75% jusqu'au 2026-05-31) | v4-flash = rapide (284B params)"),
    temperature: z.number().min(0).max(2).optional().describe("Température LLM (DeepSeek défaut ~1.0 ; 0=déterministe, 1.5=plus créatif)"),
  },
  async ({ prompt, context, model, temperature }) => {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) return { content: [{ type: "text", text: "Erreur: DEEPSEEK_API_KEY non définie." }], isError: true };
    const systemPrompt = context ? `Tu es un assistant expert. Contexte fourni:\n\n${context}` : "Tu es un assistant expert, précis et concis.";
    try {
      const result = await callOpenAICompat(
        "https://api.deepseek.com/v1",
        apiKey,
        model ?? "deepseek-v4-pro",
        systemPrompt,
        prompt,
        {},
        temperature
      );
      return { content: [{ type: "text", text: result }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Erreur DeepSeek: ${(e as Error).message}` }], isError: true };
    }
  }
);

server.tool(
  "tts_elevenlabs",
  "Convertit du texte en audio via ElevenLabs. Retourne le chemin du fichier MP3 généré dans temp/.",
  {
    text: z.string().max(5000).describe("Texte à synthétiser"),
    voice_id: z.string().optional().default("21m00Tcm4TlvDq8ikWAM").describe("ID de voix ElevenLabs (défaut: Rachel)"),
    output_name: z.string().optional().default("tts_output").describe("Nom du fichier de sortie (sans extension)"),
  },
  async ({ text, voice_id, output_name }) => {
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
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`ElevenLabs error ${response.status}: ${err}`);
      }

      const audioBuffer = await response.arrayBuffer();
      const outputPath = `c:/ProjetsPerso/Claude_Projects/MaxPlay/temp/${output_name}.mp3`;
      await Bun.write(outputPath, audioBuffer);

      return { content: [{ type: "text", text: `Audio généré : ${outputPath} (${Math.round(audioBuffer.byteLength / 1024)} KB)` }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Erreur ElevenLabs: ${(e as Error).message}` }], isError: true };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
