# Build stage
FROM node:14 as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the code
COPY . .

# Build the app
RUN npm run build

# Serve stage
FROM node:14-alpine

WORKDIR /app

# Install a simple http server for serving static content
RUN npm install -g http-server

# Copy the build output from the build stage
COPY --from=build /app/dist .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["http-server", "-p", "3000", "-a", "0.0.0.0"]
