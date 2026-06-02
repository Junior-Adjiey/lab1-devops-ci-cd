# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  # Ubuntu 22.04 LTS
  config.vm.box = "ubuntu/jammy64"

  # Nom de la machine virtuelle
  config.vm.hostname = "jenkins-server"

  # Port Jenkins
  config.vm.network "forwarded_port", guest: 8080, host: 8080

  # Port SSH
  config.vm.network "forwarded_port", guest: 22, host: 2222, id: "ssh"

  # Dossier partagé
  config.vm.synced_folder ".", "/vagrant"

  # Configuration VirtualBox
  config.vm.provider "virtualbox" do |vb|
    vb.name = "Lab1-Jenkins"
    vb.memory = "4096"
    vb.cpus = 2
  end

  # Provisioning automatique
  config.vm.provision "shell", inline: <<-SHELL

    apt-get update

    # Java 21
    apt-get install -y openjdk-21-jre

    # Git
    apt-get install -y git

    # Outils utiles
    apt-get install -y curl wget net-tools

    echo "Environment ready"

  SHELL

end