#
# ---- Test ----
# run linters, setup and tests
FROM lazerweb4:base AS test
#RUN  npm run lint && npm run setup && npm run test
RUN  npm run test

#
# ---- Release ----
FROM laserweb4:base AS release
WORKDIR /usr/src/app
CMD [ "npm", "run", "start-server" ]

#
# ---- Dev ----
FROM laserweb4:base AS dev
WORKDIR /usr/src/app
COPY . .
COPY --from=laserweb4:base /usr/src/app/node_modules node_modules
CMD ["npm", "run", "start-app"]

#
# ---- Dev Local----
FROM laserweb4:base AS devLocal
WORKDIR /usr/src/app
COPY --from=laserweb4:base /usr/src/app/node_modules node_modules
COPY webpack.config.js ./
COPY .babelrc ./
COPY dist/ ./dist/
CMD ["npm", "run", "dev"]
