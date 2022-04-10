const { app, BrowserWindow } = require('electron');
require('@electron/remote/main').initialize();

app.commandLine.appendSwitch ("disable-http-cache");

let win;

function createWindow() {
    win = new BrowserWindow({ 
        width: 800, 
        height: 600,
        minWidth: 480,
        minHeight: 360, 
        darkTheme:true,
        backgroundColor:'#FFF',
        frame:false,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            nativeWindowOpen:true//imp need for new window access
        }
    });

    win.setMenu(null);
    win.loadFile('./public/index.html');
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})