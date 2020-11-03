FROM node:14

WORKDIR /usr/cyberbox

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

EXPOSE 8080