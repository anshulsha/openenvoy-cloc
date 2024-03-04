# Use the Node.js Alpine variant as the base image
FROM --platform=$TARGETPLATFORM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Create build
RUN npm run build:prod

# Expose port
EXPOSE 3000

# ENTRYPOINT to start the application
ENTRYPOINT ["sh", "-c", "node dist/main"]
