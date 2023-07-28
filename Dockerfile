FROM node:18.12.1-alpine as build

RUN apk add --no-cache --virtual .gyp python3 make g++

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Install app dependencies
RUN npm install 

# Bundle app source
COPY --chown=node:node . ./

ARG VITE_API_URL
ENV VITE_API_URL $VITE_API_URL

# Run the build command which creates the production bundle
RUN npm run build

# Package stage
FROM node:18.12.1-alpine As production

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD ["npx", "serve", "-s", "./dist", "-p", "3000"]
