
## Build
FROM node:14.17-alpine3.14 AS appbuild
WORKDIR /opt
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run build
RUN rm -rf ./src

## Second Stage & run
FROM node:14.17-alpine3.14
WORKDIR /opt
COPY package.json ./
COPY process.json ./
RUN npm install --only=production
COPY --from=appbuild /opt/dist ./dist
RUN npm install pm2 -g
EXPOSE 3000