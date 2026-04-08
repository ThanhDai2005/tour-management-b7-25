import { Request, Response } from "express";
import Order from "../../models/order.model";
import { generateOrderCode } from "../../helpers/generate";
import OrderItem from "../../models/order-item.model";
import Tour from "../../models/tour.model";

// [POST] /order
export const order = async (req: Request, res: Response) => {
  const data = req.body;

  console.log(data);

  const order = await Order.create({
    code: "",
    fullName: data.fullName,
    phone: data.phone,
    note: data.note,
    status: "initial",
  });

  const orderId = order.dataValues.id;
  const orderCode = generateOrderCode(orderId);
  await Order.update(
    {
      code: orderCode,
    },
    {
      where: {
        id: orderId,
      },
    },
  );

  for (const item of data.cart) {
    const dataItem = {
      tourId: item.tourId,
      orderId: orderId,
      quantity: item.quantity,
    } as any;

    const tourInfo = (await Tour.findOne({
      raw: true,
      where: {
        id: item.tourId,
        status: "active",
        deleted: false,
      },
    })) as any;

    dataItem["price"] = tourInfo["price"];
    dataItem["discount"] = tourInfo["discount"];
    dataItem["timeStart"] = tourInfo["timeStart"];

    await OrderItem.create(dataItem);
  }

  res.status(200).json({
    message: "Đặt hàng thành công!",
    orderCode: orderCode,
  });
};

// [GET] /order/success
export const success = async (req: Request, res: Response) => {
  res.render("client/pages/order/success", {
    pageTitle: "Đặt hàng thành công",
  });
};
