FROM node:20-alpine3.18 as install
WORKDIR /app
COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN npm install -g pnpm
RUN pnpm install


FROM install as build
WORKDIR /app
ENV NODE_ENV=production
ARG BACKEND_URL
ENV PUBLIC_BACKEND_URL=$BACKEND_URL
COPY . .
RUN pnpm build

# FROM build as start
FROM node:20-alpine3.18 as start
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/build build/
COPY --from=build /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV BODY_SIZE_LIMIT=20000000
CMD node -r dotenv/config build

