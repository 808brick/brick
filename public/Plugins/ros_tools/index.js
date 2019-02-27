const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs').msg;

const exec = require('child_process').exec
const glob = require('glob');

module.exports = {
  test: function (mainWindow) {
    test(mainWindow);
  },
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

  mainWindow.on('close', function() {
    console.log("Main Window Closed, Shutting Down all Processes");
    exec("rosnode kill -a", (err, stdout, stderr) => {
    })
    exec("killall -9 roscore && killall -9 rosmaster ", (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
      })
    exec("pkill rosmaster  ", (err, stdout, stderr) => {
      })
    exec("pkill web_video_serve", (err, stdout, stderr) => {
    })

  });

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

    ipcMain.on('roscore', (event, text) => {
      exec("roscore", (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
    })
    });
    ipcMain.on('roscore_stop', (event, text) => {
      exec("killall -9 roscore && killall -9 rosmaster ", (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
      })
    }); 
    ipcMain.on('ros_launch', (event, text) => {
      console.log(text);
      exec("roslaunch usb_cam usb_cam-test.launch", (err, stdout, stderr) => {
      //   console.log(err);
      // console.log(stdout);
      // console.log(stderr);
    })
    }); 
    ipcMain.on('ros_launch_debug', (event, text) => {
      console.log(text);
      exec("roslaunch usb_cam usb_cam-test.launch", (err, stdout, stderr) => {
        // console.log(err);
      console.log(stdout);
      console.log(stderr);
    })
    }); 
    ipcMain.on('ros_node_kill', (event, text) => {
      console.log("Killing all ROS nodes");
      exec("rosnode kill -a", (err, stdout, stderr) => {
      //   console.log(err)
      // console.log(stdout);
      // console.log(stderr);
    })
    }); 
    ipcMain.on('ros_source', (event, text) => {
      console.log("Sorucing specified file");
      exec("echo 'source ~/velodyne_ws/devel/setup.bash' >> ~/.bashrc", (err, stdout, stderr) => {
        console.log(err);
      console.log(stdout);
      console.log(stderr);
    })
    }); 

    function roslaunch_list(callback){
      exec("rospack list", (err, stdout, stderr) => {
      // console.log("ERR");
      // console.log(err);
      // console.log("STDOUT");
      // console.log(stdout);
      var package_list = [];
      var launch_files = [];
      var res = stdout.split("\n");
      res.splice(-1,1);
      // console.log(res)
      for (package in res){
        package_list.push(res[package].split(" "));
      }
      // console.log("Package List: ");
      // console.log(package_list);
      for (package in package_list){
        // console.log("PAckage: " + package_list[package]);
        var path = package_list[package][1];
        // console.log("Path1: "+ path);
        files = glob.sync(path + '/**/*.launch', {});
        // a = glob.sync(path + '/**/*.launch', {}, (err, files)=>{
          // console.log("Path: "+ path);
          // console.log("Files: ");
          // console.log(files);
          if (files != undefined && files.length != 0) {
            for (launch_file in files){
              // console.log("For Loop:");
              // console.log(files[launch_file]);
              split_file = files[launch_file].split("/");
              launch_files.push([package_list[package][0], split_file[split_file.length-1]]);
              // console.log([package_list[package][0], split_file[split_file.length-1]]);

            }
          } // end if not undefined
        // }) // end glob file checking
        // console.log("files:");
        // console.log(files);
      } //end for loop
      // console.log("Launch Files Completed: ");
      // console.log(launch_files);

      // console.log("STDERR");
      // console.log(stderr);
      // console.log("Launch File Finished")
      setTimeout(callback, 1000, launch_files);
      // callback(launch_files);
    })
    }

    ipcMain.on('roslaunch_list', (event, text) => {
      console.log("List all ROSLAUNCH:");

      roslaunch_list(function (result){
        console.log("Result");
        console.log(result);
      })
      // console.log("Launch Files Completed: ");
      // console.log(launch_files);
    });
    ipcMain.on('start_video_server', (event, text) => {
      exec("rosrun web_video_server web_video_server", (err, stdout, stderr) => {
      //   console.log(err)
      console.log(stdout);
      // console.log(stderr);
    })
    }); 
    ipcMain.on('stop_video_server', (event, text) => {
      exec("pkill web_video_serve", (err, stdout, stderr) => {
      //   console.log(err)
      console.log(stdout);
      // console.log(stderr);
    })
    }); 

    ipcMain.on('map_server_start', (event, text) => {
      exec("service docker start", (err, stdout, stderr) => {
      // console.log(err);
      console.log(stdout);
      console.log(stderr);
      // console.log("ERR: ");
      // console.log(err);
      if (err == null){
        exec("docker  run  --rm -v  $(pwd):/data  -p  8081:80  klokantech/tileserver-gl .public/Plugins/image_testing/oahu.mbtiles ", (err, stdout, stderr) => {
        // exec("sudo docker  run  --rm -v  $(pwd):/data  -p  8081:80  klokantech/tileserver-gl .public/Plugins/image_testing/oahu.mbtiles ", (err, stdout, stderr) => {
          // console.log("Socket Command Run")
          // console.log(err);
          // console.log("STDOUT")
          console.log(stdout);
          // console.log("STDERR")
          // console.log(stderr);
          if (stderr != null){
            console.log("This port is already used. Map Tile server may already be running, or another application is using the same port")
          }
        })
      }
    })
      
    });
    ipcMain.on('map_server_stop', (event, text) => {
      console.log(text);
      exec("service docker stop", (err, stdout, stderr) => {
        // console.log(err);
      console.log(stdout);
      console.log(stderr);
    })
    });  
}

// ros_subscriber();

function test(text){
  console.log(text);
  console.log("End");
}

