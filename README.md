# fullcycle3

**Install Go**<br/>
If you’re using Ubuntu 18.04, 20.04 or 22.04 (amd64, arm64 or armhf), then you can use the longsleep/golang-backports PPA and update to Go 1.22.

sudo add-apt-repository ppa:longsleep/golang-backports
sudo apt update
sudo apt install golang-go

Reference: https://go.dev/wiki/Ubuntu

**Create go.mod**<br/>
go mod init mletech/desafio-go

**Create go.sum**<br/>
go mod tidy

**Build Dockerfile**
docker build -t mletech/fullcycle:latest -f Dockerfile .

