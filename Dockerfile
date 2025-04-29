# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY . .

# Install dependencies
RUN npm install

# Copy rest of the app code
COPY . .

# Expose port (your app runs on 3000 usually)
EXPOSE 5000

# Command to run app
CMD ["node", "server.js"]
