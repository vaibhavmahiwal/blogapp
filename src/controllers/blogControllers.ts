import type  {Response} from "express";
import Blog from "../models/Blog.js";
import type { AuthRequest } from "../middleware/auth.js";
import redis from "../config/redis.js";

export const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        // ✅ Use req.file.path (This is the HTTPS link from Cloudinary)
        const imageUrl = req.file.path; 

        const newBlog = await Blog.create({
            title,
            content,
            imageUrl, 
            author: req.userId
        });

        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//list Blogs
export async function listBlogs(req: AuthRequest, res: Response) {
  try {
    const cacheKey = "blogs:all";

    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    await redis.setex(cacheKey, 60, JSON.stringify(blogs)); // cache 60 sec
    return res.json(blogs);

  } catch (error) {
    return res.status(500).json({ message: "failed to list blogs" });
  }
}

//function to get blog by id
export async function getBlog(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params as { id: string };
    const cacheKey = `blog:${id}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const blog = await Blog.findById(id)
      .populate("author", "name email");

    if (!blog) {
      return res.status(404).json({ message: "Not found" });
    }

    await redis.setex(cacheKey, 60, JSON.stringify(blog));
    return res.json(blog);

  } catch (error) {
    return res.status(500).json({ message: "Failed to get blog" });
  }
}

//update a blog
export async function updateBlog(req:AuthRequest,res:Response){
     try{
         const {id}=req.params as {id:string};
         const blog=await Blog.findById(id);
          if(!blog)return res.status(404).json({message:"Not found"});
          if(blog.author.toString()!==req.userId)
            return res.status(403).json({message:"Forbidden"});
            
          const {title,content}=req.body as {title:string,content:string};
          if(typeof title==="string")blog.title=title;
          if(typeof content==="string")blog.content=content;
          
         if (req.file) {
    // Change this to use the Cloudinary URL
          blog.imageUrl = req.file.path; 
         }
          await blog.save();
          return res.json(blog); 
     }catch(error){
         res.status(500).json({message:"failed to upload blog"});
     }
}


//toggle like function to count the like on a blog
export async function toggleLike(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Use .toString() or .equals() for ObjectId comparisons in TS
    const hasLiked = blog.likes.some(id => id.toString() === userId);

    let message = "";
    let liked = false;

    if (hasLiked) {
      // UNLIKE
      await Blog.findByIdAndUpdate(id, { $pull: { likes: userId } });
      message = "Unliked successfully";
      liked = false;
    } else {
      // LIKE
      await Blog.findByIdAndUpdate(id, { $addToSet: { likes: userId } });
      message = "Liked successfully";
      liked = true;
    }

    // Invalidate ALL relevant caches
    await redis.del(`blog:${id}`);
    
    // Pattern to delete paginated lists (if you use keys like blogs:all*)
    // const keys = await redis.keys('blogs:all*');
    // if (keys.length > 0) await redis.del(keys);

    // Fetch updated count to return to frontend
    const updatedBlog = await Blog.findById(id).select('likes');

    return res.status(200).json({ 
      message, 
      liked, 
      likesCount: updatedBlog?.likes.length || 0 
    });

  } catch (err) {
    console.error("Like Error:", err);
    return res.status(500).json({ message: "Server error during like toggle" });
  }
}


//delete function to be add


export async function deleteBlog(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;

    // 1. Find the blog
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // 2. Check if the user deleting it is the owner
    // Note: Use .toString() because blog.author is an ObjectId
    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ message: "You can only delete your own blogs" });
    }

    // 3. Delete from MongoDB
    await Blog.findByIdAndDelete(id);

    // 4. Invalidate Redis Cache
    await redis.del("blogs:all");
    await redis.del(`blog:${id}`);

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error: any) {
    console.error("Delete Error:", error);
    return res.status(500).json({ message: "Failed to delete blog" });
  }
}