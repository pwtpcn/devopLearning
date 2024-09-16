FROM node:21-bullseye-slim
WORKDIR /myapp
ADD . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]