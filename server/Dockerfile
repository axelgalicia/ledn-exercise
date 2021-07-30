
## Build
FROM node:14.17.3 AS appbuild1
WORKDIR /opt
COPY package.json ./
COPY tsconfig.json ./
COPY process.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run build

## Second Stage & run
FROM node:14.17.3
WORKDIR /opt
COPY package.json ./
COPY process.json ./
RUN npm install --only=production
COPY --from=appbuild1 /opt/dist .
RUN npm install pm2 -g
EXPOSE 3000