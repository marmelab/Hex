FROM node:12-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json yarn.lock tsconfig.json tsconfig.build.json start.sh ./
COPY src ./src
COPY public ./public
COPY views ./views

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

RUN yarn install 

ENV TYPEORM_ENTITIES "dist/**/*.entity.js"
ENV TYPEORM_SYNCHRONIZE "true"

RUN yarn build

EXPOSE 3000
CMD /wait && ./start.sh