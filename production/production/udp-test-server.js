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
	var instance = 0;
	serialport.on("data", function(data){
		//myMav.parse(data);
		//console.log(data);
		//console.log(data.toJSON());
		
		const char_async  = async (data, instance) => {
      	        	var c = 0;
			c = data[0];
			console.log("char:" + c + "i:" + instance);
			return c;
                }

		const payload_async = async (data, instance) => {
			var p = 0;
			p = data[1];
			console.log("payload size:" + p + "i:" + instance);
			
			return p;
		}

		const seq_async = async (data, instance) => {
			var seq = 0;
			seq = data[2];
			
			console.log("seq: " + seq + "i:" + instance);
			return seq;
		}
	
		const sys_async = async (data, instance) => {
			var sys = 0;	
			sys = data[3];
			console.log("sys:" + sys + "i:" + instance);
			return sys;
		}
	
		const comp_async = async (data, instance) => {
			var comp = 0;
			comp = data[4];
				
			console.log("comp: " + comp + "i:" + instance);
			return comp;
		}
	
		const id_async = async (data, instance) => {
			var id = 0;
			id = data[5];
			console.log("id:" + id + "i:" + instance);
			return id;
		}
	
		const buf_async = async (data, instance) => {
			var payl_size = 0;
			payl_size = data[1];
			
			console.log("buf_async i[" + instance + "]");
			//  we dont want this because it allocates additional 6 bytes when we just want the payload
			// var paylo = Buffer.alloc(payl_size + 6);
			var paylo = Buffer.alloc(payl_size);
			// we dont want this because it's source start stops at 6 additional bytes after payload length
			//data.copy(paylo, 0, 6, 6+payl_size);
			data.copy(paylo,0,6,payl_size);
			console.log(paylo);
			return paylo;
		}
	
		const check_async = async (data, instance) => {
			var payl_size2 = 0;
			payl_size2 = data[1];
			console.log("check_async i[" + instance + "]");
			var format = payl_size2 + 6; 
			console.log("check_async format = " +format);
			try {
			// reads correct 2 bytes from  payload length in bytes + 6 bytes mavlink 1 msg header
			var check = data.readUInt16LE(data[1] + 6);
			} catch (e) {
				console.log(e);
			}
			console.log(check);
			return check;
		}
	
		const who_async = async (data, instance) => {
			var payl_size3 = 0;
			payl_size3 = data[1];
			console.log("who_async i[" + instance + "]");
			// good --> copies whole buffer correctly
			var whole_buffer = Buffer.alloc(payl_size3 + 8);
			data.copy(whole_buffer, 0, 0, 8+payl_size3);
			console.log(who);
			return who;
		}
	/*	const delay = (t, v) =>{
			return new Promise (
		}*/
		const decode = async function(){			
			try {
		
		// 10.46 micro seconds ~ 0.011 ms 
			var char_start = await char_async(data, instance);
			console.log("char_start: " + char_start + "i:" + instance);
			var payload_length = await payload_async(data, instance);
			console.log("payload_length: " + payload_length + "i:" + instance); 
			var sequence_number = await seq_async(data, instance);
			console.log("sequence_number: " + sequence_number + "i:" + instance);
			var system_id = await sys_async(data, instance);
			console.log("system_id: " + system_id + "i:" + instance);
			var component_id = await comp_async(data, instance);
			console.log("component_id: " + component_id + "i:" + instance);
			var id = await id_async(data, instance);
			console.log("id: " + id);
		// we need asynchronous function here 'await'
			var payload = await buf_async(data, instance);
			console.log("payload: " + payload + "i:" + instance);
			var checksum = await check_async(data, instance);
			console.log("checksum: " + checksum + "i:" + instance);
			var whole_buffer = await who_async(data, instance);
			console.log("whole_buffer: " + whole_buffer + "i:" + instance);
			//console.log(whole_buffer);
			} catch ( err) {
				console.log(err);
			}
			instance++;
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
