FROM docker.io/node:lts-alpine AS install-all-dependencies

ARG GH_NPM_TOKEN

RUN apk update && apk upgrade openssl

RUN mkdir -p /app

WORKDIR /app

COPY package.json ./

RUN npm config set //npm.pkg.github.com/:_authToken=$GH_NPM_TOKEN
RUN npm config set @marinetesio:registry https://npm.pkg.github.com/

RUN npm install

FROM docker.io/node:lts-alpine AS builder

RUN mkdir -p /app

WORKDIR /app

COPY --from=install-all-dependencies /app/node_modules ./node_modules
COPY --from=install-all-dependencies /app/package.json ./package.json
COPY --from=install-all-dependencies /app/package-lock.json ./package-lock.json

COPY src src
COPY tsconfig.json esbuild.config.js ./

RUN npm run build

FROM docker.io/node:lts-alpine AS install-prod-dependencies

ARG GH_NPM_TOKEN

RUN apk update && apk upgrade openssl

RUN mkdir -p /app

WORKDIR /app

COPY package.json ./

RUN npm config set //npm.pkg.github.com/:_authToken=$GH_NPM_TOKEN
RUN npm config set @marinetesio:registry https://npm.pkg.github.com/

RUN npm install --omit=dev

FROM docker.io/node:lts-alpine AS runner

RUN apk add --no-cache dumb-init

RUN mkdir -p /app

WORKDIR /app

ENV NODE_ENV production

COPY --from=install-prod-dependencies /app/node_modules ./node_modules
COPY --from=install-prod-dependencies /app/package.json ./package.json
COPY --from=install-prod-dependencies /app/package-lock.json ./package-lock.json

COPY --from=builder /app/dist ./dist

EXPOSE 5004
EXPOSE 5005
EXPOSE 5006

CMD ["dumb-init", "npm", "run", "start"]