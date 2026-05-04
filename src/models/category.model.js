import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Category = model("Category", categorySchema);
