
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
var t_time_boot = 0;
var t_roll = 0;
var t_pitch = 0;
var t_yaw = 0;
var t_rollspeed = 0;
var t_pitchspeed = 0;
var t_yawspeed = 0;
var t_load = 0;
var t_vol_bat = 0;
var t_bat_re = 0;
var t_drop_rate = 0;
var t_timestamp = 0;
var t_tx_buf = 0;
var t_rx_buf = 0;
var t_tx_rate = 0;
var t_rx_rate = 0;
var t_message_sent = 0;
var t_message_received = 0;
var t_message_lost = 0;
var t_xacc = 0;
var t_yacc = 0;
var t_zacc = 0;
var t_lat = 0;
var t_long = 0;
var t_alt = 0;
var t_rel_alt = 0;
var t_vx = 0;
var t_vy = 0;
var t_vz = 0;
var t_heading = 0;
var t_vtol_state = 0;
var t_landed_state = 0;
var t_chancount = 0;
var t_rssi = 0;
var t_servo1 = 0;
var t_servo2 = 0;
var t_servo3 = 0;
var t_x = 0;
var t_y = 0;
var t_z = 0;
var t_xgyro = 0;
var t_ygyro = 0;
var t_zgyro = 0;
var t_xmag = 0;
var t_ymag = 0;
var t_zmag = 0;

// add all the glorious functions getter/setters and update data structure
var data = {
    "data_packet": this.data_packet,
    "time_boot": this.time_boot,
     "roll": this.roll,
     "pitch": this.pitch,
     "yaw": this.yaw,
     "rollspeed": this.rollspeed,
     "pitchspeed": this.pitchspeed,
     "yawspeed": this.yawspeed,
     "load": this.load,
     "vol_bat": this.vol_bat,
     "bat_re": this.bat_re,
     "drop_rate": this.drop_rate,
     "time_stamp": this.time_stamp,
     "tx_buf": this.tx_buf,
     "rx_buf": this.rx_buf,
     "tx_rate": this.tx_rate,
     "rx_rate": this.rx_rate,
     "message_sent": this.message_sent,
     "message_received": this.message_received,
     "message_lost": this.message_lost,
     "xacc": this.xacc,
     "yacc": this.yacc,
     "zacc": this.zacc,
     "lat": this.lat,
     "long": this.long,
     "alt": this.alt,
     "rel_alt": this.rel_alt,
     "vx": this.vx,
     "vy": this.vy,
     "vz": this.vz,
     "heading": this.heading,
     "vtol_state": this.vtol_state,
     "landed_state": this.landed_state,
     "chancount": this.chancount,
     "rssi": this.rssi,
     "servo1": this.servo1, 
     "servo2": this.servo2,
     "servo3": this.servo3,
     "x": this.x,
     "y": this.y,
     "z": this.z,
     "xgyro" : this.xgyro,
     "ygyro" : this.ygyro,
     "zgyro" : this.zgyro,
     "xmag" : this.xmag,
     "ymag" : this.ymag, 
     "zmag" : this.zmag
}

function getter_data (){ return data.data_packet; }
function setter_data(x){ data.data_packet = x; }

