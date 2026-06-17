# Lab 1 & Lab 2 - CI/CD Pipeline and Docker Containerization

## Objective

The objective of these labs is to build a basic DevOps environment using:

* Vagrant
* VirtualBox
* Ubuntu 22.04
* GitHub
* Jenkins
* Docker
* Docker Hub

---

## Architecture

```text
Developer
    ↓
GitHub Repository
    ↓
Jenkins
    ↓
Build
    ↓
Test
    ↓
Docker Build
    ↓
Docker Hub
    ↓
Deploy
```

---

## Branch Strategy

The repository uses a feature branch workflow.

### Main Branch

* `main`
* Protected branch
* Pull Requests required before merging

### Team Branches

* `blaina`
* `junior`
* `loriana`
* `lucie`
* `yorgo-haykal`

Each member works on their own branch and submits Pull Requests before merging into `main`.

---

# Lab 1 - Jenkins CI Pipeline

## Virtual Environment

The project uses Vagrant and VirtualBox to create a reproducible Ubuntu environment.

### Start the Jenkins VM

```bash
vagrant up
```

### Connect to the VM

```bash
vagrant ssh
```

### Stop the VM

```bash
vagrant halt
```

### Destroy the VM

```bash
vagrant destroy
```

---

## Installed Tools

The Jenkins VM automatically installs:

* OpenJDK 21
* Git
* Curl
* Wget
* Net-tools

---

## Jenkins

Jenkins is accessible through:

```text
http://localhost:8080
```

Retrieve the initial administrator password:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

---

## CI Pipeline

The Jenkins pipeline performs:

1. Checkout source code from GitHub
2. Install Node.js dependencies
3. Run automated tests

### Pipeline Stages

* Checkout
* Install Dependencies
* Run Tests

---

# Calculator Application

The calculator can be accessed through:

```text
http://localhost:3000
```

Example:

```text
2+3*4 = 14
```

---

# Lab 2 - Docker Containerization

## Objective

The objective of Lab 2 is to containerize the calculator application using Docker and publish the image to Docker Hub.

---

## Docker Virtual Machine

A second VM is used as a dedicated Docker host.

### Verify Docker Installation

```bash
docker --version
```

Example:

```text
Docker version 29.x.x
```

---

## Dockerfile

```dockerfile
FROM node:22

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]
```

---

## Build the Docker Image

Navigate to the calculator application:

```bash
cd app/calculator
```

Build the image:

```bash
docker build -t calculator-app:v5 .
```

---

## Run the Container

```bash
docker run -d -p 3000:3000 --name calculator calculator-app:v5
```

Verify that the container is running:

```bash
docker ps
```

---

## Test the Application

Using a browser:

```text
http://localhost:3000
```

Using curl:

```bash
curl localhost:3000
```

---

## Container Inspection

View container logs:

```bash
docker logs calculator
```

Access the container shell:

```bash
docker exec -it calculator bash
```

---

## Docker Hub

The image has been published on Docker Hub.

Repository:

```text
juninhoh/calculator-app
```

Tag:

```text
v1
```

### Pull the Image

```bash
docker pull juninhoh/calculator-app:v1
```

### Run the Published Image

```bash
docker run -d -p 3000:3000 juninhoh/calculator-app:v1
```

---

## Useful Docker Commands

### List Images

```bash
docker images
```

### List Running Containers

```bash
docker ps
```

### List All Containers

```bash
docker ps -a
```

### Stop a Container

```bash
docker stop calculator
```

### Remove a Container

```bash
docker rm calculator
```

### Remove an Image

```bash
docker rmi calculator-app:v5
```

---

## Docker Hub Repository

https://hub.docker.com/r/juninhoh/calculator-app

---

## Team Members

* Blaina NIANGI-KIAYUKUA
* Koffi Jean-Luc Junior ADJIEY
* Loriana RATOVO
* Lucie MOREAU
* Yorgo HAYKAL
