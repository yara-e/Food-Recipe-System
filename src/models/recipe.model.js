import { model, Schema, Types } from "mongoose";

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: [String],
    required: false,
  },
  createdBy: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  categoryId: {
    type: Types.ObjectId,
    ref: "Category",
    required: true,
  },
  
},
{timestamps: true},);

recipeSchema.post(["find", "findOne", "findByIdAndUpdate", "findByIdAndDelete"], (docs) => {
  const res = Array.isArray(docs) ? docs : [docs];

  res.forEach((doc) => {
    if (doc && doc.image) {
      doc.image = doc.image.map((img) => {
        return `${process.env.APP_URL || "http://localhost:3000"}/${img.replace(/\\/g, "/")}`;
      });
    }
  });
});

export const Recipe = model("Recipe", recipeSchema);
