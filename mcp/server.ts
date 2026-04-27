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
    context: z
      .string()
      .optional()
      .describe("Contexte optionnel (ex: extrait de l'histoire)"),
  },
  async ({ prompt, context }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return {
        content: [{ type: "text", text: "Erreur: XAI_API_KEY non définie." }],
        isError: true,
      };
    }

    const systemPrompt = context
      ? `Tu es un assistant expert. Contexte fourni:\n\n${context}`
      : "Tu es un assistant expert, précis et concis.";

    try {
      const result = await callOpenAICompat(
        "https://api.x.ai/v1",
        apiKey,
        "grok-4-fast-non-reasoning",
        systemPrompt,
        prompt
      );
      return { content: [{ type: "text", text: result }] };
    } catch (e) {
      return {
        content: [{ type: "text", text: `Erreur Grok: ${(e as Error).message}` }],
        isError: true,
      };
    }
  }
);

server.tool(
  "ask_kimi",
  "Pose une question à Kimi (Moonshot AI). Utile pour fact-check, relecture, ou perspective alternative sur un texte narratif.",
  {
    prompt: z.string().describe("La question ou le texte à soumettre à Kimi"),
    context: z
      .string()
      .optional()
      .describe("Contexte optionnel (ex: extrait de l'histoire)"),
  },
  async ({ prompt, context }) => {
    const apiKey = process.env.MOONSHOT_API_KEY;
    if (!apiKey) {
      return {
        content: [{ type: "text", text: "Erreur: MOONSHOT_API_KEY non définie." }],
        isError: true,
      };
    }

    const systemPrompt = context
      ? `Tu es un assistant expert. Contexte fourni:\n\n${context}`
      : "Tu es un assistant expert, précis et concis.";

    try {
      const result = await callOpenAICompat(
        "https://api.kimi.com/coding/v1",
        apiKey,
        "kimi-for-coding",
        systemPrompt,
        prompt,
        { "User-Agent": "claude-code/1.0" }
      );
      return { content: [{ type: "text", text: result }] };
    } catch (e) {
      return {
        content: [{ type: "text", text: `Erreur Kimi: ${(e as Error).message}` }],
        isError: true,
      };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
