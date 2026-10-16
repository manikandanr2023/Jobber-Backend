# syntax=docker/dockerfile:1

FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .npmrc ./

RUN --mount=type=secret,id=jobber_npm_token \
    JOBBER_NPM_TOKEN="$(cat /run/secrets/jobber_npm_token)" npm ci

COPY src ./src

RUN npm run build


FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache curl

COPY package*.json ./
COPY .npmrc ./

RUN npm install -g pm2 npm@latest

RUN --mount=type=secret,id=jobber_npm_token \
    JOBBER_NPM_TOKEN="$(cat /run/secrets/jobber_npm_token)" npm ci --omit=dev

COPY --from=builder /app/build ./build

EXPOSE 4004

CMD ["npm", "run", "start"]
