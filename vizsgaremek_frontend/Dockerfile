# Use the latest LTS version of Node.js
FROM node:lts-alpine
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of your application feiles
COPY . .
 
# Expose the port your app runs on
EXPOSE 1234
 
# Define the command to run your app
CMD ["npm", "start"]