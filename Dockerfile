FROM node:21-bullseye-slim
WORKDIR /myapp
ADD . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]