# 🏠 EstateHub

A full-stack real estate platform where users can browse, search, list, and manage property listings.

**Live Demo:** [https://realstate-sooty-eight.vercel.app](https://realstate-sooty-eight.vercel.app)

> ⚠️ The backend runs on Render's free tier and spins down after 15 minutes of inactivity. The first request may take 30–60 seconds to wake up.

---

## ✨ Features

### For Everyone

- **Browse Properties** — view all listings with images, prices, and details
- **Search & Filter** — filter by purpose (Sale/Rent), type, location, bedrooms, and budget
- **Property Details** — full view of each listing with description, amenities, and price
- **Favorites** — save listings for later (stored locally)
- **Responsive Design** — works on desktop and mobile
- **Dark Mode** — toggle between light and dark themes

### For Registered Users

- **Authentication** — register and log in with JWT-based sessions
- **Persistent Login** — stay logged in across page reloads
- **Add Property** — create new listings with title, price, location, and image URL
- **Edit Property** — update your own listings
- **Delete Property** — remove your own listings
- **Personal Dashboard** — view stats and manage only your own listings

### Security

- **Password Hashing** — bcrypt for secure password storage
- **JWT Authentication** — tokens for stateless auth
- **Ownership Protection** — users can only edit/delete their own properties (enforced on backend)
- **CORS Restrictions** — backend only accepts requests from trusted origins

---

## 🛠️ Tech Stack

### Frontend

- **React 19** — UI library
- **Vite** — fast build tool and dev server
- **React Router v7** — client-side routing
- **Tailwind CSS v4** — utility-first styling
- **Axios** — HTTP client with interceptors

### Backend

- **Node.js** — runtime
- **Express 5** — web framework
- **Prisma 7** — ORM for PostgreSQL
- **PostgreSQL (Neon)** — serverless Postgres database
- **JWT (jsonwebtoken)** — authentication tokens
- **bcryptjs** — password hashing

### Deployment

- **Frontend** → [Vercel](https://vercel.com)
- **Backend** → [Render](https://render.com)
- **Database** → [Neon](https://neon.tech)

---

## 📁 Project Structure
