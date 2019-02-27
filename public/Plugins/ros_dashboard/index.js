const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs').msg;

const exec = require('child_process').exec
const glob = require('glob');

module.exports = {
  main: function (mainWindow, ipcMain) {
    main(mainWindow, ipcMain);
  },

};

let mainWindow;

function ros_subscriber(mainWindow){
  console.log(`file://${__dirname}/index.html`);
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  rosnodejs.initNode('/listener_node')
    .then((rosNode) => {
      // Create ROS subscriber on the 'chatter' topic expecting String messages
      sub = rosNode.subscribe('/chatter', std_msgs.String,
        (data) => { // define callback execution
    	  mainWindow.webContents.send('test_ros_topic', data.data);
          // console.log(data.data);
          // console.log(typeof data.data);
        }
      );
    });
}

function main(mainWindow, ipcMain){
  ros_subscriber(mainWindow);

    function rostopic_list(callback){
      exec("rostopic list", (err, stdout, stderr) => {
        var res = stdout.split("\n");
        res.splice(-1,1);
        console.log(res);
        callback(res);
    })
    }

  ipcMain.on('rostopic_list', (event, text) => {
      console.log("Rostopic list js triggered");
      rostopic_list(function (result) {
        mainWindow.webContents.send('rostopic_list', result);
      });
});
}

// ros_subscriber();

function test(text){
  console.log(text);
  console.log("End");
}