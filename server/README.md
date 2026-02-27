# MyContacts Backend

MyContacts Backend is a REST API built with Node.js and Express.  
It handles user authentication and contact management using MongoDB as a database.

---

## Features

- User registration and login with JWT authentication
- Passwords encrypted using bcrypt
- CRUD operations for contacts (create, read, update, delete)
- Connected to MongoDB Atlas cluster
- Simple RESTful API structure

---

## Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- Bcrypt
- JSON Web Token (JWT)
- dotenv (for environment variables)
- Swagger (https://my-contacts-app-api.onrender.comapi-docs/)

---

## Environment Variables

Create a `.env` file in the `server` folder with the following values:

```
PORT=5050
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
```

---

## Testing

The server tests use an in-memory MongoDB instance, so they do not touch your
real database.

Run tests from the `server` folder:

```
npm install
npm test
```

---
