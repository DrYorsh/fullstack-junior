FROM node:22-alpine AS builder
RUN npm install -g npm@11.4.2

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY --from=builder nginx.conf /etc/nginx/conf.d/defualt.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]