import { Express } from "express";
import toursRoute from "./tours.route";

export const clientRoutes = (app: Express) => {
  app.use("/tours", toursRoute);
};
