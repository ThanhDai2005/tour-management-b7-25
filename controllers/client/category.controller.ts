import { Request, Response } from "express";
import Category from "../../models/category.model";

// [GET] /category
export const index = async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    raw: true,
    where: {
      deleted: false,
      status: "active",
    },
  });

  res.render("client/pages/categories/index", {
    pageTitle: "Danh mục tour",
    categories: categories,
  });
};
