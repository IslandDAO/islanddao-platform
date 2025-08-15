################################################################################
# BASE
# This is the stage that the other stages in this file are based on.
# - defines the Node version
# - set global configuration
# - set default work dir
################################################################################
FROM node:24.5.0-alpine AS base

RUN apk add --update --no-cache git python3 make g++ openssl

RUN npm install -g pnpm

ENV HUSKY=0

# Create app directory
WORKDIR /workspace

# Copy package.json and the lock file
COPY package.json pnpm-lock.yaml /workspace/

# Install app dependencies
RUN pnpm install --frozen-lockfile --prefer-frozen-lockfile

# Copy source files
COPY . .

# Build apps
RUN pnpm build

COPY prisma/schema.prisma /workspace/prisma/schema.prisma

# Expose default port
EXPOSE 3000

# Start server
CMD pnpm prestart; pnpm start
