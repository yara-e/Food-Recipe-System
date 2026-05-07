import "dotenv/config";
import express from "express";
import { dbConnect } from "./db/dbConnection.js";
import { userRouter } from "./modules/user/user.routes.js";
import { categoryRouter } from "./modules/category/category.routes.js";
import { recipeRouter } from "./modules/recipe/recipe.routes.js";
import { favoriteRouter } from "./modules/favorite/favorite.routes.js";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json())
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use("/users",userRouter);
app.use("/categories",categoryRouter);
app.use("/recipes",recipeRouter);
app.use("/favorites",favoriteRouter);

dbConnect().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});