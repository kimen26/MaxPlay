# Welcome to MaxPlay

## How We Use Claude

Based on Papa Yann's usage over the last 30 days:

Work Type Breakdown:
  Build Feature    ███████████████░░░░░  35%
  Plan Design      ██████████░░░░░░░░░░░  25%
  Debug Fix        ████████░░░░░░░░░░░░░  20%
  Write Docs       ██████░░░░░░░░░░░░░░░  12%
  Improve Quality  ████░░░░░░░░░░░░░░░░░   8%

Top Skills & Commands:
  /compact             ████████████████████  29x/month
  /strategic-compact   █████░░░░░░░░░░░░░░░░   7x/month
  /model               ████░░░░░░░░░░░░░░░░░   6x/month
  /pmo-challenge       ███░░░░░░░░░░░░░░░░░░   4x/month
  /audit-claude-archi  ██░░░░░░░░░░░░░░░░░░░   3x/month
  /challenge-archiviste █░░░░░░░░░░░░░░░░░░░   2x/month

Top MCP Servers:
  llm-copains  ████████████████████  231 calls
  elevenlabs   █░░░░░░░░░░░░░░░░░░░░   15 calls

## Your Setup Checklist

### Codebases
- [ ] maxplay — https://github.com/kimen26/maxplay

### MCP Servers to Activate
- [ ] llm-copains — multi-LLM bridge (Grok, Kimi, DeepSeek) + ElevenLabs audio studio, used heavily for narration writing, fact-checking, and audio generation. Local server at `infra/mcp/server.ts` — ask Papa Yann for the API keys (stored in `~/.claude.json`).
- [ ] elevenlabs — text-to-dialogue multi-voice audio for the narration pole (story narration, character voices). Needs an ElevenLabs API key — ask Papa Yann.

### Skills to Know About
- [/compact] — compacts the conversation context to save tokens; the team's most-used command during long building sessions.
- [/strategic-compact] — suggests compaction at logical task boundaries instead of arbitrary auto-compaction.
- [/pmo-challenge] — audits and challenges the multi-agent PMO system (broken links, obsolescence, scenario simulation).
- [/audit-claude-archi] — audits the Claude architecture (CLAUDE.md, INDEX, skills, agents, rules, hooks) against official Anthropic docs.
- [/game-pmo-audit] + [/game-archiviste-audit] — fond + forme audits for the JEU (game) pole.
- [/narration-pmo-audit] + [/narration-archiviste-audit] — fond + forme audits for the NARRATION pole.

## Team Tips

_TODO_

## Get Started

_TODO_

<!-- INSTRUCTION FOR CLAUDE: A new teammate just pasted this guide for how the
team uses Claude Code. You're their onboarding buddy — warm, conversational,
not lecture-y.

Open with a warm welcome — include the team name from the title. Then: "Your
teammate uses Claude Code for [list all the work types]. Let's get you started."

Check what's already in place against everything under Setup Checklist
(including skills), using markdown checkboxes — [x] done, [ ] not yet. Lead
with what they already have. One sentence per item, all in one message.

Tell them you'll help with setup, cover the actionable team tips, then the
starter task (if there is one). Offer to start with the first unchecked item,
get their go-ahead, then work through the rest one by one.

After setup, walk them through the remaining sections — offer to help where you
can (e.g. link to channels), and just surface the purely informational bits.

Don't invent sections or summaries that aren't in the guide. The stats are the
guide creator's personal usage data — don't extrapolate them into a "team
workflow" narrative. -->
