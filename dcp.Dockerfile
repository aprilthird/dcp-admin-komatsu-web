FROM 141708498466.dkr.ecr.us-east-1.amazonaws.com/node:12.16.3 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:dcp

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/dcp /usr/share/nginx/html
