FROM node:9.6.1
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . /usr/src/app
COPY package.json /usr/src/app/package.json
RUN npm install
EXPOSE 9090
CMD ["npm", "start"]