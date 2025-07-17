# Stage 1: Compile and Build angular codebase
# Use official Node.js image as the base image
FROM node:latest AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:latest

# Copy the built Angular app to the Nginx server's public directory
COPY --from=build /app/dist/expense-tracker /usr/share/nginx/html

# Expose port 80 to make the app accessible via HTTP
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
