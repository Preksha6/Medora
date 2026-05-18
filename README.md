# Medora — AI Powered Healthcare Platform

## Overview

Medora is a full-stack AI-powered healthcare web application built using the MERN stack. The platform allows patients to securely register, analyze symptoms using AI, receive specialist recommendations, explore recommended doctors, and maintain a persistent medical analysis history.

The system uses Groq AI for intelligent symptom analysis and MongoDB for storing patient records and medical history. The project focuses on creating a modern healthcare workflow with scalable architecture and real-world dashboard experience.

---

# Features

## Authentication

* JWT-based authentication
* Secure patient registration and login
* Protected dashboard routes
* Persistent authentication using local storage

---

## AI Symptom Analyzer

Patients can:

* Enter symptoms
* Receive AI-generated disease analysis
* Get severity prediction
* View precautions
* Receive specialist recommendations

Powered by:

* Groq API
* Llama 3.3 70B Versatile

---

## Doctor Recommendation System

The system recommends:

* Specialist doctors
* Nearby hospitals/medical centers
* Real healthcare locations using OpenStreetMap APIs

---

## Medical History Management

Patients can:

* View previous symptom analyses
* Expand/collapse history cards
* Delete individual history entries
* Clear complete analysis history

---

## Patient Dashboard

Modern healthcare dashboard with:

* AI analysis cards
* Medical history
* Profile section
* Settings management
* Responsive sidebar layout

---

# Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Zustand
* Axios
* Lucide React

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js

---

## AI Integration

* Groq API
* Llama-3.3-70B-Versatile

---

# Folder Structure

```bash
hospital/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── App.jsx
│   │
│   └── vite.config.js
```

---

# Environment Variables

## Backend `.env`

```env
PORT=3001

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key
```

---

# Installation

## Clone Repository

```bash
git clone <your_repo_url>
```

---

# Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# API Endpoints

## Auth Routes

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register patient    |
| POST   | `/api/auth/login`    | Login patient       |
| GET    | `/api/auth/profile`  | Get patient profile |

---

## Chat Routes

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| POST   | `/api/chat`         | Analyze symptoms  |
| GET    | `/api/chat/history` | Fetch history     |
| DELETE | `/api/chat/:id`     | Delete analysis   |
| DELETE | `/api/chat`         | Clear all history |

---

# AI Workflow

```text
Patient Symptoms
       ↓
Groq AI Analysis
       ↓
Disease Detection
       ↓
Severity Prediction
       ↓
Specialist Recommendation
       ↓
Doctor Suggestions
       ↓
History Storage
```

---

# Screens Included

* Landing Page
* Login/Register
* AI Symptom Checker
* Analysis History
* Recommended Doctors
* Patient Profile
* Settings Page

---

# Future Improvements

* Appointment booking
* Video consultation
* Prescription management
* Doctor dashboard
* Real-time chat
* Medical report upload
* Notification system
* Dark/light theme toggle
* Geolocation-based hospitals

---

# Security Features

* JWT authentication
* Password hashing with bcrypt
* Protected API routes
* Secure patient data handling

---

# Learning Outcomes

This project demonstrates:

* Full-stack MERN development
* AI integration in healthcare
* REST API architecture
* Authentication workflows
* State management with Zustand
* Responsive dashboard UI
* MongoDB schema design
* Healthcare workflow implementation

---

# Author

Developed by Preksha Maheshwari

---

## License

This project is licensed under the MIT License.