const { spawn } = require('child_process');
const path = require('path');

// 定义颜色
const colors = {
  server: '\x1b[36m', // 青色
  frontend: '\x1b[35m', // 紫色
  reset: '\x1b[0m'
};

// 启动服务器
function startServer() {
  console.log(`${colors.server}[Server] Starting server...${colors.reset}`);

  const serverProcess = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'server'),
    shell: true
  });

  serverProcess.stdout.on('data', (data) => {
    console.log(`${colors.server}[Server] ${data.toString().trim()}${colors.reset}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`${colors.server}[Server Error] ${data.toString().trim()}${colors.reset}`);
  });

  // 监听服务器启动
  return new Promise((resolve) => {
    serverProcess.stdout.on('data', (data) => {
      if (data.toString().includes('Server running on http://localhost:3001')) {
        console.log(`${colors.server}[Server] Server is ready${colors.reset}`);
        resolve();
      }
    });
  });
}

// 启动前端
function startFrontend() {
  console.log(`${colors.frontend}[Frontend] Starting frontend...${colors.reset}`);

  const frontendProcess = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'frontend'),
    shell: true
  });

  frontendProcess.stdout.on('data', (data) => {
    console.log(`${colors.frontend}[Frontend] ${data.toString().trim()}${colors.reset}`);
  });

  frontendProcess.stderr.on('data', (data) => {
    console.error(`${colors.frontend}[Frontend Error] ${data.toString().trim()}${colors.reset}`);
  });
}

// 主函数
async function start() {
  try {
    // 先启动服务器
    await startServer();

    // 服务器就绪后启动前端
    setTimeout(() => {
      startFrontend();
    }, 1000);

  } catch (error) {
    console.error('Error starting applications:', error);
    process.exit(1);
  }
}

// 启动应用
start();