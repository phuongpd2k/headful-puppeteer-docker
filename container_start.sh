#!/bin/bash
if [ -f /tmp/.X1-lock ] || [ -f /tmp/.X11-unix/X1 ]; then
  echo "Removing X server lock files."
  killall Xvfb
  killall x11vnc
  rm -f /tmp/.X1-lock
  rm -f /tmp/.X11-unix/X1
fi

echo "starting X server and VNC display"
touch ~/.Xauthority
Xvfb :1 -screen 0 1920x1080x24 -noreset & 
sleep 5
/usr/bin/x11vnc -display :1.0 -usepw -quiet -forever & 
export DISPLAY=:1.0 
echo "starting node server"
npm start & 
while true; do sleep 1000; done
