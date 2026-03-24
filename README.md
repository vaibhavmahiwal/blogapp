<div align="center">
  <h1>Blog API</h1>
  <p><b>A high-performance, secure, and scalable server-side engine for blog applications.</b></p>
  <p>Built with Node.js · TypeScript · Express · MongoDB · Redis · Cloudinary</p>
  <p>
    <a href="#key-features">Key Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#api-documentation">API Docs</a> •
    <a href="#installation--setup">Setup</a>
  </p>
</div>

---

## Key Features

- **High-Speed Caching** — Redis is used on read-heavy endpoints to significantly reduce database load and improve response latency.
- **Managed Image Uploads** — Cloudinary handles all image storage, transformation, and optimized delivery automatically.
- **Secure Authentication** — Custom JWT middleware protects private routes and ensures only authorized users can access restricted resources.
- **Relational Data Modeling** — Mongoose Virtual Populates are used to efficiently link Blog documents with their associated Comments without redundant storage.
- **Interactive API Documentation** — A fully live and testable API playground is available via Swagger UI, making integration straightforward.

---

## Tech Stack

| Category         | Technology              |
| :--------------- | :---------------------- |
| Runtime          | Node.js                 |
| Language         | TypeScript              |
| Framework        | Express                 |
| Database         | MongoDB with Mongoose   |
| Caching          | Redis                   |
| Image Storage    | Cloudinary              |
| API Docs         | Swagger UI              |            |

---

## API Documentation

<details>
<summary><b>Authentication Endpoints</b></summary>

| Method | Endpoint              | Description                        |
| :----- | :-------------------- | :--------------------------------- |
| POST   | `/api/auth/register`  | Create a new user account          |
| POST   | `/api/auth/login`     | Authenticate a user and get a JWT  |

</details>

<details>
<summary><b>Blog Endpoints</b></summary>

| Method | Endpoint              | Auth Required | Description                                         |
| :----- | :-------------------- | :------------ | :-------------------------------------------------- |
| GET    | `/api/blogs`          | No            | Fetch all blogs (response is cached via Redis)      |
| GET    | `/api/blogs/:id`      | No            | Fetch a single blog with full details               |
| POST   | `/api/blogs`          | Yes           | Create a new post (supports multipart/Cloudinary)   |
| PUT    | `/api/blogs/:id`      | Yes           | Update a blog post (restricted to the author)       |
| DELETE | `/api/blogs/:id`      | Yes           | Delete a blog and clean up its Cloudinary assets    |
| POST   | `/api/blogs/:id/like` | Yes           | Toggle the like status on a blog post               |

</details>

<details>
<summary><b>Comment Endpoints</b></summary>

| Method | Endpoint                   | Auth Required | Description                        |
| :----- | :------------------------- | :------------ | :--------------------------------- |
| POST   | `/api/comments/:blogId`    | Yes           | Post a new comment on a blog       |
| GET    | `/api/comments/:blogId`    | No            | Retrieve all comments for a blog   |

</details>

---

## Project Structure
```text
src/
├── config/         # Redis, Cloudinary, and Database configurations
├── controllers/    # Request handling and core business logic
├── middleware/     # JWT authentication and security filters
├── models/         # Mongoose schemas and TypeScript interfaces
├── routes/         # Express route definitions
└── index.ts        # Server entry point
```

---

## Installation & Setup

### Prerequisites

- Node.js v18+
- MongoDB instance (local or Atlas)
- Redis instance
- Cloudinary account

### Steps
```bash
# 1. Clone the repository
git clone https://github.com/vaibhavmahiwal/blogapp.git
cd blog-api

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Fill in your MongoDB URI, Redis URL, JWT secret, and Cloudinary credentials

# 4. Start the development server
npm run dev
```

Once running, the Swagger UI documentation will be available at `http://localhost:3000/api-docs`.
