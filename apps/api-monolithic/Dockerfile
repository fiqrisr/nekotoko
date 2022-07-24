FROM bitnami/node:16 as base

WORKDIR /app

FROM base as production
ENV NODE_ENV=production
RUN corepack enable
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn install
RUN yarn build:monolithic
CMD ["node", "dist/apps/api-monolithic/main.js"]

FROM base as development
ENV NODE_ENV=development
CMD ["yarn", "serve", "api-monolithic"]
