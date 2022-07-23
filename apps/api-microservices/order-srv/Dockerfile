FROM node:16-alpine as base

WORKDIR /app

FROM base as production
ENV NODE_ENV=production
RUN corepack enable
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN rm -rf ./libs/db-auth/src/generated
RUN rm -rf ./libs/db-monolithic/src/generated
RUN rm -rf ./libs/db-product/src/generated
RUN yarn build:order-srv
CMD ["node", "dist/apps/api-microservices/order-srv/main.js"]

FROM base as development
ENV NODE_ENV=development
CMD ["yarn", "serve", "api-microservices-order-srv"]
