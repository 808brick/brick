const fs = require('fs');
const path = require('path');
const electron = require('electron');

const exec = require('child_process').exec;

const ssh= require('ssh2');

const { app, BrowserWindow, Menu , ipcMain} = electron;

let mainWindow;
let ssh_connections = [];

module.exports = {
  main: function (mainWindow_object) {
    main(mainWindow_object);
    mainWindow = mainWindow_object
  }
};


function main(mainWindow){

	mainWindow.loadURL(`file://${__dirname}/index.html`);
	
}



ipcMain.on('ssh', (event, ssh_object) => {
	command = ssh_object.command
	console.log(command)
	create_new_ssh_session(mainWindow, ssh_object)
});

ipcMain.on('ssh_kill', (event, id) => {
	end_connection(id)
});


// function create_new_ssh_session(mainWindow, id, ip, username, password, command, robot_name){
function create_new_ssh_session(mainWindow, ssh_object){

	split = ssh_object["ip"].split('@');
	username = split[0]
	ip = split[1]
	

	var conn = new ssh.Client();

	ssh_connections.push({"id": ssh_object.command_id, "conn": conn})


	conn.on('ready', function() {
	  console.log('Client :: ready');
	  conn.shell(function(err, stream) {
	    if (err) throw err;
	    stream.on('close', function() {
	      console.log('Stream :: close');
	      conn.end();
	    }).on('data', function(data) {
	      // console.log('OUTPUT: ' + data);
	      output_obj = {"id": ssh_object.command_id, "data": data}
	      mainWindow.webContents.send('ssh_output', output_obj);
	    });
	    // stream.end('roscore\nexit\n');
	    stream.end(ssh_object.command + '\nexit\n');
	  });
	}).connect({
	  host: ip,
	  port: 22,
	  username: username,
	  password: ssh_object.password
		});
}

function end_connection(id){
	var result = ssh_connections.filter(obj => {
	  return obj.id == id
	})

	result[0].conn.end()
	console.log("Killing Connection")
	// console.log(result)

}

