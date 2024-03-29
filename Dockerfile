FROM node:16.15.0 as build

WORKDIR /src

COPY . /src/

RUN git config --global url."https://github.com/".insteadOf "git://github.com/"

RUN npm i --silent
RUN npm i react-scripts@3.0.1 -g --silent

RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=build /src/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]