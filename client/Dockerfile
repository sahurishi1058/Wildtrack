# # Use an official Node.js runtime as the base image
# FROM node:14

# # Set the working directory
# WORKDIR /client/src/app

# # Copy the package.json and package-lock.json files
# COPY package*.json ./

# # Install the dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Set the environment variable for the OpenCV version
# ENV OPENCV_VERSION=4.5.4

# # Fetch the specified OpenCV version
# RUN ./fetch-opencv-js.sh

# # Expose port 3000 (Next.js default port)
# EXPOSE 3000

# # Start the application
# CMD ["npm", "run", "dev"]
