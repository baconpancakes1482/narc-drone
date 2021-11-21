
const express = require('express');
const ejs = require('ejs');
const app = express();
const dgram = require('dgram');
const port = process.env.PORT || 8001;
const path = require('path');
const socket = dgram.createSocket('udp4');

// bind socket to port 3001
socket.bind(3001);

// global var
var temp = "Initiating";

var data = {
    "data_packet": this.data_packet
}

function getter_data (){
    return data.data_packet;
 }

 function setter_data(x){
     data.data_packet = x;
 }

// search for libraries, css in public dir
app.use(express.static('public'));

// ejs
app.set('view engine', 'ejs');

// headers
app.use('/', (req,res,next)=>{
   // res.header('Access-Control-Allow-Origin', 'http://localhost:8001');
    res.header('Access-Control-Allow-Origin','http://10.0.2.100:8001/');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //res.header('Connection', 'Keep-Alive');
    next();
});

//routes
app.get('/', (req, res, next) => {
    next();
});

app.get('/api/events/', (req, res)=> {
        console.log("API EVENT FIRE");
        console.log("The data in api route is: %s", data);
        var sample = getter_data();
        console.log(sample);
        res.json(data);
});

// use reponseBody function
app.use(responseBody);

// error handler
function errorHandler (err, req, res, next){
    console.log("error middleware");
    // no error then get out
    if (!err) return;
    // error status code NOT 404 OR if the app sent HTTP headers for response
    if (err.status !== 404 || res.headersSent) return next(err);
    // send 404 status code
    res.sendStatus(404);
    // respond json error
    res.json({ error: err});
};

// response after get request
function responseBody (req, res, next){

    // null & undefined check
    if (!(temp !== null && temp !== undefined)){
        temp="";
   }
     data.data_packet = temp;
     console.log("The data packet is: %s", data.data_packet);

    res.render('pages/index', {
        messages: temp
    });

    // ends response with no data
    res.end();
};

// use errorHandler function
app.use(errorHandler);

app.listen( port, () => {
    console.log(`Listening on port: ${port}`);
});

