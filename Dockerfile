FROM node:20-alpine3.16 AS build

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine3.16 AS deploy

WORKDIR /app
COPY --from=build /app/package-lock.json .
COPY --from=build /app/package.json .
COPY --from=build /app/build .

RUN npm ci --omit dev

EXPOSE 3000
CMD ["node", "index.js"]
