const dgram = require("dgram");
//const { send } = require("process");
const HOST = "localhost";
const PORT = "3001";
const client = dgram.createSocket("udp4");

var obj1 = {"time_boot_ms":92645,"roll":0.03568163141608238,"pitch":0.052300505340099335,"yaw":-0.017276573926210403,"rollspeed":-0.0008158028358593583,"pitchspeed":0.0006289949524216354,"yawspeed":-0.00028909218963235617};
var obj2 = {"time_boot_ms":92645,"roll":0.03568163141608238,"pitch":0.052300505340099335,"yaw":-0.017276573926210403,"rollspeed":-0.0008158028358593583,"pitchspeed":0.0006289949524216354,"yawspeed":-0.00028909218963235617};
var obj3 = {"time_boot_ms":92645,"lat":0,"lon":0,"alt":-200,"relative_alt":-203,"vx":0,"vy":0,"vz":0,"hdg":35902};
var obj4 = {"onboard_control_sensors_present":325188655,"onboard_control_sensors_enabled":54656047,"onboard_control_sensors_health":34667547,"load":90,"voltage_battery":11208,"current_battery":29,"drop_rate_comm":0,"errors_comm":0,"errors_count1":0,"errors_count2":0,"errors_count3":0,"errors_count4":0,"battery_remaining":99};
var obj5 = {"time_boot_ms":93645,"roll":0.03582407534122467,"pitch":0.05234040692448616,"yaw":-0.017470847815275192,"rollspeed":0.0007989378063939512,"pitchspeed":0.00039532053051516414,"yawspeed":-0.0004318898427300155};
var obj6 = {"time_boot_ms":94645,"roll":0.03587024658918381,"pitch":0.052327096462249756,"yaw":-0.017694920301437378,"rollspeed":0.0005504881264641881,"pitchspeed":0.0012926700292155147,"yawspeed":-0.0009735773783177137};
var obj7 = {"time_boot_ms":94645,"lat":0,"lon":0,"alt":-190,"relative_alt":-197,"vx":0,"vy":0,"vz":0,"hdg":35899};
var obj8 = {"onboard_control_sensors_present":325188655,"onboard_control_sensors_enabled":54656047,"onboard_control_sensors_health":34667547,"load":95,"voltage_battery":11207,"current_battery":29,"drop_rate_comm":0,"errors_comm":0,"errors_count1":0,"errors_count2":0,"errors_count3":0,"errors_count4":0,"battery_remaining":99};
var obj9 = {"time_boot_ms":96645,"roll":0.03587041422724724,"pitch":0.05242210999131203,"yaw":-0.018044494092464447,"rollspeed":0.0004615793004631996,"pitchspeed":0.0017165965400636196,"yawspeed":0.00007595639181090519};
var obj10 = {"time_boot_ms":96645,"lat":0,"lon":0,"alt":-170,"relative_alt":-175,"vx":0,"vy":0,"vz":0,"hdg":35897};
var obj11 = {"time_boot_ms":97645,"lat":0,"lon":0,"alt":-160,"relative_alt":-163,"vx":0,"vy":0,"vz":0,"hdg":35896};
var obj12 = {"time_boot_ms":98645,"press_abs":1019.9549560546875,"press_diff":0,"temperature":4717};
var obj13 = {"time_unix_usec":0,"time_boot_ms":98645};
var obj14 = {"time_boot_ms":99645,"roll":0.03587314859032631,"pitch":0.05240151658654213,"yaw":-0.018497902899980545,"rollspeed":-0.0007784243207424879,"pitchspeed":0.0003602905198931694,"yawspeed":-0.0019354631658643484};
var obj15 = {"time_boot_ms":99645,"lat":0,"lon":0,"alt":-140,"relative_alt":-141,"vx":0,"vy":0,"vz":0,"hdg":35895};
var obj16 = {"time_boot_ms":100645,"press_abs":1019.9524536132812,"press_diff":0,"temperature":4717};
var obj17 = {"time_unix_usec":0,"time_boot_ms":100645};
var obj18 = {"time_boot_ms":101651,"roll":0.035977885127067566,"pitch":0.05248836427927017,"yaw":-0.0188339501619339,"rollspeed":0.0005848560249432921,"pitchspeed":-0.0002063316060230136,"yawspeed":0.000041614788642618805};
var obj19 = {"time_boot_ms":101651,"lat":0,"lon":0,"alt":-140,"relative_alt":-146,"vx":0,"vy":0,"vz":0,"hdg":35893};
var obj20 = {"time_boot_ms":102651,"press_abs":1019.9503784179688,"press_diff":0,"temperature":4718};
//console.log(obj1);

