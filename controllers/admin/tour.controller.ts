import { Request, Response } from "express";
import Tour from "../../models/tour.model";

// [GET] /admin/tours
export const index = async (req: Request, res: Response) => {
  const tours = (await Tour.findAll({
    raw: true,
    where: {
      deleted: false,
    },
  })) as any;

  for (const tour of tours) {
    tour["price_special"] = tour["price"] * (1 - tour["discount"] / 100);

    tour["image"] = JSON.parse(tour["images"])[0];
  }

  res.render("admin/pages/tours/index", {
    pageTitle: "Danh sách tour",
    tours: tours,
  });
};
