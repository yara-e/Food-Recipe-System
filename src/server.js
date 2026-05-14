process.on("uncaughtException", (err) => {
  console.error(err.name, err.message);
  process.exit(1);
});
process.on("unhandledRejection", (err) => {
  console.error(err.name, err.message);
  process.exit(1);
});

import "dotenv/config";
import express from "express";
import { dbConnect } from "./db/dbConnection.js";
import { userRouter } from "./modules/user/user.routes.js";
import { categoryRouter } from "./modules/category/category.routes.js";
import { recipeRouter } from "./modules/recipe/recipe.routes.js";
import { favoriteRouter } from "./modules/favorite/favorite.routes.js";
import { globalError } from "./middlewares/globalError.js";
import path from "path";
import authRouter from "./modules/auth/auth.routes.js";
import { AppError } from "./utils/AppError.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/recipes", recipeRouter);
app.use("/favorites", favoriteRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalError);

dbConnect().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});


