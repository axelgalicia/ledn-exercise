# Stage 1 building process
FROM node:14.17-alpine3.14 AS appbuild
WORKDIR /opt
ENV PATH /opt/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
RUN npm install react-scripts@4.0.3 -g --silent
COPY . ./
RUN npm run build

# Stage 2 - Running
FROM nginx:stable-alpine
COPY --from=appbuild /opt/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]