FROM node:20-alpine

# Temporary build tools — only installed when GitHub Actions asks for them
ARG NEED_BUILD_TOOLS=0
RUN if [ "$NEED_BUILD_TOOLS" = "1" ]; then apk add --no-cache python3 make g++; fi

# Create app directories
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json tsconfig.json .eslintignore .eslintrc.js Readme.md /usr/src/app/
COPY src/ /usr/src/app/src/
COPY scripts/ /usr/src/app/scripts/
COPY other/ /usr/src/app/other/
RUN mkdir -p docs/schema && npm install --exclude=optional && npm run build && npm prune --omit=dev && rm -rf ./src

# Start the App
EXPOSE 8080
CMD [ "npm", "start" ]
