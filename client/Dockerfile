FROM registry.appannie.org/appannie/aa-docker-test/master/aa-node12-base-debug:BUILD-61 as dev
WORKDIR /service/aa-admin-inv
LABEL maintainer="dev-spark@appannie.com"

# Install dependencies
COPY package.json yarn.lock ./
RUN NODE_ENV=development yarn install --pure-lockfile --ignore-optional

# Inject code in the container
COPY . /service/aa-admin-inv


# Install production dependencies
FROM registry.appannie.org/appannie/aa-docker-test/master/aa-node12-base-debug:BUILD-61 as dependencies
WORKDIR /service/aa-admin-inv
COPY package.json yarn.lock .yarnclean ./
RUN yarn install --production --pure-lockfile --ignore-optional


FROM registry.appannie.org/appannie/aa-docker-test/master/aa-node12-base-debug:BUILD-61 as builder
WORKDIR /service/aa-admin-inv
ARG NODE_ENV

COPY --from=dev /service/aa-admin-inv/ ./

# Build the app and the locale files
RUN NODE_OPTIONS=--max_old_space_size=4096 BUNDLE_ANALYZE=both yarn build


FROM registry.appannie.org/appannie/aa-docker-base/master/aa-node12-base:BUILD-105 as production
WORKDIR /service/aa-admin-inv
ENV NODE_OPTIONS=--max-http-header-size=16000 --icu-data-dir=/service/aa-admin-inv/node_modules/full-icu

COPY --from=builder /service/aa-admin-inv/.next ./.next
COPY --from=builder /service/aa-admin-inv/static ./static
COPY --from=builder /service/aa-admin-inv/server ./server
COPY --from=builder /service/aa-admin-inv/server.js /service/aa-admin-inv/next.config.js ./
COPY --from=dependencies /service/aa-admin-inv/node_modules/ ./node_modules/

USER appannie
CMD ["node", "/service/aa-admin-inv/server.js"]
