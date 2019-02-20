const path = require('path');
const electron = require('electron');

const { app, BrowserWindow, Menu , ipcMain} = electron;

let mainWindow;
let sub;
let aa;

app.on('ready', () => {
  // console.log("App is now ready");

  aa = 3;

  mainWindow = new BrowserWindow({icon: path.join(__dirname, `./public/images/Kanaloa_logo4.png`) });
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  init_plugins_menu(Menu);

  

  // ros_subscriber();

  // const plugin1 = require('./ros_subscriber.js');


    // plugin1.main(mainWindow);

    // console.log(aa);
    // console.log("Js file");

    // plugin1.test(mainWindow);

});


ipcMain.on('ipc_init', (event, text) => {
  // mainWindow.webContents.send('test_ros_topic', "some text");
  console.log(text);
  // mainWindow.loadURL("https://google.com");
  mainWindow.webContents.send('ipc_init', "IPC Started JS");
  
});

const menuTemplate = [

  {
    label: 'File',
    submenu: [
      {
        label: "Back To Home Screen",
        click() {
          // console.log("roscore funtionality not developed yet");
          mainWindow.loadURL(`file://${__dirname}/index.html`);
        }
      },
      {
        label: 'Quit',
        // accelerator: 'Ctrl+Q',
        // accelerator: (() => {
        //   if (process.platform === "darwin"){
        //     return 'Command+Q';
        //   } else {
        //     return 'Ctrl+Q'
        //   }
        // })(), //Immediatly Invoked Function
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q', //If true return Command+Q if false return Ctrl+Q
        click() {
          app.quit();
        },
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
      { type: 'separator' },
      { role: 'minimize' },
    ]
  },
  {
    label: 'Robot',
    submenu: [

      {
        label: 'Start roscore locally',
        click() {
          console.log("roscore funtionality not developed yet");
        }
      },
      {
        label: "Change ROS IP",
        click() {
          console.log("roscore funtionality not developed yet");
        }
      },
      { type: 'separator' },
      {
        label: "Run Launch File",
        click() {
          console.log("roscore funtionality not developed yet");
        }
      },
    ]
  },
  

  {
    label: 'Plugins',
    submenu: [
      { type: 'separator' },
      {
        label: "Add New Plugin",
        click() {
          console.log("roscore funtionality not developed yet");
        }
      }
    ]
  },
];




function init_plugins_menu(Menu){
  const fs = require('fs');

  let plugindata = fs.readFileSync('plugins.json');  
  plugindata = JSON.parse(plugindata);  
  console.log("Plugin Data: \n" + plugindata); 
  for (var plugin in plugindata){
    console.log("Plugin: " + plugin);
    console.log("Plugin Data name: " + plugindata[plugin]["name"]);
    console.log("Plugin folder name: " + plugindata[plugin]["plugin_folder"]);

    var plugin_name = plugindata[plugin]["name"];
    var plugin_folder = plugindata[plugin]["plugin_folder"];

    var plugin_submenu = {
        "label": plugin_name,
        click() {
          console.log("Hello There");
          plugin_require = require('./public/Plugins/' + plugin_folder + '/index.js'); 
          plugin_require.main(mainWindow);
        }   
      } //End of submenu
      menuTemplate[4]["submenu"].unshift(plugin_submenu);
  } //End of for loop
  var mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

// function check_for_new_plugins(){
  
// }

// init_plugins_menu()


// console.log(menuTemplate);
// console.log(menuTemplate[4]);
// console.log(menuTemplate[4]["submenu"]);

// menuTemplate[4]["submenu"].unshift({"label": "Test ROS Subscriber", click(){console.log("Hello There!"); plugin_require = plugin_require = require('./public/Plugins/test_ros_subscriber/index.js'); plugin_require.main(mainWindow);}})


// plugin1.main(mainWindow);

// console.log(aa);
// console.log("Js file");

// plugin1.test(mainWindow);