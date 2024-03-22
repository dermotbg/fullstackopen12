#  build / base stage
FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

# Test stage
FROM build-stage AS test-stage

RUN CI=true npm test

RUN env REACT_APP_BACKEND_URL=http://localhost:8080/api npm run build

#  serve stage

FROM nginx AS serve-stage

COPY --from=build-stage /usr/src/app/build /var/www