

module.exports = {
  main: function (mainWindow) {
    main(mainWindow);
  }
};


function main(mainWindow){
	mainWindow.loadURL(`file://${__dirname}/index.html`);
}

