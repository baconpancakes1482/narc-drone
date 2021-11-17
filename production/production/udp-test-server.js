const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const client = dgram.createSocket('udp4');
const HOST = "10.0.2.100";
server.bind(3003);

const mavlink = require("mavlink");
const SerialPort = require("serialport");
const myMav =  new mavlink(1,1);  // setting 0, 0 makes it no possible to encode->send mavlink messages: for now i want to see the messages arrive successfully
const serialport = new SerialPort('/dev/serial0', {baudRate: 500000});


myMav.on("ready", function(){
	console.log("ready");
	// if we are listening to serial port data 
	serialport.on("data", function(data){
		//myMav.parse(data);
		//console.log(data);
		//console.log(data.toJSON());
		const char_async  = async (data) => {
      	        const c = data[0];
			return c;
                }

		const payload_async = async (data) => {
		const p =  data[1];
		return p;
		}

		const seq_async = async (data) => {
		const seq = data[2];
		return seq;
		}
	
		const sys_async = async (data) => {
		const sys = data[3];
		return sys;
		}
	
		const comp_async = async (data) => {
		const comp = data[4];
		return comp;
		}
	
		const id_async = async (data) => {
		const id = data[5];
		return id;
		}
	
		const buf_async = async (data, payload_length) => {
		const paylo = new Buffer.alloc(6+payload_length);
		data.copy(paylo, 0, 6, 6+payload_length);
		return paylo;
		}
	
		const check_async = async (data, payload_length) => {
		const check = data.readUInt16LE(payload_length + 6);
		return check;
		}
	
		const who_async = async (data, payload_length) => {
		const who =  new Buffer.alloc(payload_length + 8);
		data.copy(who, 0, 0, 8+payload_length);
		return who;
		}
	/*	const delay = (t, v) =>{
			return new Promise (
		}*/
		const decode = async function(){		
			try {
		
		// 10.46 micro seconds ~ 0.011 ms 
			const char_start = await char_async(data);
			const payload_length = await payload_async(data);
			const sequence_number = await seq_async(data);
			const system_id = await sys_async(data);
			const component_id = await comp_async(data);
			const id = await id_async(data);
		
		// we need asynchronous function here 'await'
			const payload = await buf_async(data, payload_length);
		
			const checksum = await check_async(data, payload_length);
		
			const whole_buffer = await who_async(data, payload_length);
		
			console.log(whole_buffer);
			} catch ( err) {
				console.log(err);
			}
		}();
		
	});

/*	

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

		//client.send(data, 3001, HOST, (err) =>{
		//	if (err){
		//		console.log(err);
		//		client.close();
		//	} else {
		//		console.log("UDP SENT: " + data);
		//	}

	//	});

	});
*/
});

server.on("listening", (req, res) =>{

    var address = server.address();

    console.log("UDP Socket Server started and listening on " + address.address + ":" + address.port);

});
