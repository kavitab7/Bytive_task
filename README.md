# To-Do List Application

## Project Description
This project is a simple To-Do List API that allows users to create, retrieve, update, and delete tasks. The API is secured with JWT-based authentication. It uses Node.js, Express, and MongoDB.

## Features
- **JWT Authentication**: Secure API endpoints with token-based authentication.
- **Task Management**: Create, read, update, and delete tasks.
- **Task Schema**: Task includes a title, description, user, and status (default: "pending").
- **User Schema**: Username , email , password.

## Prerequisites
Before running the project, make sure you have the following installed:
- **Node.js**  - [Download here](https://nodejs.org/)
- **MongoDB** (for MongoDB setup) - [Download here](https://www.mongodb.com/try/download/community)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/kavitab7/Bytive_task.git
```

### 2. Install Dependencies
Navigate to the project directory and install all required dependencies by running:
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root of the project and set the following environment variables:

```
PORT=8080
MONGODB_URL=mongodb://localhost:27017/todolist  # MongoDB connection URL
JWT_SECRET=your_secret_key_here  # JWT secret key
```

### 4. Running the Project
To start the server, run the following command:
```bash
npm start
```

The API should now be running at `http://localhost:8080`.

### 5. Testing the API Using Postman

#### Register a New User
1. **URL:** `POST http://localhost:8080/api/user/register`
2. **Request Body:**
   ```json
   {
     "username": "testuser",
     "email": "testuser@example.com",
     "password": "testpassword"
   }
   ```
3. **Expected Response:**
   ```json
   {
     "success": true,
     "message": "User registered successfully"
   }
   ```

#### Login to Get JWT Token
1. **URL:** `POST http://localhost:8080/api/user/login`
2. **Request Body:**
   ```json
   {
     "email": "testuser@example.com",
     "password": "testpassword"
   }
   ```
3. **Expected Response:**
   ```json
   {
     "success": true,
     "message": "Login successful",
     "token": "your_jwt_token_here"
   }
   ```

#### Set Authorization Header in Postman
1. Copy the `token` from the login response.
2. In Postman, go to the **Headers** tab.
3. Add a new header:
   - **Key**: `Authorization`
   - **Value**: `your_jwt_token_here`
   
Now you are ready to test the task routes.

#### Test Task Routes with Postman

##### 1. Create a New Task
1. **URL:** `POST http://localhost:8080/api/tasks/tasks`
2. **Request Body:**
   ```json
   {
     "title": "New Task",
     "description": "Task description",
     "status": "pending"  // Optional, default is "pending"
   }
   ```
3. **Expected Response:**
   ```json
   {
     "success": true,
     "message": "Task created successfully",
     "task": {
       "title": "New Task",
       "description": "Task description",
       "status": "pending",
       "user": "testuser_id",
       "createdAt": "2024-12-15T00:00:00Z",
       "updatedAt": "2024-12-15T00:00:00Z"
     }
   }
   ```

##### 2. Get All Tasks
1. **URL:** `GET http://localhost:8080/api/tasks/tasks`
2. **Expected Response:**
   ```json
   {
     "success": true,
     "tasks": [
       {
         "title": "New Task",
         "description": "Task description",
         "status": "pending",
         "user": "testuser_id",
         "createdAt": "2024-12-15T00:00:00Z",
         "updatedAt": "2024-12-15T00:00:00Z"
       }
     ]
   }
   ```

##### 3. Get a Task by ID
1. **URL:** `GET http://localhost:8080/api/tasks/tasks/:id`  (replace `:id` with the actual task ID)
2. **Expected Response:**
   ```json
   {
     "success": true,
     "task": {
       "title": "New Task",
       "description": "Task description",
       "status": "pending",
       "user": "testuser_id",
       "createdAt": "2024-12-15T00:00:00Z",
       "updatedAt": "2024-12-15T00:00:00Z"
     }
   }
   ```

##### 4. Update Task Status
1. **URL:** `PUT http://localhost:8080/api/tasks/tasks/:id` (replace `:id` with the actual task ID)
2. **Request Body:**
   ```json
   {
     "status": "in-progress"
   }
   ```
3. **Expected Response:**
   ```json
   {
     "success": true,
     "message": "Task status updated successfully",
     "task": {
       "title": "New Task",
       "description": "Task description",
       "status": "in-progress",
       "user": "testuser_id",
       "createdAt": "2024-12-15T00:00:00Z",
       "updatedAt": "2024-12-15T01:00:00Z"
     }
   }
   ```

##### 5. Delete a Task
1. **URL:** `DELETE http://localhost:8080/api/tasks/tasks/:id` (replace `:id` with the actual task ID)
2. **Expected Response:**
   ```json
   {
     "success": true,
     "message": "Task deleted successfully"
   }
   ```

---

## Version Control
The project is tracked using **Git**. You can view the repository on **GitHub** using the link below:

- GitHub Repository: [Link of GitHub repository](https://github.com/kavitab7/Bytive_task)

---
