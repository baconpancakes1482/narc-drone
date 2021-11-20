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


	// if we are listening to serial port data 

	serialport.on("data", function(data){
		// lets do a check if its a heart beat message or a mav1 or mav 2 message AKA Manual check
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

		// will parse data to respective message. AKA does hard work of decoding.
		myMav.parse(data);
	});

	myMav.on("message", (message) => {
		// prints out all data
		console.log(message);
	});

/*
	//test out
	myMav.on("HEARTBEAT", (message, fields) => {
		console.log(fields);
	});
*/
// I know there is heartbeat messages being sent but not sure if common.xml/ardupilotmega.xml has heartbeat message, therefore manual detection will be used
	
	myMav.on("ATTITUDE", (message, fields) => {
		console.log(fields);
		/* #30
		fields.time_boot_ms uint32_t ms
		fields.roll float rad
		fields.pitch float rad
		fields.yawfloat	rad
		fields.rollspeedfloatrad/s
		fields.pitchspeed float rad/s
		fields.yawspeed float rad/s
 		*/
		// to access use fields.roll since message is sending ATTITUDE field data
	});

	myMav.on("SYSTEM_TIME", (message, fields) => {
		console.log(fields);
		/* #2
		fields.time_unix_usec uint64_t us
		fields.time_boot_ms uint32_t ms
		*/
	});

	myMav.on("SYS_STATUS",  (message, fields)  => {
		console.log(fields);
		/* #1
		fields.onboard_control_sensors_present uint32_t
		fields.onboard_control_sensors_enabled uint32_t
		fields.onboard_control_sensors_health uint32_t
		fields.load uint16_t   d%
		fields.voltage_battery uint16_t  mV 
		fields.current_battery   cA
		fields.battery_remaining int8_t  %
		fields.drop_rate_comm uint16_t    c%
		fields.errors_comm   uint16_t
		fields.errors_count1 uint16_t
		fields.errors_count2 uint16_t
		fields.errors_count3 uint16_t
		fields.errors_count4 uint16_t
		*/
	});

	myMav.on("LINK_NODE_STATUS", (message, fields) => {
		console.log(fields);
		/*
		fields.timestamp uint64_t ms
		fields.tx_buf uint8_t %
		fields.rx_buf uint8_t %
		fields.tx_rate uint32_t bytes/s
		fields.rx_rate uint32_t bytes/s
		fields.rx_parse_err uint16_t bytes
		fields.tx_overflows uint16_t bytes
		fields.rx_overflows uint16_6 bytes
		fields.messages_sent uint32_t 
		fields.messages_received uint32_t
		fields.messages_lost uint32_t
		*/
	});

	myMav.on("SCALED_IMU", (message, fields) => {
		console.log(fields);
		/* #26
		fields.time_boot_ms uint32_t ms
		fields.xacc int16_t mG
		fields.yacc int16_t mG
		fields.zacc int16_t mG
		fields.xgyro int16_t mrad/s
		fields.ygyro int16_t mrad/s
		fields.zgyro int16_t mrad/s
		fields.xmag int16_t mgauss
		fields.ymag int16_t mgauss
		fields.zmag int16_t mgauss
		fields.temperature int16_t cdegC  0 if no support
		*/
	});

	myMav.on("GLOBAL_POSITION_INT", (message, fields) => {
		console.log(fields);
		/* #33
		fields.time_boot_ms uint32_t ms.
		fields.lat int32_t degE7
		fields.lon int32_t degE7
		fields.alt int32_t mm
		fields.relative_alt int32_t mm
		fields.vx int16_t cm/s
		fields.vy int16_t cm/s
		fields.vz int16_t cm/s
		fields.hdg uint16_t cdeg
		*/
	});

	/* #147 not needed syst_status reports battery
	myMav.on("BATTERY_STATUS", (message, fields) => {
		console.log(fields);
		
	});
	*/

	myMav.on("EXTENDED_SYS_STATE", (message, fields) => {
		console.log(fields);

		/* #245
		fields.vtol_state uint8_t MAV_VTOL_STATE
		fields.landed_state uint8_t MAV_LANDED_STATE
		*/
	});

	myMav.on("RC_CHANNELS", (message, fields) => {
		console.log(fields);
		/* #65 
		fields.time_boot_ms uint32_t ms
		fields.chancount uint8_t
		fields.chan1_raw uint16_t us
		fields.chan2_raw uint16_t us
		fields.chan3_raw uint16_t us
		fields.chan4_raw uint16_t us
		fields.chan5_raw uint16_t us
		fields.chan6_raw uint16_t us
		fields.chan7_raw uint16_t us 
		fields.chan8_raw uint16_t us
 		fields.chan9_raw uint16_t us
 		fields.chan10_raw uint16_t us
		fields.chan11_raw uint16_t us
 		fields.chan12_raw uint16_t us
 		fields.chan13_raw uint16_t us
 		fields.chan14_raw uint16_t us
 		fields.chan15_raw uint16_t us
 		fields.chan16_raw uint16_t us
 		fields.chan17_raw uint16_t us
		fields.chan18_raw uint16_t us
		fields.rssi uint8_t
		*/
	});

	myMav.on("SCALED_PRESSURE", (message, fields) => {
		console.log(fields);

		/*#29
		fields.time_boot_ms uint32_t ms	
		fields.press_abs float	hPa
		fields.press_diff float hPa
		fields.temperature  int16_t cdegC
		fields.temperature_press_diff ** int16_t cdegC
		*/
	});

	myMav.on("SERVO_OUTPUT_RAW", (message, fields) => {
		console.log(fields);

		/* #36
		fields.time_usec	uint32_t	us	Timestamp (UNIX Epoch time or time since system boot). The receiving end can infer timestamp format (since 1.1.1970 or since system boot) by checking for the magnitude of the number.
		fields.port	uint8_t
		fields.servo1_raw	uint16_t	us	Servo output 1 value
		fields.servo2_raw	uint16_t	us	Servo output 2 value
		fields.servo3_raw	uint16_t	us	Servo output 3 value
		fields.servo4_raw	uint16_t	us	Servo output 4 value
		fields.servo5_raw	uint16_t	us	Servo output 5 value
		fields.servo6_raw	uint16_t	us	Servo output 6 value
		fields.servo7_raw	uint16_t	us	Servo output 7 value
		fields.servo8_raw	uint16_t	us	Servo output 8 value
		fields.servo9_raw **	uint16_t	us	Servo output 9 value
		fields.servo10_raw **	uint16_t	us	Servo output 10 value
		fields.servo11_raw **	uint16_t	us	Servo output 11 value
		fields.servo12_raw **	uint16_t	us	Servo output 12 value
		fields.servo13_raw **	uint16_t	us	Servo output 13 value
		fields.servo14_raw **	uint16_t	us	Servo output 14 value
		fields.servo15_raw **	uint16_t	us	Servo output 15 value
		fields.servo16_raw **	uint16_t	us	Servo output 16 value
		*/
	});

/*	

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
