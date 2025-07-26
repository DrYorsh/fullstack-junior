FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json package.json

RUN yarn install

COPY . .

EXPOSE 8000

CMD [ "yarn", "dev" ]