import { Express } from "express";
import tourRoute from "./tour.route";

export const clientRoutes = (app: Express) => {
  app.use("/tours", tourRoute);
};
