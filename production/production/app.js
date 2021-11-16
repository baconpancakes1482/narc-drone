const express = require('express');
const ejs = require('ejs');
const app = express();
const dgram = require('dgram');
const port = process.env.PORT || 8001;
const path = require('path');
const socket = dgram.createSocket('udp4');
const Stream = require('node-rtsp-stream');

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
/*
stream = new Stream({
	name: 'name',
	streamUrl: 'rtsp://10.0.2.100:8554/video',
	wsPort: 8555,
	ffmpegOptions: {
	'-stats': '',
	'-r': 30
	}

});
*/

// ?
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

socket.on('message', (req, res) => {
    console.log(`UDP message received: ${req} from ${res.address}:${res.port}`);
    temp = req.toString();
    setter_data(req.toString());
});

//*TODO on terminate close sockets safely
socket.on('close', function () {
    socket.end();
    socket.destroy();
    console.log("socket closed");
  });



