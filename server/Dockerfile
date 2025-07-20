FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for Docker caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the rest of the code
COPY . .

# Expose backend port
EXPOSE 5000

# Run the server
CMD ["node", "src/index.js"]
