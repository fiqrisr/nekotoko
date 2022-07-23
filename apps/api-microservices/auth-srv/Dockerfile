FROM bitnami/node:16 as base

WORKDIR /app

FROM base as production
ENV NODE_ENV=production
RUN corepack enable
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN rm -rf ./libs/db-product/src/generated
RUN rm -rf ./libs/db-order/src/generated
RUN yarn build:auth-srv
CMD ["node", "dist/apps/api-microservices/auth-srv/main.js"]

FROM base as development
ENV NODE_ENV=development
CMD ["yarn", "serve", "api-microservices-auth-srv"]