//figure out way to parse different fields from different specific messages
socket.on('message', (message, req, res) => {
    console.log(`UDP message received: ${req} from ${res.address}:${res.port}`);
	// expecting message to be a buffer that had stringify done to it
	const fields = JSON.parse( message ); // unwrap so we have our original fields object
try {	// fun part of parsing below
if (fields.hasOwnProperty('time_boot_ms')){
//uint32
const time_boot = new Uint32Array(message.time_boot_ms);
t_time_boot = time_boot;
set_time_boot(time_boot);
}
if (fields.hasOwnProperty('roll')){
const roll = message.roll;
t_roll = roll;
set_roll(roll);
}
if (fields.hasOwnProperty('pitch')){
const pitch = message.pitch;
t_pitch = pitch;
set_pitch(pitch);
}
if (fields.hasOwnProperty('yaw')){
const yaw = message.yaw;
t_yaw = yaw;
set_yaw(yaw);
}
if (fields.hasOwnProperty('rollspeed')){
const rollspeed = message.rollspeed;
t_rollspeed = rollspeed;
set_rollspeed(rollspeed);
}
if (fields.hasOwnProperty('pitchspeed')){
const pitchspeed = message.pitchspeed;
t_pitchspeed = pitchspeed;
set_pitchspeed(pitchspeed);
}
if (fields.hasOwnProperty('yawspeed')){
const yawspeed = message.yawspeed;
t_yawspeed = yawspeed;
set_yawspeed(yawspeed);
}
if (fields.hasOwnProperty('load')){
//uint16
const load = new Uint16Array(message.load);
t_load = load;
set_load(load);
}
if (fields.hasOwnProperty('voltage_battery')){
//uint16t
const vol_bat = new Uint16Array(message.voltage_battery);
t_vol_bat = vol_bat;
set_vol_bat(vol_bat);
}
if (fields.hasOwnProperty('battery_remaining')){
//int8_t
const bat_re = new Int8Array(message.battery_remaining);
t_bat_re = bat_re;
set_bat_re(bat_re);
}
if (fields.hasOwnProperty('drop_rate_comm')){
//unint16_t
const drop_rate = new Uint16Array(message.drop_rate_comm);
t_drop_rate = drop_rate;
set_drop_rate(drop_rate);
}
if (fields.hasOwnProperty('timestamp')){
const timestamp = message.timestamp;
t_timestamp = time_stamp;
set_time_stamp(time_stamp);
}
if (fields.hasOwnProperty('tx_buf')){
const tx_buf = new Uint8Array(message.tx_buf);
t_tx_buf = tx_buf;
set_tx_buf(tx_buf);
}
if (fields.hasOwnProperty('rx_buf')){
const rx_buf = new Uint8Array(message.rx_buf);
t_rx_buf = rx_buf;
set_rx_buf(rx_buf);
}
if (fields.hasOwnProperty('tx_rate')){
const tx_rate = new Uint32Array(message.tx_rate);
t_tx_rate = tx_rate;
set_tx_rate(tx_rate);
}
if (fields.hasOwnProperty('rx_rate')){
const rx_rate = new Uint32Array(message.rx_rate);
t_rx_rate = rx_rate;
set_rx_rate(rx_rate);
}
if (fields.hasOwnProperty('messages_sent')){
const message_sent = new Uint32Array(message.messages_sent);
t_message_sent = message_sent;
set_message_sent(message_sent);
}
if (fields.hasOwnProperty('messages_received')){
const message_received = new Uint32Array(message.messages_received);
t_message_received = message_received;
set_message_received(message_received);
}
if (fields.hasOwnProperty('messages_lost')){
const message_lost = new Uint32Array(message.messages_lost);
t_message_lost = message_lost;
set_message_lost(message_lost);
}
if (fields.hasOwnProperty('xacc')){
const xacc = new Int16Array(message.xacc);
t_xacc = xacc;
set_xacc(xacc);
}
if (fields.hasOwnProperty('yacc')){
const yacc = new Int16Array(message.yacc);
t_yacc = yacc;
set_yacc(yacc);
}
if (fields.hasOwnProperty('zacc')){
const zacc = new Int16Array(message.zacc);
t_zacc = zacc;
set_zacc(zacc);
}
if (fields.hasOwnProperty('lat')){
const lat = new Int32Array(message.lat);
t_lat = lat;
set_lat(lat);
}
if (fields.hasOwnProperty('long')){
const long = new Int32Array(message.long);
t_long = long;
set_long(long);
}
if (fields.hasOwnProperty('alt')){
const alt = new Int32Array(message.alt);
t_alt = alt;
set_alt(alt);
}
if (fields.hasOwnProperty('relative_alt')){
const rel_alt = new Int32Array(message.relative_alt);
t_rel_alt = rel_alt;
set_rel_alt(rel_alt);
}
if (fields.hasOwnProperty('vx')){
	// distinguish between float and uint16_t via 
	// check field bytelength, float > int16_t
	const buf = buffer.alloc(message.vx);
	if (Buffer.byteLength(buf) > 2) {
	// float
		const vx = message.vx;
		t_vx = vx;
		set_vx(vx);
	}  //else we ignore dont want the other val
}
if (fields.hasOwnProperty('vy')){
	   // distinguish between float and uint16_t via
        // check field bytelength, float > int16_t
        const buf = buffer.alloc(message.vy);
        if (Buffer.byteLength(buf) > 2) {
        // float
                const vy = message.vy;
                t_vy = vy;
                set_vy(vy);
        }  //else we ignore dont want the other val
}
if (fields.hasOwnProperty('vz')){
   // distinguish between float and uint16_t via
        // check field bytelength, float > int16_t
        const buf = buffer.alloc(message.vz);
        if (Buffer.byteLength(buf) > 2) {
        // float
                const vz = message.vz;
                t_vz = vz;
                set_vz(vz);
        }  //else we ignore dont want the other val
}
if (fields.hasOwnProperty('vtol_state')){
const vtol_state = new Uint8Array(message.vtol_state);
t_vtol_state = vtol_state;
set_vtol_state(vtol_state);
}
if (fields.hasOwnProperty('landed_state')){
const landed_state = new Uint8Array(message.landed_state);
t_landed_state = landed_state;
set_landed_state(landed_state);
}
if (fields.hasOwnProperty('chancount')){
const chancount = new Uint8Array(message.chancount);
t_chancount = chancount;
set_chancount(chancount);
}
if (fields.hasOwnProperty('rssi')){
const rssi = new Uint8Array(message.rssi);
t_rssi = rssi;
set_rssi(rssi);
}
if (fields.hasOwnProperty('servo1_raw')){
const servo1 = new Uint16Array(message.servo1_raw);
t_servo1 = servo1;
set_servo1(servo1);
}
if (fields.hasOwnProperty('servo2_raw')){
const servo2 = new Uint16Array(message.servo2_raw);
t_servo2 = servo2;
set_servo2(servo2);
}
if (fields.hasOwnProperty('servo3_raw')){
const servo3 = new Uint16Array(message.servo3_raw);
t_servo3 = servo3;
set_servo3(servo3);
}
if (fields.hasOwnProperty('x')){
const x = message.x;
t_x = x;
set_x(x);
}
if (fields.hasOwnProperty('y')){
const y = message.y;
t_y = y;
set_y(y);
}
if (fields.hasOwnProperty('z')){
const z = message.z;
t_z = z;
set_z(z);
} 
} catch (e) { console.log(e); }
    //temp = req.toString();
   // setter_data(req.toString());
});

//*TODO on terminate close sockets safely
socket.on('close', function () {
    socket.end();
    socket.destroy();
    console.log("socket closed");
  });



