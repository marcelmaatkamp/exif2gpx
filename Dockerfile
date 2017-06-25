FROM node
WORKDIR /project

COPY package.json package.json
RUN npm install

COPY start.js start.js

VOLUME /images

CMD ["node","start.js"]
