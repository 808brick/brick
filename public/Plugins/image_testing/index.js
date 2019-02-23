const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs').msg;
const sensor_msgs = rosnodejs.require('sensor_msgs').msg;

module.exports = {
  main: function (mainWindow) {
    main(mainWindow);
  }
};


function main(mainWindow){
	// mainWindow.loadURL(`file://${__dirname}/index.html`);
	console.log(`file://${__dirname}/index.html`);
	mainWindow.loadURL(`file://${__dirname}/index.html`);
	rosnodejs.initNode('/gps_node')
	.then((rosNode) => {
		// Create ROS subscriber on the 'chatter' topic expecting String messages
		// try {
		//   sub = rosNode.subscribe('/wamvGps/latitude', std_msgs.Float64,
		// (data) => { // define callback execution
		//   mainWindow.webContents.send('wamvGps', data.data);
		//   console.log(data.data);
		//   // console.log(typeof data.data);
  //       }
  //     );
		// }
		// catch(error) {
		// 	console.log("There was an error subscribing");
		//   console.error(error);
// }	

		// console.log()
		// console.log(Object.keys(rosnodejs));
		// console.log("\n2\n");
		// console.log(Object.keys(rosnodejs.getTopics()));
		sub = rosNode.subscribe('/wamvGps', sensor_msgs.NavSatFix,
		(data) => { // define callback execution
			// console.log(data);
		  // console.log(data.data);
		  mainWindow.webContents.send('wamvGps', data);

		  // console.log(typeof data.data);
        }
      );
    });
}


