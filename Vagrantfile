# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  ############################################
  # VM 1 : Jenkins Server (Lab 1)
  ############################################
  config.vm.define "jenkins" do |jenkins|
    jenkins.vm.box = "ubuntu/jammy64"
    jenkins.vm.hostname = "jenkins-server"

    # Ports Jenkins + Calculator
    jenkins.vm.network "forwarded_port", guest: 8080, host: 8080
    jenkins.vm.network "forwarded_port", guest: 3000, host: 3000

    # SSH
    jenkins.vm.network "forwarded_port", guest: 22, host: 2222, id: "ssh"

    # Shared folder
    jenkins.vm.synced_folder ".", "/vagrant"

    # VirtualBox config
    jenkins.vm.provider "virtualbox" do |vb|
      vb.name = "Lab1-Jenkins"
      vb.memory = 4096
      vb.cpus = 2
    end

    # Provisioning
    jenkins.vm.provision "shell", inline: <<-SHELL
      apt-get update -y
      apt-get install -y openjdk-21-jre git curl wget net-tools
      echo "Jenkins VM ready"
    SHELL
  end


  ############################################
  # VM 2 : Docker Server (Lab 2)
  ############################################
  config.vm.define "docker" do |docker|
    docker.vm.box = "ubuntu/jammy64"
    docker.vm.hostname = "docker-server"

    # IP privée pour Docker Remote API
    docker.vm.network "private_network", ip: "192.168.56.11"

    docker.vm.provider "virtualbox" do |vb|
      vb.name = "Lab2-Docker"
      vb.memory = 2048
      vb.cpus = 2
    end

    docker.vm.provision "shell", inline: <<-SHELL
      apt-get update -y
      apt-get install -y docker.io
      systemctl enable docker
      systemctl start docker
      usermod -aG docker vagrant
      echo "Docker VM ready"
    SHELL
  end

end
