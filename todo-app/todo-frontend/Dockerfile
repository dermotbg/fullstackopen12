FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:3000
# FE runs on port 3001:3001

RUN npm ci 

RUN npm run build
