const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs').msg;

const path = require('path');
const electron = require('electron');

const cv = require('opencv4nodejs');

const { app, BrowserWindow, Menu , ipcMain} = electron;

let mainWindow;
let sub;
let aa;

app.on('ready', () => {
  // console.log("App is now ready");

  aa = 3;

  mainWindow = new BrowserWindow({icon: path.join(__dirname, `./public/images/Kanaloa_logo4.png`) });
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

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

// function ros_subscriber(){
//  rosnodejs.initNode('/listener_node')
//     .then((rosNode) => {
//       // Create ROS subscriber on the 'chatter' topic expecting String messages
//       sub = rosNode.subscribe('/chatter', std_msgs.String,
//         (data) => { // define callback execution
//        mainWindow.webContents.send('test_ros_topic', data.data);
//           // console.log(data.data);
//           // console.log(typeof data.data);
//         }
//       );
//     });
// }

const menuTemplate = [

  {
    label: 'File',
    submenu: [
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
        }
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

      {
        label: 'Scan The Code',
        click() {
          console.log("roscore funtionality not developed yet");
        }
      },
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




function init_plugins_menu(){
  const fs = require('fs');

  let plugindata = fs.readFileSync('plugins.json');  
  plugindata = JSON.parse(plugindata);  
  console.log(plugindata); 
  for (var plugin in plugindata){
    console.log(plugin);
    console.log(plugindata[plugin]["name"]);

    plugin_name = plugindata[plugin]["name"]

    plugin_submenu = {
        label: plugin_name,
        click() {
          // plugin_require = require('./ros_subscriber.js');
          // plugin_require.main(mainWindow);
          console.log("Hello There");
        }
      }

  }



}

// console.log(menuTemplate);
// console.log(menuTemplate[4]);
console.log(menuTemplate[4]["submenu"]);

menuTemplate[4]["submenu"].push({"label": "this is a test", click(){console.log("Hello There!"); plugin_require = plugin_require = require('./ros_subscriber.js'); plugin_require.main(mainWindow);}})


// plugin1.main(mainWindow);

// console.log(aa);
// console.log("Js file");

// plugin1.test(mainWindow);