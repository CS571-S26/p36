import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  createdPosts: { postId: mongoose.Types.ObjectId }[];
  bookmarkedPosts: { postId: mongoose.Types.ObjectId }[];
  likedPosts: { postId: mongoose.Types.ObjectId }[];
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    createdPosts: [{ postId: { type: Schema.Types.ObjectId, ref: 'Comp' } }],
    bookmarkedPosts: [{ postId: { type: Schema.Types.ObjectId, ref: 'Comp' } }],
    likedPosts: [{ postId: { type: Schema.Types.ObjectId, ref: 'Comp' } }],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);