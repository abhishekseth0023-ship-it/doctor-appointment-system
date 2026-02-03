# Doctor Appointment System

This is a full-stack web application that allows users to register, log in, and book doctor appointments.  
The project focuses on authentication, authorization, and a real application flow after login, similar to real-world systems used in hospitals or clinics.

---

## Project Overview

The Doctor Appointment System allows a patient to:
- Create an account
- Log in securely
- View available doctors
- Book an appointment
- View their own appointments
- Cancel appointments
- Log out securely

All user actions are protected so that a user can access only their own data.

---

## Features

### Authentication
- User registration
- User login using JWT
- JWT stored in HTTP-only cookies
- Logout functionality

### Appointment Management
- Book doctor appointments
- View only the logged-in user’s appointments
- Cancel appointments
- Appointment status handling

### Security
- Passwords are hashed using bcrypt
- Protected routes using authentication middleware
- Authorization to prevent users from accessing others’ data

---

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- cookie-parser
- dotenv

### Frontend
- HTML
- CSS
- JavaScript (Vanilla)

---

## Folder Structure

Doctor Appointment System/
│
├── server.js
├── app.js
├── .env
│
├── config/
│ └── db.js
│
├── models/
│ ├── User.js
│ └── Appointment.js
│
├── controllers/
│ ├── authController.js
│ └── appointmentController.js
│
├── routes/
│ ├── authRoutes.js
│ └── appointmentRoutes.js
│
├── middleware/
│ └── authMiddleware.js
│
├── public/
│ ├── login.html
│ ├── register.html
│ ├── dashboard.html
│ └── css/
│ └── style.css
│
└── README.md


---

## Application Flow

1. User registers or logs in
2. After successful login, a JWT token is generated and stored in a cookie
3. User is redirected to the dashboard
4. User can book a doctor appointment
5. User can view and cancel their own appointments
6. User logs out, which clears the authentication cookie

---

## Environment Setup

Create a `.env` file in the root directory and add the following:

PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key


---

## How to Run the Project

1. Install dependencies:
   ```bash
   npm install

2. Start the server:
   nodemon server.js

3. http://localhost:3000/login.html
