FROM node:15-alpine

WORKDIR /Cloud_Assignment3/assignment1-handout/app/

COPY ./package .json ./
RUN npm install
COPY ./ ./

CMD ["npm"]["start"]