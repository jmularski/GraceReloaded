FROM node:12.2.0-alpine as build-stage

WORKDIR /website

ENV PATH /website/node_modules/.bin:$PATH

COPY package.json /website/package.json

RUN npm config set unsafe-perm true
RUN npm install -g yarn

RUN yarn --silent
RUN yarn global add react-scripts@3.0.1 --silent

COPY . .

CMD ["npm", "start"]