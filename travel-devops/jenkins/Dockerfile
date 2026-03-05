FROM jenkins/jenkins:lts

USER root

RUN apt-get update && \
    apt-get install -y docker.io docker-compose && \
    apt-get clean

USER jenkins

USER root

RUN apt-get update && \
    apt-get install -y ansible git python3-pip && \
    apt-get clean

USER jenkins
