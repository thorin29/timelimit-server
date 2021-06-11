#FROM node:14-alpine
FROM node:16-alpine

# Create app directories
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
#COPY . /usr/src/app/
COPY --chown=node:node . /usr/src/app

RUN npm install --no-optional && npm run build && npm prune --production && rm -rf ./src

# Start the App
EXPOSE 8080
USER node
CMD [ "npm", "start" ]
