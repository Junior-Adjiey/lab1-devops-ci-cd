# DevOps Labs - CI/CD Pipeline, Docker Containerization and Ansible Automation

## Objective

The objective of these labs is to build a complete DevOps platform using:

* Vagrant
* VirtualBox
* Ubuntu 22.04
* GitHub
* Jenkins
* Docker
* Docker Hub
* Ansible

The project demonstrates:

* Continuous Integration (CI)
* Continuous Deployment (CD)
* Infrastructure Automation
* Docker-based Build Environments

---

# Global Architecture

Developer

↓

GitHub Repository

↓

Jenkins VM (192.168.56.10)

↓

Docker Agent (node:22)

↓

Build & Test

↓

Docker Build

↓

Docker Hub

↓

Ansible Deployment

↓

Docker Server (192.168.56.11)

├── calculator-prod

└── nginx

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
* Docker

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

# Docker Build Agent

The Build & Test stage is executed inside a temporary Docker container.

Docker image used:

```text
node:22
```

For every pipeline execution:

1. Jenkins creates a temporary container
2. npm install is executed
3. npm test is executed
4. The container is automatically removed

This guarantees a clean and reproducible build environment.

---

# Continuous Integration

The CI pipeline performs:

1. Checkout source code
2. Install dependencies
3. Run automated tests

Example:

```bash
npm install
npm test
```

---

# Calculator Application

The application provides a simple calculator interface.

Example:

```text
2 + 3 * 4 = 14
```

---

# Lab 2 - Docker Containerization

## Objective

The objective of Lab 2 is to containerize the application and automate image creation.

---

## Docker Virtual Machine

A dedicated Docker Server is deployed on:

```text
192.168.56.11
```

Verify Docker:

```bash
docker --version
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

## Build Docker Image

Navigate to the application:

```bash
cd app/calculator
```

Build image:

```bash
docker build -t calculator-app:v5 .
```

---

## Run Container

```bash
docker run -d \
--name calculator \
-p 3000:3000 \
calculator-app:v5
```

---

## Verify

```bash
docker ps
```

```bash
curl localhost:3000
```

---

# Docker Hub Integration

Docker images are automatically pushed to Docker Hub.

Repository:

```text
juninhoh/calculator-app
```

Docker Hub:

```text
https://hub.docker.com/r/juninhoh/calculator-app
```

---

## Image Versioning

Each pipeline execution creates a new version using:

```text
${BUILD_NUMBER}
```

Examples:

```text
calculator-app:24
calculator-app:25
calculator-app:26
```

---

# Automated Docker Push

Jenkins automatically:

1. Builds the image
2. Logs in to Docker Hub
3. Pushes the image

Example:

```bash
docker push juninhoh/calculator-app:${BUILD_NUMBER}
```

---

# Lab 3 - Configuration Management with Ansible

## Objective

The objective of Lab 3 is to automate infrastructure configuration and application deployment.

The Jenkins VM acts as the Ansible Control Node.

---

# Ansible Architecture

Jenkins Server (Control Node)

↓

Ansible

↓

SSH

↓

Docker Server (Managed Node)

---

## Inventory

```ini
[docker]
192.168.56.11 ansible_user=vagrant
```

---

## Connectivity Test

```bash
ansible all -i inventory -m ping
```

Expected result:

```text
pong
```

---

# Package Management

## Install Package

```yaml
---
- name: Install system package
  hosts: all
  become: true

  tasks:
    - name: Install htop
      apt:
        name: htop
        state: present
        update_cache: yes
```

Run:

```bash
ansible-playbook -i inventory install_package.yml
```

---

## Remove Package

```bash
ansible-playbook -i inventory package_management.yml --tags remove
```

---

# Nginx Deployment

Playbook:

```yaml
---
- name: Install Nginx
  hosts: all
  become: true

  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present

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

Verify:

```bash
systemctl status nginx
```

```bash
curl localhost
```

---

# Automated Application Deployment

Deployment is handled through Ansible.

Playbook:

```yaml
---
- name: Deploy Calculator Application
  hosts: all
  become: true

  tasks:

    - name: Pull Docker image
      shell: docker pull juninhoh/calculator-app:{{ version }}

    - name: Stop old container
      shell: docker rm -f calculator-prod || true

    - name: Start new container
      shell: |
        docker run -d \
        --name calculator-prod \
        -p 3001:3000 \
        juninhoh/calculator-app:{{ version }}
```

---

# Jenkins and Ansible Integration

Jenkins automatically executes:

```bash
ansible-playbook \
-i ansible/inventory \
ansible/deploy.yml \
-e version=${BUILD_NUMBER}
```

---

# Final Jenkins Pipeline

1. Build & Test
2. Build Docker Image
3. Docker Login
4. Push Image
5. Deploy
6. List Images

---

# Production Deployment Workflow

When a build is triggered:

1. Jenkins creates a Docker Agent
2. Dependencies are installed
3. Automated tests are executed
4. A Docker image is built
5. The image is tagged using BUILD_NUMBER
6. Jenkins logs in to Docker Hub
7. The image is pushed to Docker Hub
8. Ansible pulls the image on the Docker Server
9. The previous container is removed
10. The new version is deployed automatically

---

# Final Infrastructure

Developer

↓

GitHub Repository

↓

Jenkins VM (192.168.56.10)

↓

Docker Agent (node:22)

↓

Build & Test

↓

Docker Build

↓

Docker Hub

↓

Ansible Deployment

↓

Docker Server (192.168.56.11)

├── calculator-prod

└── nginx

---

# Results

The platform successfully provides:

* Continuous Integration with Jenkins
* Docker-based Build Agents
* Automated Testing
* Docker Image Build
* Docker Hub Integration
* Continuous Deployment with Ansible
* Automated Container Replacement
* Infrastructure Automation

---

# Production Application

```text
http://192.168.56.11:3001
```

---

# Nginx Service

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
