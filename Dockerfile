FROM node:alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:alpine

RUN npm install -g serve

WORKDIR /app

COPY --from=build /app/dist .

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]
