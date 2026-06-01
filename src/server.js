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
import { dashboardRouter } from "./modules/dashboard/dashboard.routes.js";
import { globalError } from "./middlewares/globalError.js";
import path from "path";
import authRouter from "./modules/auth/auth.routes.js";
import { AppError } from "./utils/AppError.js";
import cors from "cors";
import axios from "axios";
import { title } from "process";
import { Recipe } from "./models/recipe.model.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "healthy",
    message: "Food Project API running smoothly on Vercel.",
  });
});

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/recipes", recipeRouter);
app.use("/favorites", favoriteRouter);
app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);

//i run it 1 time to seed

// app.get("/seed", async (req, res, next) => {
//   let data = await axios.get(
//     "https://forkify-api.herokuapp.com/api/search?q=pizza",
//   );
//   let dataFinal = data.data.recipes;
//   let formateData = dataFinal.map((recipe) => ({
//     title: recipe.title,
//     description: recipe.title + " " + recipe.publisher,
//     image: recipe.image_url,
//     createdBy: "6a1d9a476f776cb79c5f9631",
//     categoryId: "6a1d9fa70032cdd2c36046bb",
//   }));

//   let SentData = await Recipe.insertMany(formateData);
//   res.json({ SentData });
// });

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalError);

export default app;

dbConnect();

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running locally on port ${port}`);
  });
}
