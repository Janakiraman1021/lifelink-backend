
# LifeLink Backend

This is the backend service for the LifeLink application. It handles user authentication, scheduling blood donations, managing hospital and donor requests, and facilitating organization workflows.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Environment Setup](#environment-setup)
- [API Endpoints](#api-endpoints)
- [Socket.IO Integration](#socketio-integration)
- [Deployment](#deployment)

## Tech Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: MongoDB ORM
- **Socket.IO**: Real-time communication
- **JWT**: Authentication
- **Render**: Deployment platform

## Features

- **Authentication**: Secure login/signup for donors, hospitals, and organizations.
- **Request Management**: Handles blood requests and assignments.
- **Donation Scheduling**: Allows donors to schedule donation dates.
- **Real-Time Updates**: Uses Socket.IO for real-time notifications.
- **Profile Management**: Handles user profile data.

## Environment Setup

### Prerequisites

1. **Node.js**: Ensure Node.js is installed (v16+).
2. **MongoDB**: Set up a MongoDB database.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Janakiraman1021/lifelink-backend.git
   cd life-link-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file for environment variables:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The server will run at `http://localhost:5000`.

## API Endpoints

### Donor

- **POST /donor/signup**: Register a new donor.
- **POST /donor/login**: Log in a donor.
- **POST /donor/schedule**: Schedule a donation.

### Hospital

- **POST /hospital/signup**: Register a new hospital.
- **POST /hospital/login**: Log in a hospital.
- **POST /hospital/request**: Submit a blood request.

### Organization

- **POST /organization/signup**: Register a new organization.
- **POST /organization/login**: Log in an organization.

### Profile

- **GET /profile**: Get user profile details.

### Requests

- **GET /requests**: Get all requests.
- **POST /requests/:id/assign**: Assign a request to a donor.

### Scheduled Donations

- **POST /scheduled-donations**: Schedule a donation.

## Socket.IO Integration

Socket.IO is used to facilitate real-time notifications and updates between hospitals, organizations, and donors.

### Events

- **Connection**: Establishes a connection with the server.
- **NewRequest**: Sends a notification when a new blood request is created.

## Deployment

This backend can be deployed on platforms like Render, AWS, or Heroku.

### Steps for Render Deployment

1. Push your code to GitHub.
2. Link the GitHub repository to Render.
3. Add environment variables (`MONGO_URI`, `JWT_SECRET`, etc.) in the Render dashboard.
4. Deploy the service.

## Contributors

- **JanakiRaman**: Fullsatck Blockchain Developer



Thank you for using LifeLink! If you encounter any issues or have feature suggestions, feel free to open an issue or contribute to the project.
