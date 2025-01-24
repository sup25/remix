# Base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install required dependencies for Prisma (Linux Alpine fixes)
RUN apk add --no-cache openssl

# Copy package files
COPY package*.json package-lock.json  ./

# Install dependencies
RUN npm install

# Copy Prisma files and generate the Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Copy app code
COPY . .

# Set environment variable for build memory limits
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV DATABASE_URL="postgresql://neondb_owner:WnFd40eGwxDz@ep-billowing-haze-a8329nf6.eastus2.azure.neon.tech/neondb?sslmode=require"

# Build the Remix app
RUN npm run build

# Expose the port your Remix app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
