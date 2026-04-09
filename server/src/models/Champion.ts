import mongoose, { Schema, Document } from 'mongoose';

export interface IChampion extends Document {
  id: string;
  name: string;
  tier: number;
  cost: number;
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

const ChampionSchema = new Schema<IChampion>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  tier: { type: Number, required: true },
  cost: { type: Number, required: true },
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

export default mongoose.model<IChampion>('Champion', ChampionSchema);