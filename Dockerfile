FROM node:14-alpine

# Create app directories
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json tsconfig.json tslint.json Readme.md /usr/src/app/
COPY src/ /usr/src/app/src/
COPY scripts/ /usr/src/app/scripts/
COPY other/ /usr/src/app/other/
RUN mkdir -p docs/schema && npm install --no-optional && npm run build && npm prune --production && rm -rf ./src

# Start the App
EXPOSE 8080
CMD [ "npm", "start" ]
