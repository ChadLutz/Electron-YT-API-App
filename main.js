const {app, BrowserWindow} = require('electron')

let mainWindow

function initialize () { 
	function createWindow() {
		const windowOptions = {width: 1000, height: 600, minWidth: 804, minHeight: 450, maxWidth: 1650, maxHeight: 990, webPreferences: { nodeIntegration: true} }
		mainWindow = new BrowserWindow(windowOptions)
		
		mainWindow.loadFile('index.html')

		mainWindow.on('closed', function() {
		mainWindow = null
		})

	}

	app.on('ready', createWindow)

	app.on('window-all-closed', () => {app.quit()})
	
	app.on('activate', function() { if (mainWindow === null) createWindow()})

}

initialize()
