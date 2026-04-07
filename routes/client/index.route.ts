import { Express } from "express";
import tourRoute from "./tour.route";
import CategoryRoute from "./category.route";
import CartRoute from "./cart.route";
import orderRoute from "./order.route";

export const clientRoutes = (app: Express) => {
  app.use("/tours", tourRoute);

  app.use("/categories", CategoryRoute);

  app.use("/cart", CartRoute);

  app.use("/order", orderRoute);
};
