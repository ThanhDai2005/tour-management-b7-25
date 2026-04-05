import { Request, Response } from "express";
import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";

// [GET] /tours/:slugCategory
export const index = async (req: Request, res: Response) => {
  const slugCategory = req.params.slugCategory;

  const tours = await sequelize.query(
    `
    SELECT tours.*, ROUND(price * (1 - discount/100),0) AS price_special
    FROM tours
    JOIN tours_categories ON tours.id = tours_categories.tour_id
    JOIN categories ON tours_categories.category_id = categories.id
    WHERE 
      categories.slug = '${slugCategory}'
      AND categories.deleted = false
      AND categories.status = 'active'
      AND tours.deleted = false
      AND tours.status = 'active';
  `,
    {
      type: QueryTypes.SELECT,
    },
  );

  const newTour = tours.map((item: any) => {
    if (item["images"]) {
      return {
        ...item,
        images: JSON.parse(item["images"])[0],
        price_special: parseFloat(item["price_special"]),
      };
    }
    return {
      ...item,
      price_special: parseFloat(item["price_special"]),
    };
  });

  res.render("client/pages/tours/index", {
    pageTitle: "Danh sách tour",
    tours: newTour,
  });
};
