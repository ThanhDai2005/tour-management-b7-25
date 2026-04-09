import { Express } from "express";
import CategoryRoute from "./category.route";
import TourRoute from "./tour.route";
import { systemConfig } from "../../config/system";

export const adminRoutes = (app: Express) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(`${PATH_ADMIN}/categories`, CategoryRoute);

  app.use(`${PATH_ADMIN}/tours`, TourRoute);
};
