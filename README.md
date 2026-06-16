# Lab 1 - CI/CD Pipeline

## Objective

The objective of this lab is to build a basic CI/CD environment using:

- Vagrant
- VirtualBox
- Ubuntu 22.04
- Jenkins
- GitHub

---

## Architecture

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
Deploy

---

## Branch Strategy

The repository uses a feature branch workflow.

### Main Branch

- `main`
- Protected branch
- Pull Requests required before merging

### Team Branches

- `blaina`
- `junior`
- `loriana`
- `lucie`
- `yorgo-haykal`

Each member works on their own branch and submits Pull Requests to merge changes into `main`.

---

## Virtual Environment

The project uses Vagrant and VirtualBox to create a reproducible Ubuntu environment.

### Start the VM

```bash
vagrant up
````

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

The Vagrant environment automatically installs:

* OpenJDK 21
* Git
* Curl
* Wget
* Net-tools

---

## Jenkins

Jenkins is accessible through:

[http://localhost:8080](http://localhost:8080)

To retrieve the initial administrator password:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

---

## CI Pipeline

The Jenkins pipeline performs:

1. Checkout source code from GitHub
2. Install Node.js dependencies
3. Run automated tests

Pipeline stages:
- Checkout
- Install Dependencies
- Run Tests

---
## Team Members

- Blaina NIANGI-KIAYUKUA
- Koffi Jean-Luc Junior ADJIEY
- Loriana RATOVO
- Lucie MOREAU
- Yorgo HAYKAL
