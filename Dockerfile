FROM node:20-alpine3.16 AS build

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY vendor vendor
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine3.16 AS deploy

WORKDIR /app

RUN chown node:node ./
USER node
COPY --from=build /app/package-lock.json .
COPY --from=build /app/package.json .
COPY --from=build /app/build .
COPY --from=build /app/vendor vendor

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN npm ci --omit dev

EXPOSE 3000
CMD ["node", "index.js"]
