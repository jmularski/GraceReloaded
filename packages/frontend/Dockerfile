FROM node:latest
WORKDIR /frontend

COPY package.json .
RUN yarn

COPY . .

EXPOSE 3000

CMD ["npm", "start"]