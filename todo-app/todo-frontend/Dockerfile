#  build / base stage
FROM node:16 AS base

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:3000

RUN npm ci 

RUN npm run build

# Test stage
FROM base AS test

RUN npm ci

COPY --from=base /usr/src/app/build .

RUN CI=true npm test

#  serve stage
FROM nginx:1.20-alpine

COPY --from=test /usr/src/app/build /usr/share/nginx/html

# FE runs on port 3001
# start with: docker run -p 3001:80 -it todo-frontend