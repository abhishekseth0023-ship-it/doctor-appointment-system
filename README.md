# Doctor Appointment System

This is a full-stack web application that allows users to register, log in, and book doctor appointments.
The project focuses on authentication, authorization, and a real-world application flow similar to systems used in hospitals or clinics.

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

All user actions are protected so that a user can access **only their own data**.

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
- Passwords hashed using **bcrypt**  
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

## Application Flow

1. User registers or logs in  
2. After successful login, a JWT token is generated and stored in a cookie  
3. User is redirected to the dashboard  
4. User can book a doctor appointment  
5. User can view and cancel their own appointments  
6. User logs out, which clears the authentication cookie  

---

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
