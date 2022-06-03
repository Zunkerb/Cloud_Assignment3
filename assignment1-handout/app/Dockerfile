FROM node:15-alpine

WORKDIR /user/app

COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm","start"]