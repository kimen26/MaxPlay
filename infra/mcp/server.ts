import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "llm-copains",
  version: "1.0.0",
});

async function callOpenAICompat(
  baseUrl: string,
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string,
  extraHeaders: Record<string, string> = {},
  temperature?: number
): Promise<string> {
  const body: Record<string, unknown> = {
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
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
  "Pose une question à Grok (xAI). Utile pour fact-check, relecture, ou perspective alternative sur un texte narratif. Param 'temperature' optionnel (0.0=déterministe, 0.7=nominal, 1.0+=créatif).",
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
      const result = await callOpenAICompat("https://api.x.ai/v1", apiKey, "grok-4-fast-non-reasoning", systemPrompt, prompt, {}, temperature);
      return { content: [{ type: "text", text: result }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Erreur Grok: ${(e as Error).message}` }], isError: true };
    }
  }
);

server.tool(
  "ask_kimi",
  "Pose une question à Kimi / Moonshot AI. Mode 'story' (défaut) pour narration/relecture/créatif — utilise moonshot-v1-32k. Mode 'code' pour code/analyse — utilise kimi-for-coding. Param 'temperature' optionnel (0=déterministe, 0.3=nominal Kimi narratif, 1.0+=créatif).",
  {
    prompt: z.string().describe("La question ou le texte à soumettre à Kimi"),
    context: z.string().optional().describe("Contexte optionnel (ex: extrait de l'histoire)"),
    mode: z.enum(["story", "code"]).optional().default("story").describe("story = narration/créatif (moonshot-v1-32k) | code = code/analyse (kimi-for-coding)"),
    temperature: z.number().min(0).max(2).optional().describe("Température LLM (Moonshot défaut ~0.3, Kimi-for-coding défaut ~0.6 ; 0=déterministe, 1.0+=plus créatif)"),
  },
  async ({ prompt, context, mode, temperature }) => {
    const apiKey = process.env.MOONSHOT_API_KEY;
    if (!apiKey) return { content: [{ type: "text", text: "Erreur: MOONSHOT_API_KEY non définie." }], isError: true };
    const systemPrompt = context ? `Tu es un assistant expert. Contexte fourni:\n\n${context}` : "Tu es un assistant expert, précis et concis.";
    const isCode = mode === "code";
    const baseUrl = isCode ? "https://api.kimi.com/coding/v1" : "https://api.moonshot.cn/v1";
    const model = isCode ? "kimi-for-coding" : "moonshot-v1-32k";
    const extraHeaders = isCode ? {
      "User-Agent": "claude-code/1.9.0 (win32; x64)",
      "X-Client-Name": "claude-code",
      "X-Client-Version": "1.9.0",
    } : {};
    try {
      const result = await callOpenAICompat(baseUrl, apiKey, model, systemPrompt, prompt, extraHeaders, temperature);
      return { content: [{ type: "text", text: result }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Erreur Kimi: ${(e as Error).message}` }], isError: true };
    }
  }
);

server.tool(
  "ask_deepseek",
  "Pose une question à DeepSeek. Utile pour raisonnement, code, analyse logique. Param 'temperature' optionnel (0=déterministe, 1.0=nominal défaut DeepSeek, 1.5=créatif max).",
  {
    prompt: z.string().describe("La question ou le texte à soumettre à DeepSeek"),
    context: z.string().optional().describe("Contexte optionnel"),
    model: z.enum(["deepseek-chat", "deepseek-reasoner"]).optional().default("deepseek-chat").describe("deepseek-chat = rapide, deepseek-reasoner = raisonnement approfondi"),
    temperature: z.number().min(0).max(2).optional().describe("Température LLM (DeepSeek défaut ~1.0 ; 0=déterministe, 1.5=plus créatif). DeepSeek-reasoner ignore ce paramètre."),
  },
  async ({ prompt, context, model, temperature }) => {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) return { content: [{ type: "text", text: "Erreur: DEEPSEEK_API_KEY non définie." }], isError: true };
    const systemPrompt = context ? `Tu es un assistant expert. Contexte fourni:\n\n${context}` : "Tu es un assistant expert, précis et concis.";
    try {
      const result = await callOpenAICompat("https://api.deepseek.com/v1", apiKey, model ?? "deepseek-chat", systemPrompt, prompt, {}, temperature);
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
