const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const HOST = "10.0.2.100";

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
			
		const inc_sync = async (data, instancec) => {
			var i = 0;
			i = data[2];
			return i;
		}

		const cmp_async = async (data, instance) => {
			var  cmp = 0;
			cmp = data[3];
			return cmp;
		}

                const seq_async = async (data, instance, flag) => {
                        var seq = 0;
			if ( flag ){
                        seq = data[2];
			} else {
			seq = data[4];
			}
			console.log("seq: " + seq + "i:" + instance);
                        return seq;
                }

                const sys_async = async (data, instance, flag) => {
                        var sys = 0;
			if (flag ) {
                        sys = data[3];
			} else {
			sys = data[5];
			}
                        console.log("sys:" + sys + "i:" + instance);
                        return sys;
                }

                const comp_async = async (data, instance, flag) => {
                        var comp = 0;
			if (flag) {
                        comp = data[4];
			} else {
			comp = data[6];
			}
                        console.log("comp: " + comp + "i:" + instance);
                        return comp;
                }

                const id_async = async (data, instance, flag) => {
                        var id = 0;
			if ( flag ) {
                        id = data[5];
			} else {
			id = Buffer.alloc(3);
			try {
			data.copy(id, 0, 7, 3);
			} catch (e) {
				console.log(e);
			}
			}
                        console.log("id:" + id + "i:" + instance);
                        return id;
                }

                const buf_async = async (data, instance, flag) => {
                        var payl_size = 0;
                        payl_size = data[1];
			
                        console.log("buf_async i[" + instance + "]");
                        //  we dont want this because it allocates additional 6 bytes when we just want the payload
                        // var paylo = Buffer.alloc(payl_size + 6);
			var paylo = Buffer.alloc(payl_size);
			try {
				if ( flag ) {
                        		// we dont want this because it's source start stops at 6 additional bytes after payload length
                        		//data.copy(paylo, 0, 6, 6+payl_size);
                       			data.copy(paylo,0,6,payl_size);
				} else {
					data.copy(paylo,0,10,payl_size);
				
				} 
			} catch (e) { console.log(e);}
                        console.log(paylo);
                        return paylo;
                }

                const check_async = async (data, instance, flag) => {
          
                   	console.log("check_async i[" + instance + "]");
                        try {
				if ( flag) {
					var check = data.readUInt16LE(data[1] + 6);
				} else {
					var check = data.readUInt16LE(data[1] + 10); 
				}
			} catch (e) { console.log(e); }

                        console.log(check);
                        return check;
                }

		const sig_async = async (data, instance) => {
			var sig = 0;
			
			try {
				sig = Buffer.alloc(13);
				data.copy(sig, 0, 12+data[0],13);
			} catch (e) { console.log(e); }
			console.log("sig_async i[" + insance + "]");
			return sig;
		}

                const who_async = async (data, instance, flag) => {
                        var payl_size3 = 0;
                        payl_size3 = data[1];
			try {
                        console.log("who_async i[" + instance + "]");
				if (flag) {
                        	// good --> copies whole buffer correctly
                        	var whole_buffer = Buffer.alloc(payl_size3 + 8);
                        	data.copy(whole_buffer, 0, 0, 8+payl_size3);
				} else {
				var whole_buffer = Buffer.alloc(payl_size3 + 25);
				data.copy(whole_buffer, 0, 0, payl_size3+25);
				// if  payl_size + 25 gives problems, then just remove parameter so it copies all of data
				} 
			} catch(e) { console.log(e); }
                        console.log(who);
	               return whole_buffer;
                }

                const decode = async function(){
                        try {
			// lets check when we get mav1 or mav2 or heartbeat messages
			const flag_mav1 = 254;		// hex 0xFE
			const flag_mav2 = 253;		// hex 0xFD
			const heartbeat = 0;		// hex 0x00
				
                	// 10.46 micro seconds ~ 0.011 ms baudrate
			if ( data[0] == flag_mav1){ 
			var flag = true;
                        var char_start = await char_async(data, instance);
                        console.log("char_start: " + char_start + "i:" + instance);
                        
			var payload_length = await payload_async(data, instance);
                        console.log("payload_length: " + payload_length + "i:" + instance);
                        
			var sequence_number = await seq_async(data, instance, flag);
                        console.log("sequence_number: " + sequence_number + "i:" + instance);
                        
			var system_id = await sys_async(data, instance, flag);
                        console.log("system_id: " + system_id + "i:" + instance);
                      
			var component_id = await comp_async(data, instance, flag);
                        console.log("component_id: " + component_id + "i:" + instance);
                        
			var id = await id_async(data, instance, flag);
                        console.log("id: " + id);
                
                        var payload = await buf_async(data, instance, flag);
                        console.log("payload: " + payload + "i:" + instance);
                      
			var checksum = await check_async(data, instance, flag);
                        console.log("checksum: " + checksum + "i:" + instance);
                        
			var whole_buffer = await who_async(data, instance, flag);
                        console.log("whole_buffer: " + whole_buffer + "i:" + instance);
			
                        } //else ignore
			if ( data[0] == flag_mav2){
			var flag = false;
			var char_start = await char_async(data, instance);
                        console.log("char_start: " + char_start + "i:" + instance);
			
			var payload_length = await payload_async(data, instance);
                        console.log("payload_length: " + payload_length + "i:" + instance);

			var inc = await inc_async(data, instance);
			console.log("inc: " + inc + "i:" + instance);
	
			var cmp = await cmp_async(data, instance);
			console.log("cmp: " + cmp + "i:" + instance);

			var seq = await seq_async(data, instance, flag);
			console.log("sequence_number: " + sequence_number + "i:" + instance);
			
			var system_id = await sys_async(data, instance, flag);
			console.log("system_id: " + system_id + "i:" + instance);

			var component_id = await comp_async(data, instance, flag);
			console.log("component id: " + component_id + "i:" + instance);

			var id = await id_async(data, instance, flag);
			console.log("id: " + id);
			
			var payload = await buf_async(data, instance, flag);
			console.log("payload: " + payload + "i:" + instance);

			var check_async = await check_async(data, instance, flag);
			console.log("checksum: " + check_async + "i:" + instance);

			var signature = await sig_async(data, instance);
			console.log("signature: " + signature + "i:" + instance);
			
			var whole_buffer = await who_async(data, instance, flag);
			console.log( "whole buffer: " + whole_buffer + "i:" + instance);

			}
			if ( data[0] == heartbeat){
				// heartbeat message
				console.log("HEARTBEAT");
				/* #0 
				 fields.type uint8_t
				 fields.autopilot  uint8_t
				 fields.base_mode uint8_t
				 fields.custom_mode uint32_t
				 fields.system_status uint8_t
				 fields.mavlink_version uintu_t_mavlink_version
				*/
				try {
				// test out
				var type = data.type;
				// var type = fields.type;
				console.log("type:" + type);
				var autopilot = data.autopilot
				// var autopilot = fields.autopilot;
				console.log("autopilot:" + autopilot);
				var base_mode = data.base_mode;
				// var base_mode = fields.base_mode;
				console.log("base_mode:" + base_mode);
				var custom_mode = Buffer.alloc(4);
				data.copy(custom_mode, 0, 3, 4);
				// fields.custom_mode(custom_mode, 0, 3, 4);
				console.log("custom_mode:" + custom_mode);
				var system_status = data.system_status;
				// var system_status = fields.system_status;
				console.log("system_status:" + system_status);
		
				var mavlink_version = data.mavlink_version;
				// var mavlink_version = fields.mavlink_version;
				console.log("mavlink_version"+ mavlink_version);


				} catch(e) { console.log(e); } 
			}
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
		client.send(fields,3001,HOST, (err) => {
			if (err) {
				console.log(err); 
				client.close();
			} else {
				console.log("ATTITUDE sending: " + fields);
			}
		});
	});

	myMav.on("SYSTEM_TIME", (message, fields) => {
		
		/* #2
		fields.time_unix_usec uint64_t us
		fields. time_boot_ms uint32_t ms
		*/
		client.send(fields, 3001, HOST, (err) => {
		    if (err) {
                                console.log(err);
                                client.close();
                        } else {
                                console.log("SYSTEM_TIME sending: " + fields);
                        }
		}
	});

	myMav.on("SYS_STATUS",  (message, fields)  => {
		
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
		client.send(fields, 3001, HOST, (err) => {
		    if (err) {
                                console.log(err);
                                client.close();
                        } else {
                                console.log("SYS_STATUS sending: " + fields);
                        }
		}
	});

	myMav.on("LINK_NODE_STATUS", (message, fields) => {
		
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
		client.send(fields, 3001, HOST, (err) => {
		    if (err) {
                                console.log(err);
                                client.close();
                        } else {
                                console.log("LINK_NODE_STATUS sending: " + fields);
                    	}
		}
	});

	myMav.on("SCALED_IMU", (message, fields) => {
		
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
		client.send(fields, 3001, HOST, (err) => {
		    if (err) {
                                console.log(err);
                                client.close();
                        } else {
                                console.log("SCALED_IMU sending: " + fields);
                        }
		}
	});

	myMav.on("GLOBAL_POSITION_INT", (message, fields) => {
		
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
		client.send(fields, 3001, HOST, (err) => {
		    if (err) {
                                console.log(err);
                                client.close();
                        } else {
                                console.log("GLOBAL_POSITION_INT sending: " + fields);
                        }
		}
	});

	/* #147 not needed syst_status reports battery
	myMav.on("BATTERY_STATUS", (message, fields) => {
		console.log(fields);
		
	});
	*/

	myMav.on("EXTENDED_SYS_STATE", (message, fields) => {
		

		/* #245
		fields.vtol_state uint8_t MAV_VTOL_STATE
		fields.landed_state uint8_t MAV_LANDED_STATE
		*/
		client.send(fields, 3001, HOST, (err) => {
		    if (err) {
                                console.log(err);
                                client.close();
                        } else {
                                console.log("EXTENDING_SYS_STATE sending: " + fields);
                        }
		} 
	});

	myMav.on("RC_CHANNELS", (message, fields) => {
		
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
		client.send(fields, 3001, HOST, (err) => {
		    if (err) {
                                console.log(err);
                                client.close();
                        } else {
                                console.log("RC_CHANNELS sending: " + fields);
                        }
		}
	});

	myMav.on("SCALED_PRESSURE", (message, fields) => {

		/*#29
		fields.time_boot_ms uint32_t ms	
		fields.press_abs float	hPa
		fields.press_diff float hPa
		fields.temperature  int16_t cdegC
		fields.temperature_press_diff ** int16_t cdegC
		*/
		client.send(fields, 3001, HOST, (err) => {
    			if (err) {
                                console.log(err);
                                client.close();
                        } else {
                                console.log("SCALED_PRESSURE sending: " + fields);
                        }
		}
	});

	myMav.on("SERVO_OUTPUT_RAW", (message, fields) => {
	
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
		client.send(fields, 3001, HOST, (err) => {
		    if (err) {
                                console.log(err);
                                client.close();
                        } else {
                                console.log("SERVO_OUTPUT_RAW sending: " + fields);
                        }
		}
	});

});


