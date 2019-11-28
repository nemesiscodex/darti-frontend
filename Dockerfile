FROM node:12.13.1-alpine3.9

WORKDIR /app

COPY package.json /app/

RUN yarn install

COPY . /app/

RUN yarn build

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]