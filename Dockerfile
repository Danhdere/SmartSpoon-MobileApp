# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=22.9.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
# ENV NODE_ENV production
ENV NODE_ENV development


WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
    # npm ci --omit=dev


# Copy the rest of the source files into the image.
COPY . .

# Change ownership of the copied files to the node user.
RUN chown -R node:node /usr/src/app

# Run the application as a non-root user.
USER node

# ENV REACT_NATIVE_PACKAGER_HOSTNAME="exp://192.168.4.36"

# Expose the port that the application listens on.
EXPOSE 8081
# # For Expo development server
# EXPOSE 19000
# # For Expo development tools
# EXPOSE 19001
# # For Metro bundler
# EXPOSE 19002

# Run the application.
CMD npx expo start
