FROM node:17

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

CMD [ "npm", "start" ]
