# Smart Leads CRM

A full-stack MERN-based Lead Management CRM built with role-based authentication, lead tracking, filtering, pagination, and CSV export.

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
- Status Tracking:
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
- Backend pagination using:
  - skip()
  - limit()
- Frontend page navigation
- Page metadata support

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

---

## Folder Structure

```bash
smart-leads-dashboard/

├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.ts
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│
└── docker-compose.yml
```

---

## Environment Variables

Create:

```bash
backend/.env
```

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## Installation

### Clone repository

```bash
git clone (https://github.com/kapadiyavaibhav/smart-leads-dashboard)
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

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Run with Docker

```bash
docker compose up --build
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /auth/register | Register user |
| POST | /auth/login | Login user |

### Leads

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /leads | Get leads |
| POST | /leads | Create lead |
| GET | /leads/:id | Get single lead |
| PUT | /leads/:id | Update lead |
| DELETE | /leads/:id | Delete lead |
| GET | /leads/export/csv | Export CSV |

---

## Roles

### Admin
- View Leads
- Create Leads
- Edit Leads
- Delete Leads

### Sales User
- View Leads
- Create Leads
- Edit Leads

---

## Future Improvements

- Dark Mode
- Analytics Dashboard
- Charts & Insights
- Email Notifications

---

## Author

Vaibhav Kapadiya
