FROM node:14 as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:14-alpine

WORKDIR /app

RUN npm install -g http-server

COPY --from=build /app/dist .

EXPOSE 3000

CMD ["http-server", "-p", "3000", "-a", "0.0.0.0"]
