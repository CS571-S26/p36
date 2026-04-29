import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  id: string;
  name: string;
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  patch: string;
}

const ItemSchema = new Schema<IItem>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: {
    full: String,
    sprite: String,
    group: String,
    x: Number,
    y: Number,
    w: Number,
    h: Number,
  },
  patch: { type: String, required: true },
});

export default mongoose.model<IItem>('Item', ItemSchema);