import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    content: string;
    imageUrl: string;
    author: Types.ObjectId;
    likes: Types.ObjectId[]; // Array of User IDs who liked the post
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema: Schema<IBlog> = new Schema<IBlog>(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true },
        imageUrl: { type: String },
        author: { 
            type: Schema.Types.ObjectId, 
            ref: "User", 
            required: true, 
            index: true 
        },
        // Store user IDs to ensure 1 like per user
        likes: [{ 
            type: Schema.Types.ObjectId, 
            ref: "User" 
        }],
    },
    { 
        timestamps: true,
        // These two lines are CRUCIAL for virtual populating
        toJSON: { virtuals: true }, 
        toObject: { virtuals: true } 
    }
);

// This tells Mongoose to find all Comments where 'blog' matches this Blog's '_id'
BlogSchema.virtual('comments', {
    ref: 'Comment',          // The Model to link to
    localField: '_id',       // Field in this Blog schema
    foreignField: 'blog',    // Field in the Comment schema
});

export const Blog: Model<IBlog> = mongoose.model<IBlog>("Blog", BlogSchema);
export default Blog;