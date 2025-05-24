FROM node:24-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run","dev"]

# frontend/Dockerfile
FROM node:24-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["echo", "Frontend build completed"]
