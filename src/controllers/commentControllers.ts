import type { Response } from "express";
import CommentModel from '../models/Comment.js'; 
import type { AuthRequest } from "../middleware/auth.js";
import redis from "../config/redis.js";

export async function addComment(req: AuthRequest, res: Response) {
  try {
    // FIX: Get blogId from req.params to match your /:id/comments route
    const { id: blogId } = req.params; 
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const comment = await CommentModel.create({
      content,
      author: req.userId,
      blog: blogId
    });

    // Populate author details so the frontend can show who commented immediately
    await comment.populate("author", "name email");

    // Invalidate the cache for this blog so the new comment shows up
    await redis.del(`blog:${blogId}`);

    return res.status(201).json(comment);
  } catch (error) {
    console.error("Add Comment Error:", error); 
    return res.status(500).json({ message: "Failed to add comment" });
  }
}