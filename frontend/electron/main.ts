import { app, BrowserWindow } from 'electron'; // 引入 Electron API

let mainWindow: BrowserWindow | null = null; // 主窗口变量

// 创建窗口的函数
const createWindow = (() => {
  mainWindow = new BrowserWindow({
    width: 1200, // 设置窗口宽度
    height: 800, // 设置窗口高度
    webPreferences: {
      nodeIntegration: true, // 允许 Node.js 代码
    },
  });

  app.whenReady().then(createWindow);

  // 加载 Vite 开发服务器地址
  mainWindow.loadURL('http://localhost:5173'); // 默认网址，删去也可正常运行

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