const buf1 = Buffer.from(JSON.stringify(obj1));
const buf2 = Buffer.from(JSON.stringify(obj2));
const buf3 = Buffer.from(JSON.stringify(obj3));
const buf4 = Buffer.from(JSON.stringify(obj4));
const buf5 = Buffer.from(JSON.stringify(obj5));
const buf6 = Buffer.from(JSON.stringify(obj6));
const buf7 = Buffer.from(JSON.stringify(obj7));
const buf8 = Buffer.from(JSON.stringify(obj8));
const buf9 = Buffer.from(JSON.stringify(obj9));
const buf10 = Buffer.from(JSON.stringify(obj10));
const buf11 = Buffer.from(JSON.stringify(obj11));
const buf12 = Buffer.from(JSON.stringify(obj12));
const buf13 = Buffer.from(JSON.stringify(obj13));
const buf14 = Buffer.from(JSON.stringify(obj14));
const buf15 = Buffer.from(JSON.stringify(obj15));
const buf16 = Buffer.from(JSON.stringify(obj16));
const buf17 = Buffer.from(JSON.stringify(obj17));
const buf18 = Buffer.from(JSON.stringify(obj18));
const buf19 = Buffer.from(JSON.stringify(obj19));
const buf20 = Buffer.from(JSON.stringify(obj20));

const arr = [buf1,buf2,buf3,buf4,buf5,buf6,buf7,buf8,buf9,buf10,buf11,buf12,buf13,buf14,buf15,buf16,buf17,buf18,buf19,buf20];
//console.log(buf1);

//for(var i = 0; i < 20; i++){
    //console.log("Sending: " + i);
   // client.send(arr[i], PORT, HOST, ()=>{
        //const temp = new ArrayBuffer(arr[i]);
    //console.log("Sending: " + temp);
//});
//}
//
    client.send(buf1, PORT, HOST, () => { console.log("Sending: " + buf1); });
    client.send(buf2, PORT, HOST, () => { console.log("Sending: " + buf2); });
    client.send(buf3, PORT, HOST, () => { console.log("Sending: " + buf3); });
    client.send(buf4, PORT, HOST, () => { console.log("Sending: " + buf4); });
    client.send(buf5, PORT, HOST, () => { console.log("Sending: " + buf5); });
    client.send(buf6, PORT, HOST, () => { console.log("Sending: " + buf6); });
    client.send(buf7, PORT, HOST, () => { console.log("Sending: " + buf7); });
    client.send(buf8, PORT, HOST, () => { console.log("Sending: " + buf8); });
    client.send(buf9, PORT, HOST, () => { console.log("Sending: " + buf9); });
    client.send(buf10, PORT, HOST, () => { console.log("Sending: " + buf10); });
    client.send(buf11, PORT, HOST, () => { console.log("Sending: " + buf11); });
    client.send(buf12, PORT, HOST, () => { console.log("Sending: " + buf12); });
    client.send(buf13, PORT, HOST, () => { console.log("Sending: " + buf13); });
    client.send(buf14, PORT, HOST, () => { console.log("Sending: " + buf14); });
    client.send(buf15, PORT, HOST, () => { console.log("Sending: " + buf15); });
    client.send(buf16, PORT, HOST, () => { console.log("Sending: " + buf16); });
    client.send(buf17, PORT, HOST, () => { console.log("Sending: " + buf17); });
    client.send(buf18, PORT, HOST, () => { console.log("Sending: " + buf18); });
    client.send(buf19, PORT, HOST, () => { console.log("Sending: " + buf19); });
    client.send(buf20, PORT, HOST, () => { console.log("Sending: " + buf20); });
