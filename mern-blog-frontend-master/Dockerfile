FROM node:22-alpine as build

WORKDIR /usr/src/app

COPY package.json package.json
RUN yarn install

COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build ./build /usr/share/nginx/html                          
COPY --from=build nginx.conf /etc/nginx/conf.d/defualt.conf

EXPOSE 3000

CMD [ "nginx", "-g", "daemon off" ]