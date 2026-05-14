import Joi from "joi";
 

export const toggleFavoriteSchema = Joi.object({
  
  userId: Joi.string().hex().length(24).required(),
  recipeId: Joi.string().hex().length(24).required()
});

 