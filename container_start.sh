#!/bin/bash

echo "starting X server and VNC display"
# Check and remove stale X lock
if [ -f /tmp/.X1-lock ]; then
    echo "Removing stale X server lock file."
    killall Xvfb
    killall x11vnc
    rm -f /tmp/.X1-lock
    rm -f /tmp/.X11-unix/X1
fi

touch ~/.Xauthority
Xvfb :1 -screen 0 1024x768x24 -noreset &  # Starts Xvfb
sleep 5  # Waits for 5 seconds to allow Xvfb to start
/usr/bin/x11vnc -display :1.0 -usepw -quiet &   # Starts x11vnc
export DISPLAY=:1.0                              # Sets and exports the DISPLAY variable
echo "starting node server"
npm start                                       # Starts the Node.js application
