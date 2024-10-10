FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN chown root:root .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]