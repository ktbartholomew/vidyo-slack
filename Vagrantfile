# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.synced_folder "./", "/vagrant"
  config.vm.network "forwarded_port", guest: 3000, host: 3000
end