//setters
function set_time_boot(x){ data.time_boot = x; }
function set_roll(x){ data.roll = x; }
function set_pitch(x){ data.pitch = x; }
function set_yaw(x){ data.yaw = x; }
function set_rollspeed(x){ data.rollspeed = x; }
function set_pitchspeed(x){ data.pitchspeed = x; }
function set_yawspeed(x){ data.yawspeed = x; }
function set_load(x){ data.load = x; }
function set_vol_bat(x){ data.vol_bat = x; }
function set_bat_re(x){ data.bat_re = x; }
function set_drop_rate(x){ data.drop_rate = x; }
function set_time_stamp(x){ data.time_stamp = x; }
function set_tx_buf(x){ data.tx_buf = x; }
function set_rx_buf(x){ data.rx_buf = x; }
function set_tx_rate(x){ data.tx_rate = x; }
function set_rx_rate(x){ data.rx_rate = x; }
function set_message_sent(x){ data.message_sent = x; }
function set_message_lost(x){ data.message_lost = x; }
function set_message_received(x){ data.message_received = x; }
function set_xacc(x){ data.xacc = x; }
function set_yacc(x){ data.yacc = x; }
function set_zacc(x){ data.zacc = x; }
function set_lat(x){ data.lat = x; }
function set_long(x){ data.long = x; }
function set_alt(x){ data.alt = x; }
function set_rel_alt(x){ data.rel_alt = x; }
function set_vx(x){ data.vx = x; }
function set_vy(x){ data.vy = x; }
function set_vz(x){ data.vz = x; }
function set_vtol_state(x){ data.vtol_state = x; }
function set_landed_state(x){ data.landed_state = x; }
function set_chancount(x){ data.chancount = x; }
function set_rssi(x){ data.rssi = x; }
function set_servo1(x){ data.servo1 = x; }
function set_servo2(x){ data.servo2 = x; }
function set_servo3(x){ data.servo3 = x; }
function set_x(x){ data.x = x; }
function set_y(x){ data.y = x; }
function set_z(x){ data.z = x; }
function set_heading(x){ data.heading = x; }
function set_xgyro(x){ data.xgyro = x; }
function set_ygyro(x){ data.ygyro = x; }
function set_zgyro(x){ data.zgyro = x; }
function set_xmag(x){ data.xmag = x; }
function set_ymag(x){ data.ymag = x; }
function set_zmag(x){ data.zmag = x; }


