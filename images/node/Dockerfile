FROM node:18-slim

# pubsub need ps to SIGKILL
RUN apt-get update && apt install -fy procps \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN chown -R node:node /mnt

USER node

RUN mkdir -p /mnt/node_modules
