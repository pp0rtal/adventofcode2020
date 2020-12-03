FROM node:14.15.0 AS base
WORKDIR /app

# ---- Dependencies ----
FROM base AS dependencies
ARG BUILD_ENV=production

COPY package*.json ./
RUN npm install --production

# ---- Copy Files/Build ----
FROM dependencies AS build
WORKDIR /app

COPY tsconfig.json tsconfig.prod.json ./
COPY src /app/src
COPY package.json /app
RUN npm run build

# --- Release with Slim ----
FROM node:14.15.0-slim AS release
WORKDIR /app
COPY --from=build /app/dist dist
COPY --from=dependencies /app/node_modules node_modules
COPY --from=dependencies /app/package.json package.json
