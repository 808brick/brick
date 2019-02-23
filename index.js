const fs = require('fs');
const path = require('path');
const electron = require('electron');

const { app, BrowserWindow, Menu , ipcMain} = electron;

let mainWindow;
let sub;
let aa;
let plugin_folder;

app.on('ready', () => {
  // console.log("App is now ready");

  aa = 3;

  mainWindow = new BrowserWindow({icon: path.join(__dirname, `./public/images/Kanaloa_logo4.png`) });
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  init_plugins_menu(Menu);

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
  for (var plugin in plugindata){

    var plugin_name = plugindata[plugin]["name"];
    plugin_folder = plugindata[plugin]["plugin_folder"];

    var plugin_submenu = {
        "label": plugin_name,
        "plugin_folder": plugin_folder,
        click(menuItem, browserWindow, event){
          plugin_require = require('./public/Plugins/' + menuItem.plugin_folder + '/index.js'); 
          plugin_require.main(mainWindow);
        }   
      } //End of submenu
      menuTemplate[4]["submenu"].unshift(plugin_submenu);
  } //End of for loop
  var mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

function check_for_new_plugins(path){

  // console.log(fs.readdirSync(path));
  var plugin_directories = fs.readdirSync(path);
  plugindata = fs.readFileSync('plugins.json');  
  plugindata = JSON.parse(plugindata); 
  var plugin_json_directories = [];
  for (var plugin in plugindata){
    plugin_json_directories.push(plugin);
  }
  // console.log("Plugin JSON Directories: " + plugin_json_directories);
  if (plugin_directories.length != plugin_json_directories.length){
    var all_plugin_info = {};
    // var plugin_info = {};
    console.log("New Plugins Detected");
    for (plugin in plugin_directories){
      plugin = plugin_directories[plugin];

      console.log("For plugin: " + plugin);
      if (fs.existsSync('./public/Plugins/'+plugin+'/plugin_info.json')) {
        console.log('./public/Plugins/'+plugin+'/plugin_info.json');
        plugindata = fs.readFileSync('./public/Plugins/'+plugin+'/plugin_info.json');
        plugindata = JSON.parse(plugindata); 
        console.log(plugindata);
        all_plugin_info[plugin] = {"name" : plugindata["name"], "repo" : plugindata["repo"], "plugin_folder" : plugindata["plugin_folder"]};
      }
        
    }
    console.log(all_plugin_info);
    all_plugin_info = JSON.stringify(all_plugin_info, null, "\t");
    fs.writeFile('plugins.json', all_plugin_info, (err) => {  
      if (err) throw err;
          console.log('Package.json file updated!');
      });
    console.log("\n\n");
    console.log(all_plugin_info);
  }
}

check_for_new_plugins('./public/Plugins/');
// init_plugins_menu()
