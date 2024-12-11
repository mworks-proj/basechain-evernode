# Stage 1: Build
FROM node:20-slim AS build

# Install necessary packages
RUN apt-get update && apt-get install -y python3 make g++ git curl bash libvips-dev

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy only package files first (to leverage caching)
COPY package.json pnpm-lock.yaml ./

# Install project dependencies
RUN pnpm install --include=optional

# Copy the entire project (rest of the files)
COPY . .

# Build the Next.js app in standalone mode
RUN npx next build

# Stage 2: Production
FROM node:20-slim

# Install runtime dependencies
RUN apt-get update && apt-get install -y curl bash

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy the standalone server files and static assets from the build stage
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

# Mount Docker secrets
RUN mkdir /run/secrets

# IMPORTANT: Make sure environment variables point to the secret file paths
ENV NEXT_PUBLIC_COINBASE_COMMERCE_API_KEY_FILE=/run/secrets/coinbase_api_key
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS_ID_FILE=/run/secrets/google_analytics_id
ENV NEXT_PUBLIC_ONCHAINKIT_API_KEY_FILE=/run/secrets/onchainkit_api_key
ENV NEXT_PUBLIC_ENVIRONMENT_FILE=/run/secrets/environment_url

# Expose the app's port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
