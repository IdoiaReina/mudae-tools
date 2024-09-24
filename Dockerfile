# Build app --------------------------------------------------------------------
FROM node:20-slim AS build

RUN mkdir /src
ADD package.json /src/package.json
ADD yarn.lock /src/yarn.lock
WORKDIR /src

ARG REACT_APP_TEAMVIEWER_CLIENT_ID
ARG REACT_APP_TEAMVIEWER_CLIENT_SECRET
ARG REACT_APP_TINY_MCE_KEY

ENV REACT_APP_TEAMVIEWER_CLIENT_ID=${REACT_APP_TEAMVIEWER_CLIENT_ID}
ENV REACT_APP_TEAMVIEWER_CLIENT_SECRET=${REACT_APP_TEAMVIEWER_CLIENT_SECRET}
ENV REACT_APP_TINY_MCE_KEY=${REACT_APP_TINY_MCE_KEY}

ENV NODE_ENV="production"
RUN yarn install --frozen-lockfile
COPY . /src
ADD APP_CONFIG /src/public/app.config.json
RUN yarn api:codegen
ENV NODE_OPTIONS --max_old_space_size=4096
RUN yarn build
RUN cp public/app.config.json build/app.config.json

# Serve app --------------------------------------------------------------------
FROM node:20-slim AS final

ARG FRONTEND_PORT
ENV FRONTEND_PORT ${FRONTEND_PORT}
EXPOSE $FRONTEND_PORT

RUN npm install -g serve
COPY --from=build /src/build .

CMD serve -l ${FRONTEND_PORT} -s .
