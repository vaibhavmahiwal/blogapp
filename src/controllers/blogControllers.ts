import type  {Response} from "express";
import Blog from "../models/Blog.js";
import type { AuthRequest } from "../middleware/auth.js";

export async function createBlog(req: AuthRequest, res: Response) {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const blog = await Blog.create({
      title,
      content,
      imageUrl: `/uploads/${req.file.filename}`,
      author: req.userId,
    });

    return res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create blog" });
  }
}

//list Blogs
export async function listBlogs(req:AuthRequest,res:Response){
     try{
        const blogs=await Blog.find()
         .populate("author","name email")
         .sort({createdAt:-1});
         return res.json(blogs);
     }catch(error){
        return res.status(500).json({message:"failed to list blogs"});
     }
}

//function to get blog by id
export async function getBlog(req:AuthRequest,res:Response){
      try{
          const {id}=req.params as {id:string};
          const blog=await Blog.findById(id).populate("author","name,email");
          if(!blog)return res.status(404).json({message:"Not found"});
          return res.json(blog);
      }catch(error){
          return res.status(500).json({message:"Failed to get blog"});
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
          
          if(req.file){
            blog.imageUrl=`/uploads/${req.file.filename}`;

          }
          await blog.save();
          return res.json(blog); 
     }catch(error){
         res.status(500).json({message:"failed to upload blog"});
     }
}

//delete function to be add