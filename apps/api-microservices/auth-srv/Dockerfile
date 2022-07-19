FROM bitnami/node:16 as base

WORKDIR /app

FROM base as production
ENV NODE_ENV=production
COPY ./dist/apps/api-microservices/auth-srv .
CMD ["node", "main.js"]

FROM base as development
ENV NODE_ENV=development
CMD ["yarn", "serve", "api-microservices-auth-srv"]
