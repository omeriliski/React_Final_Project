FROM node:16-slim
WORKDIR /react_final_project
COPY . .
RUN npm install
RUN npm install -g live-server
RUN npm run build
EXPOSE 8080
CMD live-server build/