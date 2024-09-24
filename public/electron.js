import {app, BrowserWindow} from 'electron'
import path from 'path'
import url from 'url'
import { fileURLToPath } from 'url';
import { createServer } from 'http-server'; // Importer http-server

// Créer l'équivalent de __dirname dans un environnement ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,  // Permet de désactiver l'isolement du contexte
      enableRemoteModule: true,  // Permet d'utiliser des modules comme 'path'
    },
  })

  if (app.isPackaged) {
    // Démarrer un serveur local pour servir le dossier build
    const server = createServer({ root: path.join(__dirname, '../build') });
    server.listen(3001, '127.0.0.1', () => {
      // Charger l'application via le serveur HTTP local
      mainWindow.loadURL('http://127.0.0.1:3001');
    });
  } else {
    // En développement, chargez l'application via localhost
    mainWindow.loadURL('http://localhost:3000');
  }

  // Automatically open Chrome's DevTools in development mode.
  // if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  // }

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
