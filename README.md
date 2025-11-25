# Task Tracking Application

A full-stack MERN application for tracking tasks with features like creating, assigning, updating, and deleting tasks.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Redux Toolkit, TypeScript
- **Backend:** Node.js, Express, MongoDB, TypeScript
- **Database:** MongoDB

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally

### Installation

1.  **Clone the repository** (if applicable)

2.  **Install Dependencies**

    ```bash
    # Server
    cd server
    npm install

    # Client
    cd ../client
    npm install
    ```

3.  **Environment Variables**
    - The server uses a default MongoDB URI: `mongodb://localhost:27017/tasktracker`.
    - You can create a `.env` file in `server/` to override `MONGO_URI` and `PORT`.

### Running the Application

1.  **Start the Backend Server**
    ```bash
    cd server
    npm run dev
    ```
    Server runs on `http://localhost:5000`.

2.  **Start the Frontend Client**
    ```bash
    cd client
    npm run dev
    ```
    Client runs on `http://localhost:5173` (or the next available port).

## API Endpoints

- `GET /api/tasks`: Get all tasks (supports `?assigneeId=...` and `?status=...` filters)
- `POST /api/tasks`: Create a new task
- `GET /api/tasks/:id`: Get a specific task
- `PATCH /api/tasks/:id`: Update a task
- `DELETE /api/tasks/:id`: Delete a task

## Features
- View all tasks, filter by "Assigned to me" or "Completed".
- Add new tasks with title, description, assignee, and due date.
- Update task status (Todo, In Progress, Done).
- Delete tasks.
