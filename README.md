# headful-puppeteer-docker

Whether headless or headful, getting Puppeteer to run inside a Docker container was pretty trivial. The challenge was displaying the GUI in headful mode.

After piecing together a few different resources, I decided to create a quick demo repo.

## Installation

You will need to have [`Docker`](https://docs.docker.com/get-docker/) installed to use this.

## Docker

Build with:

`$ docker build -t headful-puppeteer-image .`

Run with:

`$ docker run -p 5900:5900 -p 3000:3000 --name headful-puppeteer-container headful-puppeteer-image`

Stop with:

`$ docker stop headful-puppeteer-container`

## Service (For Ubuntu)

Setup service for your VM:(Must inside source repo: /headful-puppeteer-docker)

`$ chmod +x ./service/setup.sh`

`$ sh ./service/setup.sh`

Check service status with:

`$ sudo systemctl status headful-puppeteer-docker`

Start service with:

`$ sudo systemctl start headful-puppeteer-docker`

Stop service with:

`$ sudo systemctl stop headful-puppeteer-docker`

Restart service with:

`sudo systemctl restart headful-puppeteer-docker`

## API

`$ curl --location 'http://localhost:3000/open-page?targetUrl=example.com`
