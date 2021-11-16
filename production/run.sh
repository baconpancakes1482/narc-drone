#!/bin/bash

trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT
echo "running websocket"
node jsmpeg/websocket-relay.js supersecret 8081 8082 &
echo "done."
echo "running ffmpeg"
ffmpeg -f v4l2 -framerate 30 -video_size 480x360 -i /dev/video0 -f mpegts -codec:v mpeg1video -s 480x360 -b:v 1000k -bf 0 http://10.0.2.100:8081/supersecret &
echo "done."
echo "running webserver"
cd production/
node app.js 
echo "done"

