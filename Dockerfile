FROM ubuntu:latest

MAINTAINER Nagendra Gautham "gautham.gn@gmail.com"

RUN apt-get update && apt-get install -y apache2 \
    libapache2-mod-wsgi \
    build-essential \
    python \
    python-dev\
    python-pip \
    vim \
 && apt-get clean \
 && apt-get autoremove \
 && rm -rf /var/lib/apt/lists/*

#Install requirements for running the server side script
COPY ./temp/requirements.txt /var/www/temp/temp/requirements.txt
RUN pip install --upgrade pip
RUN pip install -r /var/www/temp/temp/requirements.txt

# Apache config to enable site
COPY ./temp.conf /etc/apache2/sites-available/temp.conf
RUN a2ensite temp
RUN a2enmod headers

# WSGI File
COPY ./temp.wsgi /var/www/temp/temp.wsgi

COPY ./temp /var/www/temp/temp/

RUN a2dissite 000-default.conf
RUN a2ensite temp.conf

EXPOSE 80

WORKDIR /var/www/temp

# CMD ["/bin/bash"]
RUN  echo 'ServerName localhost' >> /etc/apache2/apache2.conf
CMD  /usr/sbin/apache2ctl -D FOREGROUND