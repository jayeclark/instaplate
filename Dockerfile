FROM node:14

# Set working directory
WORKDIR /app

# Installing dependencies
COPY package.json /app
RUN npm install

# Copying source files
COPY . /app

# Building app 
RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "run" "dev"