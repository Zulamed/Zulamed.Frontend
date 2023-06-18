FROM node:20-alpine3.18 as install
WORKDIR /app
COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN npm install -g pnpm
RUN pnpm install


FROM install as build
WORKDIR /app
COPY . .
RUN pnpm build

ENV BACKEND_URL=$BACKEND_URL;

FROM build as start
WORKDIR /app
EXPOSE 3000
CMD ["node", "build"]