// getters
function get_time_boot(){ return data.time_boot; }
function get_roll(){ return data.roll; }
function get_pitch(){ return data.pitch; }
function get_yaw(){ return data.yaw; }
function get_rollspeed(){ return data.rollspeed; }
function get_pitchspeed(){ return data.pitchspeed; }
function get_yawspeed(){ return data.yawspeed; }
function get_load(){ return data.load; }
function get_vol_bat(){ return data.vol_bat; }
function get_bat_re(){ return data.bat_re; }
function get_drop_rate(){ return data.drop_rate; }
function get_time_stamp(){ return data.time_stamp; }
function get_tx_buf(){ return data.tx_buf; }
function get_rx_buf(){ return data.rx_buf; }
function get_tx_rate(){ return data.tx_rate; }
function get_rx_rate(){ return data.rx_rate; }
function get_message_sent(){ return data.message_sent; }
function get_message_lost(){ return data.message_lost; }
function get_message_received(){ return data.message_received; }
function get_xacc(){ return data.xacc; }
function get_yacc(){ return data.yacc; }
function get_zacc(){ return data.zacc; }
function get_lat(){ return data.lat; }
function get_long(){ return data.long; }
function get_alt(){ return data.alt; }
function get_rel_alt(){ return data.rel_alt; }
function get_vx(){ return data.vx; }
function get_vy(){ return data.vy; }
function get_vz(){ return data.vz; }
function get_vtol_state(){ return data.vtol_state; }
function get_landed_state(){ return data.landed_state; }
function get_chancount(){ return data.chancount; }
function get_rssi(){ return data.rssi; }
function get_servo1(){ return data.servo1; }
function get_servo2(){ return data.servo2; }
function get_servo3(){ return data.servo3; }
function get_x(){ return data.x; }
function get_y(){ return data.y; }
function get_z(){ return data.z; }
function get_heading(){ return data.heading; }
function get_xgyro(){ return data.xgyro; }
function get_ygyro(){ return data.ygyro; }
function get_zgyro(){ return data.zgyro; }
function get_xmag(){ return data.xmag; }
function get_ymag(){ return data.ymag; }
function get_zmag(){ return data.zmag; }
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
        //console.log("API EVENT FIRE");
        //console.log("The data in api route is: %s", data);
        
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
// set var  
    	set_time_boot(t_time_boot);
     	set_roll(t_roll); 
     	set_pitch(t_pitch);
     	set_yaw(t_yaw);
    	set_rollspeed(t_rollspeed);
    	set_pitchspeed(t_pitchspeed);
    	set_yawspeed(t_yawspeed);
    	set_load(t_load);
    	set_vol_bat(t_vol_bat);
    	set_bat_re(t_bat_re);
    	set_drop_rate(t_drop_rate);
    	set_tx_buf(t_tx_buf);
    	set_rx_buf(t_rx_buf);
    	set_tx_rate(t_tx_rate);
    	set_rx_rate(t_rx_rate);
    	set_message_sent(t_message_sent);
    	set_message_received(t_message_received);
    	set_message_lost(t_message_lost);
	    set_xacc(t_xacc);
	    set_yacc(t_yacc);
    	set_zacc(t_zacc);
	    set_lat(t_lat);
    	set_long(t_long);
	    set_alt(t_alt);
    	set_rel_alt(t_rel_alt);
	    set_vx(t_vx);
	    set_vy(t_vy);
	    set_vz(t_vz);
        set_heading(t_heading);
	    set_vtol_state(t_vtol_state);
	    set_landed_state(t_landed_state);
	    set_chancount(t_chancount);
	    set_rssi(t_rssi);
	    set_servo1(t_servo1);
	    set_servo2(t_servo2);
	    set_servo3(t_servo3);
	    set_x(t_x);
    	set_y(t_y);
    	set_z(t_z);
        set_xgyro(t_xgyro);	
        set_ygyro(t_ygyro);	
        set_zgyro(t_zgyro);	
        set_xmag(t_xmag);	
        set_ymag(t_ymag);	
        set_zmag(t_zmag);	
    	res.render('pages/index', {data});

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
   // console.log(`UDP message received:  from ${res.address}:${res.port}`);
	// expecting message to be a buffer that had stringify done to it
	var fields = JSON.parse(message.toString());
	// fun part of parsing below

    try {
        if (fields.hasOwnProperty('time_boot_ms')){
        //uint32
            var time_boot = (fields.time_boot_ms/1000).toFixed(2);

            t_time_boot = time_boot;

            set_time_boot(time_boot);

        }

        if (fields.hasOwnProperty('roll')){

            var roll = (fields.roll).toFixed(2);

            t_roll = roll;

            set_roll(roll);

        }

        if (fields.hasOwnProperty('pitch')){

            var pitch = (fields.pitch).toFixed(2);

            t_pitch = pitch;

            set_pitch(pitch);

        }

        if (fields.hasOwnProperty('yaw')){

            var yaw = (fields.yaw).toFixed(2);

            t_yaw = yaw;

            set_yaw(yaw);

        }

        if (fields.hasOwnProperty('rollspeed')){

            var rollspeed = (fields.rollspeed).toFixed(2);

            t_rollspeed = rollspeed;

            set_rollspeed(rollspeed);

        }

        if (fields.hasOwnProperty('pitchspeed')){

            var pitchspeed = (fields.pitchspeed).toFixed(2);

            t_pitchspeed = pitchspeed;

            set_pitchspeed(pitchspeed);

        }

        if (fields.hasOwnProperty('yawspeed')){

            var yawspeed = (fields.yawspeed).toFixed(2);

            t_yawspeed = yawspeed;

            set_yawspeed(yawspeed);

        }

        if (fields.hasOwnProperty('xgyro')){
    
            var xgyro = (fields.xgyro).toFixed(2);
    
            t_xgyro = xgyro;

            set_xgyro(xgyro);

        }


        if (fields.hasOwnProperty('ygyro')){
   
            var ygyro = (fields.ygyro).toFixed(2);
   
            t_ygyro = ygyro;
    
            set_ygyro(ygyro);

        }

        if (fields.hasOwnProperty('zgyro')){
    
            var zgyro = (fields.zgyro).toFixed(2);
    
            t_zgyro = zgyro;
  
            set_zgyro(zgyro);

        }

        if (fields.hasOwnProperty('xmag')){

            var xmag = (fields.xmag).toFixed(2);
   
            t_xmag = xmag;
    
            set_xmag(xmag);

        }

        if (fields.hasOwnProperty('ymag')){

            var ymag = (fields.ymag).toFixed(2);
    
            t_ymag = ymag;
 
            set_ymag(ymag);

        }

        if (fields.hasOwnProperty('zmag')){

            var zmag = (fields.zmag).toFixed(2);
    
            t_zmag = zmag;
    
            set_zmag(zmag);

        }

        if (fields.hasOwnProperty('load')){

            //uint16

            var load = (fields.load).toFixed(2);

            t_load = load;

            set_load(load);

        }

        if (fields.hasOwnProperty('voltage_battery')){

            //uint16t

            var vol_bat = (fields.voltage_battery).toFixed(2);

            t_vol_bat = vol_bat;

            set_vol_bat(vol_bat);

        }

        if (fields.hasOwnProperty('battery_remaining')){

            //int8_t

            var bat_re = (fields.battery_remaining).toFixed(2);

            t_bat_re = bat_re;

            set_bat_re(bat_re);

        }

        if (fields.hasOwnProperty('drop_rate_comm')){

            //unint16_t

            var drop_rate = (fields.drop_rate_comm).toFixed(2);

            t_drop_rate = drop_rate;

            set_drop_rate(drop_rate);

        }

        if (fields.hasOwnProperty('timestamp')){

    
            var timestamp = (fields.timestamp).toFixed(2);

            t_timestamp = time_stamp;

            set_time_stamp(time_stamp);

        }

        if (fields.hasOwnProperty('tx_buf')){

            var tx_buf = (fields.tx_buf).toFixed(2);

            t_tx_buf = tx_buf;

            set_tx_buf(tx_buf);

        }

        if (fields.hasOwnProperty('rx_buf')){

            var rx_buf = (fields.rx_buf).toFixed(2);

            t_rx_buf = rx_buf;

            set_rx_buf(rx_buf);

        }

        if (fields.hasOwnProperty('tx_rate')){

            var tx_rate = (fields.tx_rate).toFixed(2);

            t_tx_rate = tx_rate;

            set_tx_rate(tx_rate);

        }

        if (fields.hasOwnProperty('rx_rate')){

            var rx_rate = (fields.rx_rate).toFixed(2);

            t_rx_rate = rx_rate;

            set_rx_rate(rx_rate);

        }

        if (fields.hasOwnProperty('messages_sent')){

            var message_sent = (fields.messages_sent).toFixed(2);

            t_message_sent = message_sent;

            set_message_sent(message_sent);

        }

        if (fields.hasOwnProperty('messages_received')){

            var message_received = (fields.messages_received).toFixed(2);

            t_message_received = message_received;

            set_message_received(message_received);

        }

        if (fields.hasOwnProperty('messages_lost')){

            var message_lost = (fields.messages_lost).toFixed(2);

            t_message_lost = message_lost;

            set_message_lost(message_lost);

        }

        if (fields.hasOwnProperty('xacc')){

            var xacc = (fields.xacc).toFixed(2);

            t_xacc = xacc;

            set_xacc(xacc);

        }

        if (fields.hasOwnProperty('yacc')){

            var yacc = (fields.yacc).toFixed(2);

            t_yacc = yacc;

            set_yacc(yacc);

        }

        if (fields.hasOwnProperty('zacc')){

            var zacc = (fields.zacc).toFixed(2);

            t_zacc = zacc;

            set_zacc(zacc);

        }

        if (fields.hasOwnProperty('lat')){

            var lat = (fields.lat).toFixed(2);

            t_lat = lat;

            set_lat(lat);

        }

        if (fields.hasOwnProperty('long')){

            var long = (fields.long).toFixed(2);

            t_long = long;

            set_long(long);

        }

        if (fields.hasOwnProperty('alt')){

            var alt = (fields.alt).toFixed(2);

            t_alt = alt;

            set_alt(alt);

        }

        if (fields.hasOwnProperty('relative_alt')){

            var rel_alt = (fields.relative_alt).toFixed(2);

            t_rel_alt = rel_alt;

            set_rel_alt(rel_alt);

        }

        if (fields.hasOwnProperty('vx')){
	
            // distinguish between float and uint16_t via 
	
            // check field bytelength, float > int16_t
	
            var buf = Buffer.alloc(fields.vx);
	
            if (Buffer.byteLength(buf) > 2) {
	
                // float
		
                var vx = (fields.vx).toFixed(2);
		
                t_vx = vx;
		
                set_vx(vx);
        
                buf = Buffer.alloc(0);
	
            }  //else we ignore dont want the other val

        }

        if (fields.hasOwnProperty('vy')){
	   
            // distinguish between float and uint16_t via
       
            // check field bytelength, float > int16_t
        
            var buf = Buffer.alloc(fields.vy);
        
            if (Buffer.byteLength(buf) > 2) {
        
                // float
              
                var vy = (fields.vy).toFixed(2);
               
                t_vy = vy;
                
                set_vy(vy);
            
                buf = Buffer.alloc(0);
        
            }  //else we ignore dont want the other val

        }

        if (fields.hasOwnProperty('vz')){
   
            // distinguish between float and uint16_t via
        
            // check field bytelength, float > int16_t
        
            var buf = Buffer.alloc(fields.vz);
        
            if (Buffer.byteLength(buf) > 2) {
        
                // float
                
                var vz = (fields.vz).toFixed(2);
                
                t_vz = vz;
                
                set_vz(vz);
        
            }  //else we ignore dont want the other val

        }

        if (fields.hasOwnProperty('hdg')){

            var heading = (fields.hdg).toFixed(2);

            t_heading = heading;

            set_heading(heading);

        }

        if (fields.hasOwnProperty('vtol_state')){

            var vtol_state = (fields.vtol_state).toFixed(2);

            t_vtol_state = vtol_state;

            set_vtol_state(vtol_state);

        }

        if (fields.hasOwnProperty('landed_state')){

            var landed_state = (fields.landed_state).toFixed(2);

            t_landed_state = landed_state;

            set_landed_state(landed_state);

        }

        if (fields.hasOwnProperty('chancount')){

            var chancount = (fields.chancount).toFixed(2);

            t_chancount = chancount;

            set_chancount(chancount);

        }

        if (fields.hasOwnProperty('rssi')){

            var rssi = (fields.rssi).toFixed(2);

            t_rssi = rssi;

            set_rssi(rssi);

        }

        if (fields.hasOwnProperty('servo1_raw')){

            var servo1 = (fields.servo1_raw).toFixed(2);

            t_servo1 = servo1;

            set_servo1(servo1);

        }

        if (fields.hasOwnProperty('servo2_raw')){

            var servo2 = (fields.servo2_raw).toFixed(2);

            t_servo2 = servo2;

            set_servo2(servo2);

        }

        if (fields.hasOwnProperty('servo3_raw')){

            var servo3 = (fields.servo3_raw).toFixed(2);

            t_servo3 = servo3;

            set_servo3(servo3);

        }

        if (fields.hasOwnProperty('x')){

            var x = (fields.x).toFixed(2);

            t_x = x;

            set_x(x);

        }

        if (fields.hasOwnProperty('y')){

            var y = (fields.y).toFixed(2);

            t_y = y;

            set_y(y);

        }

        if (fields.hasOwnProperty('z')){

            var z = (fields.z).toFixed(2);

            t_z = z;

            set_z(z);

        }

    } catch(e) {console.log(e);}
  //  temp = req.toString();
//    setter_data(req.toString());
});

//*TODO on terminate close sockets safely
socket.on('close', function () {
    socket.end();
    socket.destroy();
    console.log("socket closed");
  });



