#  build / base stage
FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

#  serve stage
FROM nginx AS serve-stage

COPY --from=build-stage /usr/src/app/dist /var/www