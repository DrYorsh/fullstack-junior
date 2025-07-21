FROM node:22-alpine as buid

WORKDIR /usr/src/app

COPY package.json package.json
RUN yarn install

COPY . .
RUN yarn build

FROM nginx:stable-alpine

COPY --from=build ./build /user/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/defualt.conf

EXPOSE 3000

CMD [ "nginx", "-g", "daemon off" ]