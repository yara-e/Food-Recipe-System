import mongoose, { model, Schema ,Types} from "mongoose";

const favoriteSchema =new Schema({
    userId:{
        type:Types.ObjectId,
        ref:"user",
        required:true
    },
    recipeId:{
        type:Types.ObjectId,
        ref:"recipe",
        required:true
    }
    
})

export const Favorite = model("favorite",favoriteSchema);