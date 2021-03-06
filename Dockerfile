FROM node:12.13.1-alpine3.9

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install --production=true

COPY . /app/

RUN yarn build

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]