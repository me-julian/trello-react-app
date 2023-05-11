ARG NODE_VERSION

FROM node:$NODE_VERSION

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

ARG CLIENT_PORT
ENV CLIENT_PORT=$CLIENT_PORT
ARG API_IP
ENV API_IP=$API_IP
ARG API_PORT
ENV API_PORT=$API_PORT

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY dist dist/
COPY index.js .
COPY config.js .

CMD [ "node", "index.js" ]