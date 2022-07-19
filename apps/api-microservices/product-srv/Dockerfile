FROM node:16-alpine as base

WORKDIR /app

FROM base as production
ENV NODE_ENV=production
COPY ./dist/apps/api-microservices/product-srv .
CMD ["node", "main.js"]

FROM base as development
ENV NODE_ENV=development
CMD ["yarn", "serve", "api-microservices-product-srv"]
