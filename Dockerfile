#build
FROM node:16 as build
WORKDIR /reactfinalproject
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#serve
FROM fholzer/nginx-brotli:v1.12.2
WORKDIR /etc/nginx
ADD nginx.conf /etc/nginx/nginx.conf

# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /reactfinalproject/build /usr/share/nginx/html
EXPOSE 5000
CMD ["nginx","-g","daemon off;"]