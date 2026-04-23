import mongoose, { Schema, Document } from 'mongoose';

export interface IComp extends Document {
  title: string;
  username: string;
  champions: {
    championName: string;
    position?: { row: number; col: number };
  }[];
  tips: string;
  howToTransition: string;
  createdAt: Date;
  heartCount: number;
  commentCount: number;
  comments: {
    username: string;
    content: string;
  }[];
}

const CompSchema = new Schema<IComp>(
  {
    title: { type: String, required: true },
    username: { type: String, required: true },
    champions: [
      {
        _id: false,
        championName: { type: String, required: true },
        position: {
          row: { type: Number, min: 0, max: 3 },
          col: { type: Number, min: 0, max: 6 },
        },
      },
    ],
    tips: { type: String, default: '' },
    howToTransition: { type: String, default: '' },
    heartCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    comments: [
      {
        username: { type: String, required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IComp>('Comp', CompSchema);