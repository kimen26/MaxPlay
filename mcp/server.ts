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
  extraHeaders: Record<string, string> = {}
): Promise<string> {
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...extraHeaders,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 2048,
    }),
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
  "Pose une question à Grok (xAI). Utile pour fact-check, relecture, ou perspective alternative sur un texte narratif.",
  {
    prompt: z.string().describe("La question ou le texte à soumettre à Grok"),
    context: z.string().optional().describe("Contexte optionnel (ex: extrait de l'histoire)"),
  },
  async ({ prompt, context }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { content: [{ type: "text", text: "Erreur: XAI_API_KEY non définie." }], isError: true };
    const systemPrompt = context ? `Tu es un assistant expert. Contexte fourni:\n\n${context}` : "Tu es un assistant expert, précis et concis.";
    try {
      const result = await callOpenAICompat("https://api.x.ai/v1", apiKey, "grok-4-fast-non-reasoning", systemPrompt, prompt);
      return { content: [{ type: "text", text: result }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Erreur Grok: ${(e as Error).message}` }], isError: true };
    }
  }
);

server.tool(
  "ask_kimi",
  "Pose une question à Kimi K2.6 (Moonshot). Utile pour fact-check, relecture, perspective alternative. Consomme l'abonnement kimi.com.",
  {
    prompt: z.string().describe("La question ou le texte à soumettre à Kimi"),
    context: z.string().optional().describe("Contexte optionnel (ex: extrait de l'histoire)"),
  },
  async ({ prompt, context }) => {
    const apiKey = process.env.MOONSHOT_API_KEY;
    if (!apiKey) return { content: [{ type: "text", text: "Erreur: MOONSHOT_API_KEY non définie." }], isError: true };
    const systemPrompt = context ? `Tu es un assistant expert. Contexte fourni:\n\n${context}` : "Tu es un assistant expert, précis et concis.";
    try {
      const result = await callOpenAICompat("https://api.kimi.com/coding/v1", apiKey, "kimi-for-coding", systemPrompt, prompt, { "User-Agent": "claude-code/1.0" });
      return { content: [{ type: "text", text: result }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Erreur Kimi: ${(e as Error).message}` }], isError: true };
    }
  }
);

server.tool(
  "ask_deepseek",
  "Pose une question à DeepSeek. Utile pour raisonnement, code, analyse logique.",
  {
    prompt: z.string().describe("La question ou le texte à soumettre à DeepSeek"),
    context: z.string().optional().describe("Contexte optionnel"),
    model: z.enum(["deepseek-chat", "deepseek-reasoner"]).optional().default("deepseek-chat").describe("deepseek-chat = rapide, deepseek-reasoner = raisonnement approfondi"),
  },
  async ({ prompt, context, model }) => {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) return { content: [{ type: "text", text: "Erreur: DEEPSEEK_API_KEY non définie." }], isError: true };
    const systemPrompt = context ? `Tu es un assistant expert. Contexte fourni:\n\n${context}` : "Tu es un assistant expert, précis et concis.";
    try {
      const result = await callOpenAICompat("https://api.deepseek.com/v1", apiKey, model ?? "deepseek-chat", systemPrompt, prompt);
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
