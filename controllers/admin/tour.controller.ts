import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import Category from "../../models/category.model";
import { generateTourCode } from "../../helpers/generate";
import Tour_Category from "../../models/tour_category.model";
import { systemConfig } from "../../config/system";

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

    if (tour["images"]) {
      tour["image"] = JSON.parse(tour["images"])[0];
    }
  }

  res.render("admin/pages/tours/index", {
    pageTitle: "Danh sách tour",
    tours: tours,
  });
};

// [GET] /admin/tours/create
export const create = async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    raw: true,
    where: {
      deleted: false,
      status: "active",
    },
  });

  res.render("admin/pages/tours/create", {
    pageTitle: "Tạo tour",
    categories: categories,
  });
};

// [POST] /admin/tours/create
export const createPost = async (req: Request, res: Response) => {
  const data = req.body;

  const countTour = await Tour.count();
  const code = generateTourCode(countTour + 1);

  if (data.position == "") {
    data.position = countTour + 1;
  } else {
    data.position = parseInt(data.position);
  }

  const tour = (await Tour.create({
    title: data.title,
    code: code,
    price: parseInt(data.price),
    discount: parseInt(data.discount),
    stock: parseInt(data.stock),
    timeStart: data.timeStart,
    position: data.position,
    status: data.status,
  })) as any;

  const tourId = tour.id;

  await Tour_Category.create({
    tour_id: tourId,
    category_id: parseInt(data.category_id),
  });

  res.redirect(`${systemConfig.prefixAdmin}/tours`);
};
