# Web Interface
**Week 2**:
```
MAVLink Notes:
MAVLink is a serial protocol that sends data and commands between the drone and the ground station. So the RPi will use MAVLink to commmunicate between the FC for telemetry data, and potentially commands based on configuration used.

The additional setup of the FC requires a ground station running Mission Planner to set specific parameters.

The RPi serial port needs to be enabled via: 

sudo raspi-config

Interfacing Options -> Serial -> "no" login shell / "yes" serial port hardware

reboot. RPi serial port /dev/serial0 now available.

We got to configure the wifi access point, see: https://www.raspberrypi.org/documentation/computers/configuration.html

We then can use Rpanion-server to configure FC telemetry, logging, video streaming, and network config.

Rpanion-server Notes:
The Rpanion-server is a software package that provides a web-based interface for configuring the network, telemetry via MAVLink routing, and logging from the FC. Deployment of the Rpanion-server will rely on a UART connection to the FC, RPi connection to camera, and USB Wifi adapter (If Pi zero W, we have integrated option).

To deploy this on an RPi, we will need to use the micro SD card on a laptop/PC and install the latest image. Then we use Etcher to load the image on the microSD and insert the microSD into the RPi.
Etcher is a third party software that will flash an OS to the SD card so that the Rpi can run the rpanion-server.
We also have the option to directly install Rpanion-server to the RPi via instructions provided in https://github.com/stephendade/Rpanion-server

Joystick Notes: 
The use of a logitech controller viable is with the combination of mission planner on a laptop (ground station). The details to configure are provided in documentation but this is not to be used alone due to safety problems! The use of an RC controller as backup is needed for safety.

```
**Week 3**:
```
```
