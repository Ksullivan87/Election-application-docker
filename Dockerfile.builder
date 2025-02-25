FROM ubuntu:latest AS builder 
#use as a builder for the app

RUN apt-get update && apt-get install -y \
#I never know i needed all these dependencies for my application, the following are more notes for me than anything else
  curl \
  #node src security
  gnupg \ 
  #linux distribution data thing that node could use
  lsb-release \
  #https certificates
  ca-certificates \
  #node setup
  && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
  && apt-get install -y nodejs \
  && apt-get install -y postgresql-client \
  && apt-get clean

WORKDIR /app

#the good good
COPY package*.json ./

RUN npm install

COPY . .

#runtime area
FROM node:16-slim

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000

CMD [ "npm", "start" ]

