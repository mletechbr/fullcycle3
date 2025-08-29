FROM node:15

WORKDIR /usr/src/app

COPY package*.json ./

COPY index.js ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]