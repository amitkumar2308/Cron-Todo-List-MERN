# Advanced To-Do List Application

## Overview

This Advanced To-Do List Application is a full-featured MERN stack app designed to help users manage their tasks efficiently. It includes user authentication, task management, deadline reminders, and Gmail integration for sending email notifications.

## Features

- **User Authentication**: Secure user registration and login using JWT and bcrypt.
- **Task Management**: Add, update, delete, and manage tasks with ease.
- **Deadline Reminders**: Cron jobs to notify users of upcoming deadlines.
- **Gmail Integration**: Sends task-related notifications and reminders via email.
- **Modern UI**: A user-friendly interface with dark mode and real-time features like a live clock and calendar.

## How It Differs

- **Custom Authentication**: Implements JWT-based authentication for secure user sessions.
- **Task Reminder System**: Integrated cron jobs to keep users on track with task deadlines.
- **Email Notifications**: Seamless Gmail integration for sending automated reminders.
- **Polished UI Design**: Modern, responsive design with Gen Z appeal, including dark mode support and real-time elements like a live clock and calendar.

## Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- npm (Node Package Manager)

### Steps

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/advanced-todo-list.git
    cd advanced-todo-list
    ```

2. **Install Dependencies**

    Navigate to the root directory and install the required npm packages:

    ```bash
    npm install
    ```

3. **Setup Environment Variables**

    Create a `.env` file in the root directory with the following content:

    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    GMAIL_USER=your_gmail_username
    GMAIL_PASS=your_gmail_password
    ```

    Replace placeholders with your actual credentials.

4. **Run the Application**

    Start the server with:

    ```bash
    npm start
    ```

    The application will be accessible at `http://localhost:3000`.

## API Endpoints

- **POST `/register`**: Register a new user.
  - Request Body: `{ "email": "user@example.com", "password": "yourpassword" }`
- **POST `/login`**: Authenticate a user and receive a JWT token.
  - Request Body: `{ "email": "user@example.com", "password": "yourpassword" }`
- **POST `/tasks`**: Create a new task.
  - Request Body: `{ "title": "Task title", "description": "Task description", "deadline": "2024-08-30" }`
- **GET `/tasks`**: Retrieve all tasks for the logged-in user.
- **PUT `/tasks/:id`**: Update an existing task.
  - Request Body: `{ "title": "Updated title", "description": "Updated description", "deadline": "2024-08-31" }`
- **DELETE `/tasks/:id`**: Delete a task.

## Usage

- **Register and Login**: Users can sign up and log in to manage their tasks.
- **Task Management**: After logging in, users can add, edit, and delete tasks.
- **Email Reminders**: Automatically receive email notifications for task deadlines.

## Contributing

Contributions are welcome! Feel free to fork the repository, make changes, and submit pull requests. For major changes, it's best to open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Node.js](https://nodejs.org/) for the runtime environment.
- [Express.js](https://expressjs.com/) for the web framework.
- [Mongoose](https://mongoosejs.com/) for MongoDB object modeling.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) for password hashing.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for authentication.
- [nodemailer](https://nodemailer.com/) for email handling.
