const electron = require('electron')

const app = electron.app
const window = electron.BrowserWindow

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

// When app is ready
app.on('ready', ()=>{
	// Create a new window
	var mainWindow = new window({width : 1920, height : 1080});
	mainWindow.setMenuBarVisibility(false);
	mainWindow.loadURL('http://localhost:3000');
})