FROM ubuntu:trusty

RUN apt-get update && \
    apt-get install -y \
    nodejs \
    npm

RUN mkdir /src
COPY . /src
WORKDIR /src
RUN npm install

EXPOSE 3000

CMD ["nodejs", "index.js"]