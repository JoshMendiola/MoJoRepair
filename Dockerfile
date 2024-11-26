FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist .
EXPOSE 3000
CMD ["serve", "-s", ".", "-p", "3000"]