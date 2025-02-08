Read Me

### FEC 2025 FrontEnd E-Commerce App

This repo is a front-end e-commerce web application built with React and Node.js. The app is containerized with Docker and uses automated testing with Jest, Puppeteer, and CircleCI.

Front page components include:

- Product Detail Information
- Related Items and a user Outfit manager
- Question and Answers
- and Product Reviews


### Installation

Fork and clone the repository

**Manually**

From the command line run “npm install” to install dependencies

Start the development server and client concurrently with “npm run dev”

OR start the app with “npm start”

**With Docker**

[Install Docker](https://www.docker.com/get-started/)

Create a Docker image:

From the command line run “docker build -t fec2025 .

Start the container:

From the command line run “docker run -p 3000:3000 --env API_URL=http://localhost:3000 --env AUTH_SECRET=yourSecretKey fec2025”

Navigate to http://localhost:3000 in your browser


**Testing**

Start testing with “npm test”

Tests will run automatically on each push via [CircleCI](https://circleci.com/). See documentation for more info
