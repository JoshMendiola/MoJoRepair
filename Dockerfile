FROM node:14 as build
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Create necessary directories
RUN mkdir -p src/images public

# Copy source files
COPY public ./public
COPY src ./src
COPY webpack.config.prod.js tsconfig.json ./

# Build
RUN npm run build

FROM node:14-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist .
EXPOSE 3000
CMD ["serve", "-s", ".", "-p", "3000"]