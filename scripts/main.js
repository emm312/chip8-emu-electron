const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;




let path = require('path');
let url = require('url');

let win

function createWindow() {
    win = new BrowserWindow({width: 675, height: 400, resizable: false});

    win.setMenuBarVisibility(false);
    // disable the scroll bar
    win.setContentProtection(true);

    return win;

}


app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        loadMainWindow();
        

    }
});
app.on('ready', () => {
    const window = createWindow();
    window.loadFile("loading.html")
    setTimeout(() => window.loadFile('index.html'), 3000)
    
})


