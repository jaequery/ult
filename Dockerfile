# Start with a base node image
FROM node:18-alpine

# Install PNPM
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy the rest of the application
COPY . .
RUN pnpm install

# Command to run on container start
CMD pnpm db:migrate && pnpm build && pnpm prod

# Expose the ports your app uses
EXPOSE 3000 3001
