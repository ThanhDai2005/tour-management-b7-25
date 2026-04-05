import { Express } from "express";
import tourRoute from "./tour.route";
import CategoryRoute from "./category.route";

export const clientRoutes = (app: Express) => {
  app.use("/tours", tourRoute);

  app.use("/categories", CategoryRoute);
};
