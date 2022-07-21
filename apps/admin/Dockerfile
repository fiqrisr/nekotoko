FROM node:16-alpine as base

WORKDIR /app

FROM base as development
ENV NODE_ENV=development
CMD ["yarn", "serve", "admin"]
