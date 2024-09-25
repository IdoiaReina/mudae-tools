import {app, BrowserWindow} from 'electron'
import path from 'path'
import url from 'url'
import { fileURLToPath } from 'url';
import { createServer } from 'http-server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    icon: __dirname + 'components/MainLogo/logo.png',
  })

  if (app.isPackaged) {
    const server = createServer({ root: path.join(__dirname, '../build') });
    server.listen(3001, '127.0.0.1', () => {
      mainWindow.loadURL('http://127.0.0.1:3001');
    });
  } else {
    mainWindow.loadURL('http://localhost:3000');
  }

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
