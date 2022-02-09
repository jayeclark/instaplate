FROM node:14

# Set working directory
WORKDIR /client

# Installing dependencies
COPY package.json /usr/src/app
RUN npm install

# Copying source files
COPY . /usr/src/app

# Building app 
RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "run" "dev"