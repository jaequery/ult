FROM node:18-alpine
RUN apk add --no-cache g++ make py3-pip libc6-compat
RUN npm install -g pnpm
WORKDIR /app
COPY . .
RUN pnpm install
RUN cd /app/apps/server && npx prisma generate && cd /app
RUN pnpm build