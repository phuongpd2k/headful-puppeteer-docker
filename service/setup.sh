#Move the service file to the systemd folder
sudo cp service/headful-puppeteer-docker.service /etc/systemd/system/

#Reload the systemd daemon
sudo systemctl daemon-reload

#Enable the service to start on boot
sudo systemctl enable headful-puppeteer-docker.service

