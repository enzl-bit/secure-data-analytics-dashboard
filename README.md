# Data Dashboard Auth

A secure fullstack data analytics dashboard built with React (Vite + Tailwind) and FastAPI, featuring:

- User registration and login with JWT authentication  
- CSV dataset upload with parsing and preview  
- Data stored securely in PostgreSQL  
- Protected API endpoints accessible only by authenticated users  
- Responsive UI with TailwindCSS  
- Dockerized backend, frontend, and database for easy deployment

## Tech Stack

- Frontend: React, Vite, TailwindCSS, React Router, React Query  
- Backend: FastAPI, SQLAlchemy (async), PostgreSQL  
- Authentication: JWT (JSON Web Tokens)  
- Deployment: Docker & docker-compose  

## Setup

1. Clone this repo  
2. Copy `.env.sample` to `.env` and set your `DATABASE_URL` and `SECRET_KEY`  
3. Run `docker-compose up --build`  
4. Access frontend at [http://localhost:5173](http://localhost:5173)  
5. Access backend docs at [http://localhost:8000/docs](http://localhost:8000/docs)  

## Features

- User registration and login  
- Upload CSV datasets (with validation and preview)  
- Secure endpoints with JWT authentication  
- Database schema for users and datasets  

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
