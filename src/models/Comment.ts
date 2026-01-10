import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IComment extends Document {
  content: string;
  author: Types.ObjectId; // Use Types.ObjectId for clearer intent in TS
  blog: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>({
  content: { 
    type: String, 
    required: [true, 'Comment content is required'], // Added custom error message
    trim: true // Removes accidental whitespace
  },
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  blog: { 
    type: Schema.Types.ObjectId, 
    ref: 'Blog', 
    required: true 
  },
}, { 
  timestamps: true,
  versionKey: false // Optional: removes the __v field from your documents
});

export default mongoose.model<IComment>('Comment', CommentSchema);