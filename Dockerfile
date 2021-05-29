#Build Steps
FROM node:alpine as builder

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

RUN npm run build

#Run Steps
FROM nginx
EXPOSE 3000 
COPY --from=builder /app/build /usr/share/nginx/html