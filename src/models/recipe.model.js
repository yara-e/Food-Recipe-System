import { model, Schema, Types } from "mongoose";

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,  
    },
    size: {
        type: String,
        enum: ["small", "medium", "large"],
        default: "medium"
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "user",
        required: true
    },
    categoryId: {
        type: Types.ObjectId,
        ref: "category",
        required: true
    }
},  

);  
export const Recipe = model("recipe", recipeSchema);