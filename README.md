<div align="center">

  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" />

  <br/>

  <h1>Blog API</h1>
  <p><b>A high-performance, secure, and scalable blogging backend engine.</b></p>

  <p>
    <a href="#-key-features">Key Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-api-documentation">API Docs</a> •
    <a href="#-installation--setup">Setup</a>
  </p>
</div>

---

## 🚀 Key Features

* **⚡ High-Speed Caching:** Implemented **Redis** for read-heavy endpoints, reducing database load and improving latency.
* **🖼️ Managed Uploads:** Integrated **Cloudinary** for automated cloud image storage and optimized delivery.
* **🔐 Secure Auth:** Custom **JWT Authentication** middleware for protected resource access.
* **🔗 Relational Modeling:** Utilizes Mongoose **Virtual Populates** for optimized Blog-to-Comment relationships.
* **📖 Live Documentation:** Fully interactive API playground powered by **Swagger UI**.

---

## 🛠️ Tech Stack

<div align="center">

| Core | Database | Storage & Cache | Tooling |
| :--- | :--- | :--- | :--- |
| **Node.js** | **MongoDB** | **Redis** | **Docker** |
| **TypeScript** | **Mongoose** | **Cloudinary** | **Git** |
| **Express** | | | **Swagger** |

</div>

---

## 🔗 API Documentation

<details>
<summary><b>🔐 Authentication Endpoints</b></summary>

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create a new account |
| `POST` | `/api/auth/login` | Authenticate & get JWT token |

</details>

<details>
<summary><b>📝 Blog Endpoints</b></summary>

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/blogs` | ❌ | Fetch all blogs (Cached via Redis) |
| `GET` | `/api/blogs/:id` | ❌ | Fetch single blog with full details |
| `POST` | `/api/blogs` | ✅ | Create post (Multipart/Cloudinary) |
| `PUT` | `/api/blogs/:id` | ✅ | Update blog (Author only) |
| `DELETE` | `/api/blogs/:id` | ✅ | Remove blog & clean Cloudinary storage |
| `POST` | `/api/blogs/:id/like`| ✅ | Toggle like status on a post |

</details>

<details>
<summary><b>💬 Comment Endpoints</b></summary>

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/comments/:blogId` | ✅ | Post a comment to a blog |
| `GET` | `/api/comments/:blogId` | ❌ | Get all comments for a post |

</details>

---

## 📁 Project Structure

```text
src/
├── config/         # Redis, Cloudinary, & Database configurations
├── controllers/    # Request handling & Business logic
├── middleware/     # JWT Auth & Security filters
├── models/         # Mongoose schemas & TypeScript interfaces
├── routes/         # Express endpoint definitions
└── index.ts        # Server entry point
