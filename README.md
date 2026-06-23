# DevOps Labs - CI/CD Pipeline, Docker Containerization and Ansible Automation

## Objective

The objective of these labs is to build a complete DevOps environment using:

* Vagrant
* VirtualBox
* Ubuntu 22.04
* GitHub
* Jenkins
* Docker
* Docker Hub
* Ansible

The project demonstrates Continuous Integration (CI), Continuous Deployment (CD), and Infrastructure Automation.

---

# Global Architecture

Developer
↓
GitHub Repository
↓
Jenkins VM (192.168.56.10)
↓
CI/CD Pipeline
↓
Docker Remote API
↓
Docker VM (192.168.56.11)

├── build-agent (temporary)

├── calculator-prod (production)

└── nginx (managed by Ansible)

---

# Branch Strategy

The repository uses a feature branch workflow.

## Main Branch

* main
* Protected branch
* Pull Requests required before merging

## Team Branches

* blaina
* junior
* loriana
* lucie
* yorgo-haykal

Each member works on their own branch and submits Pull Requests before merging into main.

---

# Lab 1 - Jenkins Continuous Integration

## Virtual Environment

The project uses Vagrant and VirtualBox to create reproducible Ubuntu virtual machines.

### Start the VM

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
* Jenkins

---

## Jenkins Access

Jenkins is accessible through:

```text
http://localhost:8080
```

Retrieve the initial administrator password:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

---

## Continuous Integration Pipeline

The Jenkins pipeline performs:

1. Checkout source code from GitHub
2. Install Node.js dependencies
3. Run automated tests

### Pipeline Stages

* Checkout
* Install Dependencies
* Run Tests

---

## Calculator Application

The calculator application can be accessed through:

```text
http://localhost:3000
```

Example:

```text
2+3*4 = 14
```

---

# Lab 2 - Docker Containerization and Deployment

## Objective

The objective of Lab 2 is to containerize the calculator application and automate its deployment using Docker.

---

## Docker Virtual Machine

A second Ubuntu VM is used as a dedicated Docker host.

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
docker run -d \
--name calculator \
-p 3000:3000 \
calculator-app:v5
```

Verify:

```bash
docker ps
```

---

## Test the Application

Browser:

```text
http://localhost:3000
```

Command line:

```bash
curl localhost:3000
```

---

## Container Inspection

View logs:

```bash
docker logs calculator
```

Access container shell:

```bash
docker exec -it calculator bash
```

---

# Docker Hub

The image has been published on Docker Hub.

Repository:

```text
juninhoh/calculator-app
```

Tag:

```text
v1
```

Docker Hub URL:

```text
https://hub.docker.com/r/juninhoh/calculator-app
```

---

## Pull the Image

```bash
docker pull juninhoh/calculator-app:v1
```

---

## Run the Published Image

```bash
docker run -d \
--name calculator-prod \
-p 3001:3000 \
juninhoh/calculator-app:v1
```

---

# Docker Remote API

Docker exposes a Remote API that allows Jenkins to manage containers remotely.

Docker Server:

```text
192.168.56.11
```

Docker API Endpoint:

```text
http://192.168.56.11:2375
```

Verify connectivity:

```bash
curl http://192.168.56.11:2375/version
```

---

# Jenkins and Docker Integration

Jenkins communicates with Docker through the Remote API.

Jenkins Server:

```text
192.168.56.10
```

Docker Server:

```text
192.168.56.11
```

This integration allows Jenkins to:

* Create containers remotely
* Start containers remotely
* Deploy applications remotely
* Delete temporary containers automatically

---

# Dynamic Build Agent

When a pipeline is executed, Jenkins creates a temporary Docker container.

Example:

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{
  "Image":"node:22",
  "Cmd":["node","--version"]
}' \
http://192.168.56.11:2375/containers/create?name=build-agent
```

The container is automatically deleted after the build.

---

# Automated Deployment

The application is automatically deployed as:

```text
calculator-prod
```

Deployment port:

```text
3001
```

Verification:

```bash
docker ps
```

```bash
curl http://localhost:3001
```

---

# Lab 3 - Configuration Management with Ansible

## Objective

The objective of Lab 3 is to automate server configuration and service deployment using Ansible.

The Jenkins server acts as the Ansible Control Node and manages the Docker server remotely through SSH.

---

## Ansible Architecture

Jenkins Server (Control Node)
↓
Ansible
↓
SSH
↓
Docker Server (Managed Node)

---

## Inventory

Inventory file:

```ini
[docker]
192.168.56.11 ansible_user=vagrant
```

Verify connectivity:

```bash
ansible all -i inventory -m ping
```

Expected result:

```text
pong
```

---

## Package Management

### Install Package

Playbook:

```yaml
---
- name: Install system package
  hosts: docker
  become: yes

  tasks:
    - name: Install htop
      apt:
        name: htop
        state: present
        update_cache: yes
```

Execution:

```bash
ansible-playbook -i inventory install_package.yml
```

---

### Remove Package Using Tags

```bash
ansible-playbook -i inventory package_management.yml --tags remove
```

---

## Nginx Deployment

Playbook:

```yaml
---
- name: Install Nginx
  hosts: docker
  become: yes

  tasks:

    - name: Install nginx
      apt:
        name: nginx
        state: present
        update_cache: yes

    - name: Start nginx
      service:
        name: nginx
        state: started
        enabled: yes
```

Deploy:

```bash
ansible-playbook -i inventory nginx.yml
```

Verification:

```bash
systemctl status nginx
```

```bash
curl localhost
```

Expected output:

```text
Welcome to nginx!
```

---

# Jenkins and Ansible Integration

The Jenkins pipeline automatically executes an Ansible playbook during deployment.

Added pipeline stage:

```groovy
stage('Run Ansible Playbook') {
    steps {
        sh '''
        ansible-playbook \
        -i ansible/inventory \
        ansible/nginx.yml
        '''
    }
}
```

---

# Final Jenkins Pipeline

1. Checkout
2. Install Dependencies
3. Run Tests
4. Docker Remote API
5. Create Build Container
6. Deploy Application
7. Run Ansible Playbook
8. Delete Build Container

---

# Production Deployment Workflow

When a build is triggered:

1. Jenkins downloads the source code.
2. Dependencies are installed.
3. Automated tests are executed.
4. Jenkins connects to Docker through the Remote API.
5. A temporary build-agent container is created.
6. The application is deployed as calculator-prod.
7. Ansible configures the Docker server.
8. Nginx is verified and started.
9. The build-agent container is removed.
10. The production container remains running.

---

# Final Infrastructure

Developer
↓
GitHub Repository
↓
Jenkins VM (192.168.56.10)
↓
Pipeline Execution
↓
Docker Remote API + Ansible
↓
Docker VM (192.168.56.11)

├── build-agent (temporary)

├── calculator-prod (production)

└── nginx (managed automatically)

---

# Results

The complete DevOps platform successfully provides:

* Continuous Integration with Jenkins
* Automated Testing
* Docker Containerization
* Docker Remote API Management
* Dynamic Build Agents
* Automated Deployment
* Configuration Management with Ansible
* Automated Nginx Deployment
* Infrastructure Automation

Production Application:

```text
http://192.168.56.11:3001
```

Nginx Service:

```text
http://192.168.56.11
```

---

# Team Members

* Blaina NIANGI-KIAYUKUA
* Koffi Jean-Luc Junior ADJIEY
* Loriana RATOVO
* Lucie MOREAU
* Yorgo HAYKAL
