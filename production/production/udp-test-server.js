const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const client = dgram.createSocket('udp4');
const HOST = "10.0.2.100";
server.bind(3003);

const mavlink = require("mavlink");
const SerialPort = require("serialport");
const myMav =  new mavlink(1,1);  // setting 0, 0 makes it not possible to encode->send mavlink messages: for now i want to see the messages arrive successfully
const serialport = new SerialPort('/dev/serial0');

myMav.on("ready", function(){
	console.log("ready");
	// if we are listening to serial port data 
	serialport.on("data", function(data){
		myMav.parse(data);
		console.log("serial: " + data);
	});
	// if we are listening for rpanion routed data
	server.on("message", (message) => {
	const  char_start = message[0];
	console.log("char_start: " + char_start);
	const payload_length = message[1];
	console.log("payload_length: " + payload_length);

	const sequence_number = message[2];
	console.log("sequency_number: " + sequence_number);

	const system_id = message[3];
	console.log("system_id: " + system_id);

	const component_id = message[4];
	console.log("component_id: " + component_id);

	const id = message[5];
	console.log("id: " + id);
	
	// now we have buffer size for payload 
	const payload = new Buffer.alloc(6 + payload_length);

	// then copy message payload buffer to our payload buffer
	message.copy(payload,0,6,6+payload_length);
	console.log("payload");
	//console.log(payload.toJSON());
	console.log(payload);
	const checksum = message.readUInt16LE(payload_length + 6);
	console.log("checksum: " + checksum);

	const whole_buffer = new Buffer.alloc(payload_length + 8);
	message.copy(whole_buffer, 0, 0, 8 + payload_length);
	console.log("Complete buffer:");
	//console.log(whole_buffer.toJSON());
	console.log(whole_buffer);
	console.log("\n");

	//console.log("hit message" + message);
	//const json =myMav.parse(message);
	//const obj = JSON.parse(json);
	//console.log("test .json" + message.json());
	//console.log("test JSONparse" + JSONparse(message));
	//console.log("test parseJSON()" + parseJSON(message));
	//console.log("test parsejson" + obj);
	//var data = myMav.parse(message);

	//console.log(data);

		//client.send(data, 3001, HOST, (err) =>{
		//	if (err){
		//		console.log(err);
		//		client.close();
		//	} else {
		//		console.log("UDP SENT: " + data);
		//	}

	//	});

	});
});

server.on("listening", (req, res) =>{

    var address = server.address();

    console.log("UDP Socket Server started and listening on " + address.address + ":" + address.port);

});
