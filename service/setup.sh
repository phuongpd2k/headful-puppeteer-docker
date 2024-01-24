#Move the service file to the systemd folder
sudo cp headful-puppeteer-docker.service /etc/systemd/system/

#Reload the systemd daemon
sudo systemctl daemon-reload

#Enable the service to start on boot
sudo systemctl enable headful-puppeteer-docker.service

