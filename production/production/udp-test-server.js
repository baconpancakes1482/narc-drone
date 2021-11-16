const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const client = dgram.createSocket('udp4');
const HOST = "127.0.0.1";
server.bind(3003);

const mavlink = require("mavlink");
const serialport = require("serialport");
const myMav =  new mavlink(1,1);  // setting 0, 0 makes it no possible to encode->send mavlink messages: for now i want to see the messages arrive successfully

myMav.on("ready", function(){
	console.log("ready");

	serialport.on("data", function(data){
		myMav.parse(data);
		console.log("serial: " + data);
	});

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
	const payload = new Buffer(6 + payload_length);
	// then copy message payload buffer to our payload buffer

	message.copy(payload,0,6,6+payload_length);
	console.log("payload: " + payload); //maybe garbage
	// message payload buffer
//	const payload = new Buffer(payload_length);
	//message.copy(payload, 0, 6, 6+payload_length);
//	console.log("Buffer: " + payload);		
	if (Buffer.isBuffer(payload)){
		var char_stream = new Object();
		char_stream = myMav.parse(message);
		console.log("char_stream: " + char_stream);
	}


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
