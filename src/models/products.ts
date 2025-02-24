import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  featured?: boolean;
  rating?: number;
  type?: "Electronics" | "Books" | "Clothes"; 
  createdAt?: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, "You must provide a name"],
  },
  price: {
    type: Number,
    required: [true, "You must provide a price"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  type: {
    type: String,
    enum: ["Electronics", "Books", "Clothes"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
