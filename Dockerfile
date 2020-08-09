FROM node:12.16.1-slim

COPY . /app

WORKDIR /app

ENV TZ=America/Sao_Paulo

RUN npm cache clean --force && npm install

EXPOSE 3333

ENTRYPOINT [ "npm", "start" ]