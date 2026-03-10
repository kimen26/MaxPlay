// Stop hook - Save state before stopping
const fs = require('fs');
const path = require('path');

function main() {
  const memoryDir = path.join(process.cwd(), '.claude', 'memory');
  if (!fs.existsSync(memoryDir)) {
    fs.mkdirSync(memoryDir, { recursive: true });
  }
  
  // Save session end timestamp
  const timestamp = new Date().toISOString();
  fs.writeFileSync(
    path.join(memoryDir, 'last-session.json'),
    JSON.stringify({ endedAt: timestamp }, null, 2)
  );
  
  console.log('[Stop] Session state saved');
}

main();
