ARG NODE_VERSION
ARG PORT

FROM node:$NODE_VERSION

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY dist dist/
COPY index.js .

EXPOSE $PORT

CMD [ "node", "index.js" ]