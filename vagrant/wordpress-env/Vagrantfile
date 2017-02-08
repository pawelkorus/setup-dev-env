# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/precise64"

  config.vm.network "forwarded_port", guest: 3306, host: 17888
  config.vm.network "forwarded_port", guest: 17999, host: 17999

  config.vm.provision 'shell', name: 'update package repository', inline: <<-SHELL
    apt-get update
  SHELL

  config.vm.provision 'shell', name: 'install mysql', inline: <<-SHELL
  	 debconf-set-selections <<< 'mysql-server mysql-server/root_password password root'
  	 debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password root'
     apt-get install -y mysql-server
     sed -i "s/.*bind-address.*/bind-address = 0.0.0.0/" /etc/mysql/my.cnf
     mysql -uroot -proot -e "GRANT ALL ON *.* TO root@'%' IDENTIFIED BY 'root';FLUSH PRIVILEGES;"
     mysql -uroot -proot -e "CREATE DATABASE wordpress CHARACTER SET utf8 COLLATE utf8_general_ci;"
     /etc/init.d/mysql restart
  SHELL

  config.vm.provision 'shell', name: 'install php', inline: <<-SHELL
    apt-get install -y python-software-properties
    add-apt-repository -y ppa:ondrej/php
    apt-get update
    apt-get install -y php5.6-cli php5.6-mysql php5.6-curl
  SHELL

  # on vagrant up/reload run php server
  config.vm.provision "shell", name: 'run php server', run: 'always', inline: <<-SHELL
    if [ $(nc -z 127.0.0.1 17999; echo $?) -eq 1 ]; then php -S 0.0.0.0:17999 -t /vagrant/wordpress & fi;
  SHELL
end
