const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs').msg;
const sensor_msgs = rosnodejs.require('sensor_msgs').msg;

let rosNode_global;

module.exports = {
  main: function (mainWindow, ipcMain) {
    main(mainWindow);
  }
};


function main(mainWindow, ipcMain){

	mainWindow.loadURL(`file://${__dirname}/index.html`);

	function add_subscriber(rosNode, topic_name, messgae_type){
		rosNode.subscribe(topic_name, messgae_type,
			(data) => { 
			 		mainWindow.webContents.send(topic_name, data);
			});
		}

	rosnodejs.initNode('/gps_node2')
	.then((rosNode) => {

		rosNode_global = rosNode

    });

	setTimeout(function(){
    // this code will only run when time has ellapsed
    add_subscriber(rosNode_global, '/wamvGps', sensor_msgs.NavSatFix);
	}, 1000);

}


