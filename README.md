# Smart Leads CRM

A full-stack MERN-based Lead Management CRM built with role-based authentication, lead tracking, filtering, pagination, and CSV export.

---

## Live Demo

Frontend:  
https://smart-leads-dashboard-2-9hu8.onrender.com

Backend API:  
https://smart-leads-dashboard-1-3aqs.onrender.com

GitHub Repository:  
https://github.com/kapadiyavaibhav/smart-leads-dashboard

---

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-based Access Control (Admin / Sales User)

### Lead Management
- Add Lead
- View Lead
- Update Lead
- Delete Lead
- Lead Details Modal
- Lead Status Tracking:
  - New
  - Contacted
  - Qualified
  - Lost

### Search & Filters
- Search by Name
- Search by Email
- Status Filter
- Source Filter
- Latest / Oldest Sorting
- Debounced Search

### Pagination
- Backend Pagination using:
  - skip()
  - limit()
- Frontend Page Navigation
- Page Metadata Support

### Additional Features
- CSV Export
- Loading States
- Empty States
- Centralized Error Handling
- Responsive SaaS-style UI
- Docker Support

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt

### DevOps
- Docker
- Docker Compose
- Render Deployment

---

## Folder Structure

```bash
smart-leads-dashboard/

├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.ts
│   │
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│   │
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── README.md
├── API_DOCUMENTATION.md
└── .env.example
```

---

## Environment Variables

### Backend (.env)

Create:

```bash
backend/.env
```

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Frontend (.env)

Create:

```bash
frontend/.env
```

Add:

```env
VITE_API_URL=https://smart-leads-dashboard-1-3aqs.onrender.com/api
```

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/kapadiyavaibhav/smart-leads-dashboard
```

```bash
cd smart-leads-dashboard
```

---

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## Run using Docker

```bash
docker compose up --build
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |

---

### Leads

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /api/leads | Get Leads |
| POST | /api/leads | Create Lead |
| GET | /api/leads/:id | Get Single Lead |
| PUT | /api/leads/:id | Update Lead |
| DELETE | /api/leads/:id | Delete Lead |
| GET | /api/leads/export/csv | Export CSV |

---

### Dashboard

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /api/dashboard | Dashboard Statistics |

---

## Roles & Permissions

### Admin

Can:

- View Leads
- Create Leads
- Update Leads
- Delete Leads

### Sales User

Can:

- View Leads
- Create Leads
- Update Leads

---

## Assignment Notes

This project was developed as part of a Full Stack Internship assignment and demonstrates:

- Authentication & Authorization
- Backend API Development
- Database Integration
- CRUD Operations
- State Management
- Lead Tracking System
- Docker Containerization
- Deployment using Render

---

## Future Improvements

- Dark Mode
- Analytics Dashboard
- Charts & Insights
- Email Notifications
- Activity Logs
- Lead Assignment System

---

## Author

**Vaibhav Kapadiya**

GitHub:  
https://github.com/kapadiyavaibhav
