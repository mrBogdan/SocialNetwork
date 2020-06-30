#
# Builder stage
# This stage compile our TS code into JS
#
FROM registry.gitlab.com/bachelors-2020/pik-16/babitskyi/base-nodejs-builder-image:12.16.1-slim as builder

WORKDIR /usr/src/app

COPY . .

RUN npm ci && npm run build && npm prune --production=true

#
# Production stage
# Copy JS code from builder stage
# Install production only deps
#
FROM node:12.16.1-slim as runner

WORKDIR /app

ENV NODE_ENV=production

COPY ./config ./config

COPY ./.env ./.env

COPY --from=builder /usr/src/app/node_modules ./node_modules

COPY --from=builder /usr/src/app/dist ./dist

COPY --from=builder /usr/src/app/package.json ./

EXPOSE 2000

CMD ["node", "/app/dist/index.js"]
