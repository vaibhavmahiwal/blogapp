import { Router } from "express";
import {
    createBlog,
    listBlogs,
    getBlog,
    updateBlog,
    toggleLike,
    deleteBlog,
} from "../controllers/blogControllers.js";
import { addComment } from "../controllers/commentControllers.js";
import requireAuth from "../middleware/auth.js";
import upload from "../utils/uploader.js"; // Local storage uploader
import { uploadCloudinary } from '../config/cloudinary.js';
const router = Router();

// --- Public Routes ---
router.get("/", listBlogs);
router.get("/:id", getBlog);

// --- Protected Routes ---

// Create Blog (Using local upload)
router.post("/", requireAuth, uploadCloudinary.single("image"), createBlog);

// Update Blog (Allows updating text AND/OR a new image)
router.put("/:id", requireAuth, uploadCloudinary.single("image"), updateBlog);

// Delete Blog
//router.delete("/:id", requireAuth, deleteBlog);

// Like/Unlike
router.post("/:id/like", requireAuth, toggleLike);

// Comments
router.post("/:id/comments", requireAuth, addComment);

export default router;

/** * (Your Swagger Documentation remains the same below this line) 
 */
/**
 * @swagger
 * tags:
 * name: Blogs
 * description: Blog management APIs
 */

/**
 * @swagger
 * /api/blogs:
 * get:
 * summary: Get all blogs
 * tags: [Blogs]
 * responses:
 * 200:
 * description: List of all blogs
 * post:
 * summary: Create a new blog
 * tags: [Blogs]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * multipart/form-data:
 * schema:
 * type: object
 * required: [title, content, image]
 * properties:
 * title:
 * type: string
 * content:
 * type: string
 * image:
 * type: string
 * format: binary
 * responses:
 * 201:
 * description: Blog created successfully
 */

/**
 * @swagger
 * /api/blogs/{id}:
 * get:
 * summary: Get a single blog by ID
 * tags: [Blogs]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Blog found
 * put:
 * summary: Update a blog
 * tags: [Blogs]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * requestBody:
 * required: true
 * content:
 * multipart/form-data:
 * schema:
 * type: object
 * properties:
 * title:
 * type: string
 * content:
 * type: string
 * image:
 * type: string
 * format: binary
 * responses:
 * 200:
 * description: Blog updated successfully
 * delete:
 * summary: Delete a blog
 * tags: [Blogs]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Blog deleted successfully
 */

/**
 * @swagger
 * /api/blogs/{id}/like:
 * post:
 * summary: Toggle like/unlike on a blog
 * tags: [Blogs]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Toggled like successfully
 */

/**
 * @swagger
 * /api/blogs/{id}/comments:
 * post:
 * summary: Add a comment to a blog
 * tags: [Blogs]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required: [content]
 * properties:
 * content:
 * type: string
 * responses:
 * 201:
 * description: Comment added successfully
 */