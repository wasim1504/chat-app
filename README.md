# Real Time Chat Application

## Description

Welcome to Real Time Chat Application! This application provides a platform for real-time communication through chat. Users can join chat rooms, send messages, and interact with other users in real-time.

## Technologies Used

- Node.js
- Express.js
- WebSocket
- PostgreSQL
- Redis
- JWT (JSON Web Tokens)
- bcrypt
- Jest
- Supertest
- kafka
- Jmeter
- wscat

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)


## Features

- **Real-time Chat:** Users can engage in real-time conversations with other users.
- **Chat Rooms:** Multiple chat rooms are available for users to join based on their interests.
- **User Authentication:** Secure user authentication using JWT tokens and bcrypt for password hashing.
- **Database Integration:** Utilizes PostgreSQL for storing user data and Redis for caching.
- **WebSockets:** WebSocket protocol for real-time communication between clients and server.
- **Unit Testing:** Jest framework is used for unit testing with full test coverage.
- **Integration Testing:** Supertest library is used for testing API endpoints.
- **User-Friendly Interface:** Offers an intuitive interface for seamless chatting experience.

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your computer.
- PostgreSQL and Redis installed locally or remotely.

Follow these steps to run the Real Time Chat App locally:

1. **Unzip the Real Time Chat Application:**

2. **Navigate to the project directory:**

   ```bash
   cd chat_application
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

   ```

   ```

4. **Run:**

- `Start Project`
  ```bash
     node app.js
  ```
- `For Chat`
  open console 1 and 2

  ```bash
     wscat -c ws://localhost:8080

  ```

- `Test Project`

  ```bash
     npm test
  ```

- `Test Coverage`
  ```bash
     npm run coverage
  ```

## Usage

- **User Registration:** Users can register for an account using their email address and password.
- **User Login:** Registered users can log in to their accounts securely.
- **Join Chat Rooms:** Users can join existing chat rooms to participate in conversations.
- **Send Messages:** Users can send messages in chat rooms, and the messages will be displayed in real-time to other users in the same chat room.
- **Create Chat Rooms:** Admin users can create new chat rooms and manage them.



### Authentication

- **POST /api/auth/register:** Register a new user.
- **POST /api/auth/login:** Log in an existing user.


## Code Structure

The project follows a structured directory layout for better organization:

- **config/**
- **coverage/**
- **src**
- **Jmeter Testing**
- **test**
- **app.js**
- **README.md**

