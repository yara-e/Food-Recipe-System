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
    image: {
        type: String,  
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    categoryId: {
        type: Types.ObjectId,
        ref: "Category",
        required: true
    }
},  

);  
export const Recipe = model("Recipe", recipeSchema);