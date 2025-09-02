FROM node:18-alpine

WORKDIR /usr/src/app

ENV DOCKERIZE_VERSION v0.8.0

RUN apk add --no-cache wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
       | tar xzf - -C /usr/local/bin \
    && apk del wget

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
