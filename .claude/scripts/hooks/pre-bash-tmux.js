// Pre-bash tmux hook - Auto-start tmux for dev servers
const fs = require('fs');

function main() {
  // Check if tmux is available and command is long-running
  const isLongRunning = process.env.CLAUDE_BASH_COMMAND?.match(/(npm run dev|vite|webpack|tsc --watch)/);
  
  if (isLongRunning && !process.env.TMUX) {
    console.log('[Tmux] Consider running in tmux for long-running commands');
  }
}

main();
