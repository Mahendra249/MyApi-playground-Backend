My-api playground Project

## 1. Architecture

This project follows a MERN stack architecture:

Frontend (React) <--> Backend (Node.js/Express) <--> Database (MongoDB)

**Description:**

- **Frontend:** React.js for dynamic user interfaces and seamless user experience.
- **Backend:** Node.js with Express.js handles API requests, CRUD operations, and business logic.
- **Database:** MongoDB stores profiles, projects, skills, and work experiences.

---

## 2. Setup

### Local Setup

3. Database Schema
Profile Collection
{
  "name": "string",
  "email": "string",
  "education": "string",
  "skills": ["string"],
  "projects": [
    {
      "title": "string",
      "description": "string"
    }
  ],
  "work": ["string"]
}
```
Project Collection

{
  "title": "string",
  "description": "string",
  "link": ["string"],
}

4. Sample Requests
Health Check

 GET http://localhost:5000/api/health

You can view my resume here: https://drive.google.com/file/d/1NZ5KYHbf8VNUDhVz-WPaTszT2XPqqceB/view