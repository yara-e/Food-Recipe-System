import { Router } from "express";
import { getDashboardStats } from "./dashboard.controller.js";
import { protectedRoutes } from "../../middlewares/auth.middleware.js";
import { allowedTo } from "../../middlewares/role.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { dashboardSchema } from "../../validations/dashboard.validation.js";

const dashboardRouter = Router();

dashboardRouter.get(
  "/",
  protectedRoutes,
  allowedTo("admin"),
  validate(dashboardSchema),
  getDashboardStats,
);

export { dashboardRouter };
