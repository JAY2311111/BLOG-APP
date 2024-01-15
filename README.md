# Blog Web App

## Overview

The Blog Web App is a full-stack application designed to allow users to create, edit, and view blog posts. The backend is built with Express.js, MongoDB, and JWT for authentication. The frontend is developed using Next.js.

## Backend

### User Authentication

#### Routes

- `/signup`: Allows users to create an account. Checks for duplicate email addresses to ensure uniqueness.
- `/signin`: Validates user credentials, hashes the password for comparison, and issues a JWT token upon successful authentication.

#### Security Measures

- Passwords are hashed and stored with a unique salt key in the user schema.
- JWT tokens are used for user authentication after successful login.
- Middleware ensures that routes are protected, requiring a valid JWT token for access.

### Blog Management

#### Routes

- `/blogs/all`: Retrieves all blog posts.
- `/blogs/:id`: Retrieves a specific blog post by ID.
- `/blogs/:id`: Retrieves all blog posts created by the logged-in user.
- `/blogs/create-blog`: Creates a new blog post.
- `/blogs/update/:id`: Allows editing of a blog post.
- `/blogs/delete/:id`: Deletes a specific blog post.

#### Security Measures

- User authentication middleware ensures that only authenticated users can access certain routes.
- CORS is implemented to restrict access to certain routes based on the origin.

### File Handling

#### Multer

- Used for handling file uploads, such as images associated with blog posts.

## Frontend

### User Interface

#### Login Page

- Encrypts the login token using crypto and stores it in local storage upon successful login.

#### Register Page

- Allows users to create an account with a unique email address.

#### Main Page

- Utilizes a Higher Order Component (HOC) `requireAuth` to check if a valid token is present in local storage. If not, redirects the user to the login page.

#### Blog Management

- Users can create new blog posts, view all blog posts, and edit/delete their own posts.
- Separate section for "My Posts" to display posts created by the logged-in user.

#### Logout

- Clears the local storage upon logout and redirects the user to the login page.

### Additional Features

- Users cannot edit or delete blog posts created by other users.
- Error handling for unauthorized access to routes.

### Project Structure

The project is structured into backend and frontend folders. The backend has distinct folders for routes, models, middleware, and file handling. The frontend is organized into pages, components, and utility functions.

## Instructions for Running the Project

1. Clone the repository.
2. Navigate to the backend folder and run `npm install` to install backend dependencies.
3. Run `npm start` to start the backend server.
4. Navigate to the frontend folder and run `npm install` to install frontend dependencies.
5. Run `npm run dev` to start the frontend development server.

## Conclusion

The Blog Web App provides a secure and user-friendly platform for managing and viewing blog posts. The separation of frontend and backend functionality allows for easy maintenance and future enhancements.
