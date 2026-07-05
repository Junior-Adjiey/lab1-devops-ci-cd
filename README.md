# 🚀 DevOps CI/CD Platform

A complete DevOps platform demonstrating **Continuous Integration (CI)**, **Continuous Deployment (CD)** and **Infrastructure Automation** using **Jenkins**, **Docker**, **Docker Hub**, **Ansible**, **Vagrant** and **Ubuntu**.

---

# 📋 Table of Contents

- Overview
- Features
- Technologies
- Architecture
- Repository Structure
- Getting Started
- Jenkins Pipeline
- Deployment Workflow
- Team

---

# 📖 Overview

This project was developed as part of the DevOps laboratory sessions.

The objective is to build a complete CI/CD platform capable of automatically:

- retrieving the latest source code from GitHub;
- building and testing the application;
- creating a Docker image;
- publishing the image to Docker Hub;
- deploying the application automatically on a production server using Ansible;
- verifying the deployment.

The infrastructure consists of two Ubuntu virtual machines:

- **VM1** hosts Jenkins and all CI/CD services.
- **VM2** hosts Docker and runs the production application.

---

# ✨ Features

- ✅ Continuous Integration with Jenkins
- ✅ Docker-based Build Agent
- ✅ Automated Testing
- ✅ Docker Image Creation
- ✅ Docker Image Versioning
- ✅ Docker Hub Integration
- ✅ Continuous Deployment with Ansible
- ✅ Infrastructure as Code
- ✅ Deployment Verification
- ✅ Discord Build Notifications

---

# 🛠 Technologies

| Technology | Purpose |
|------------|----------|
| Jenkins | Continuous Integration and Continuous Deployment |
| Docker | Application Containerization |
| Docker Hub | Docker Image Registry |
| Ansible | Automated Deployment |
| Vagrant | Virtual Machine Provisioning |
| Ubuntu 22.04 | Operating System |
| GitHub | Source Code Management |
| Node.js | Calculator Application Runtime |

---

# 🏗 Architecture

The Proof of Concept is based on a two-server architecture.

- **VM1** is dedicated to Continuous Integration.
- **VM2** is dedicated to application deployment.

Insert **Figure 1 – Overall Architecture** here.

---

# 📂 Repository Structure

```text
.
├── Jenkinsfile
├── README.md
├── Vagrantfile
├── ansible
│   ├── deploy.yml
│   ├── inventory
│   ├── nginx.yml
│   ├── install_package.yml
│   └── package_management.yml
│
├── app
│   └── calculator
│       ├── Dockerfile
│       ├── package.json
│       ├── server.js
│       ├── public
│       └── test
│
└── scripts
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/Junior-Adjiey/lab1-devops-ci-cd.git

cd lab1-devops-ci-cd
```

---

## Start the Virtual Machines

```bash
vagrant up
```

---

## Connect to Jenkins VM

```bash
vagrant ssh jenkins-server
```

---

## Connect to Docker VM

```bash
vagrant ssh docker-server
```

---

## Jenkins Access

Jenkins is available at:

```text
http://localhost:8080
```

Retrieve the administrator password:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```
---

# ⚙️ Jenkins CI/CD Pipeline

The CI/CD pipeline is fully automated using Jenkins.

Each pipeline execution performs the following operations:

1. Checkout the latest source code from GitHub
2. Build the application inside a Docker build agent
3. Execute automated tests
4. Build a Docker image
5. Authenticate with Docker Hub
6. Push the versioned Docker image
7. Deploy the application using Ansible
8. Verify the deployment
9. Send a Discord notification

Insert **Figure 2 – Jenkins CI/CD Pipeline Workflow** here.

---

# 🐳 Docker Image Versioning

Each successful pipeline execution creates a new Docker image tagged with the Jenkins build number.

Example:

```text
juninhoh/calculator-app:38
juninhoh/calculator-app:39
juninhoh/calculator-app:40
```

This strategy ensures traceability between Jenkins builds and Docker images while allowing previous versions to be redeployed if necessary.

---

# 📦 Docker Hub Integration

The Docker images are automatically published to Docker Hub after each successful build.

Repository:

```text
juninhoh/calculator-app
```

The production server always pulls the latest validated version before deployment.

---

# 🚀 Automated Deployment

Application deployment is fully automated using Ansible.

The deployment playbook performs the following actions:

- Pull the latest Docker image from Docker Hub
- Stop the currently running container (if any)
- Remove the previous container
- Start a new production container
- Expose the application on port **3001**

Insert **Figure 3 – Automated Deployment Workflow** here.

---

# 📋 Deployment Verification

After deployment, Jenkins automatically verifies that the application is available by sending an HTTP request to the production server.

If the verification succeeds, the pipeline finishes successfully and a notification is sent to Discord.

---

# 📊 Project Workflow

```text
Developer
    │
git push
    │
GitHub Repository
    │
Webhook
    │
Jenkins Pipeline
    │
Docker Build Agent
    │
Automated Tests
    │
Docker Image
    │
Docker Hub
    │
Ansible Deployment
    │
Docker Server
    │
Calculator Application
```

---

# 📈 Project Highlights

- Automated CI/CD pipeline
- Docker-based isolated build environment
- Docker image versioning
- Infrastructure as Code using Ansible
- Automated production deployment
- Deployment verification
- Discord build notifications
- Modular two-server architecture

---

# 👥 Team

- Blaina NIANGI-KIAYUKUA
- Koffi Jean-Luc Junior ADJIEY
- Loriana RATOVO
- Lucie MOREAU
- Yorgo HAYKAL

---