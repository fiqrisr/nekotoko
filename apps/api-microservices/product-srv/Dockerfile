FROM node:16-alpine as base

WORKDIR /app

FROM base as production
ENV NODE_ENV=production
RUN corepack enable
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN rm -rf ./libs/db-auth/src/generated
RUN rm -rf ./libs/db-monolithic/src/generated
RUN rm -rf ./libs/db-order/src/generated
RUN yarn install
RUN yarn build:product-srv
CMD ["node", "dist/apps/api-microservices/product-srv/main.js"]

FROM base as development
ENV NODE_ENV=development
CMD ["yarn", "serve", "api-microservices-product-srv"]
