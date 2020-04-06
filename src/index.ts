import { app, screen, Menu, BrowserWindow } from 'electron';
import menu from './menu';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

// const server = "https://hazel-inky.now.sh/"
// const feed = `${server}/update/${process.platform}/${app.getVersion()}`

// autoUpdater.setFeedURL({
//   url: feed
// });

const MAIN_WIDTH = 320;
const MAIN_HEIGHT = 350;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}
// if (!app.isInApplicationsFolder()) {
//   app.moveToApplicationsFolder({
//     conflictHandler: (conflictType) => {
//       if (conflictType === 'exists' || conflictType === 'existsAndRunning') {
//         return dialog.showMessageBoxSync({
//           type: 'question',
//           buttons: ['取消', '继续'],
//           defaultId: 0,
//           message: '这个名字的App已经存在'
//         }) === 1
//       }
//     }
//   })
// }

const createWindow = (): void => {
  // Create the browser window.
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.bounds;
  const mainWindow = new BrowserWindow({
    height: MAIN_HEIGHT,
    width: MAIN_WIDTH,
    title: 'kanban',
    hasShadow: false,
    transparent: true,
    resizable: app.isPackaged ? false : true,
    x: width - MAIN_WIDTH,
    y: height - MAIN_HEIGHT,
    frame: false,
    focusable: true,
    alwaysOnTop: true,
    webPreferences: {
      devTools: app.isPackaged ? false : true,
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  Menu.setApplicationMenu(menu);
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.setAboutPanelOptions({
  copyright: 'copyright 2020',
  credits: `
APP内所有模型、图片版权均属于原作者，仅供研究学习，不得用于商业用途\n
stevenjoezhang https://github.com/stevenjoezhang
fghrsh https://github.com/fghrsh\n
  `
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
