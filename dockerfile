FROM ubuntu:22.04

WORKDIR /app

COPY . .

RUN apt update

RUN apt install git -y
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
# RUN ls
# RUN source ~/.bashrc
# RUN nvm list-remote
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION v20.2.0

RUN mkdir -p /usr/local/nvm && apt-get update && echo "y" | apt-get install curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"

ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/bin
ENV PATH $NODE_PATH:$PATH

RUN npm install

RUN apt install sqlite3 -y
RUN apt install nano

EXPOSE 5555

CMD [ "npm", "run", "start:dev" ]