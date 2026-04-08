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
  const code = req.query.orderCode;

  const order = (await Order.findOne({
    raw: true,
    where: {
      code: code,
      deleted: false,
    },
  })) as any;

  const orderId = order.id;

  const orderItem = (await OrderItem.findAll({
    raw: true,
    where: {
      orderId: orderId,
    },
  })) as any;

  for (const item of orderItem) {
    const tourInfo = (await Tour.findOne({
      raw: true,
      where: {
        id: item.tourId,
        deleted: false,
        status: "active",
      },
    })) as any;

    item["title"] = tourInfo["title"];
    item["image"] = JSON.parse(tourInfo["images"])[0];
    item["slug"] = tourInfo["slug"];
    item["price"] = tourInfo["price"] * (1 - item["discount"] / 100);
    item["total"] =
      tourInfo["price"] * (1 - item["discount"] / 100) * item.quantity;
  }

  const totalPrice = orderItem.reduce(
    (total: any, item: any) => total + item.total,
    0,
  );

  res.render("client/pages/order/success", {
    pageTitle: "Đặt hàng thành công",
    order: order,
    orderItem: orderItem,
    totalPrice: totalPrice,
  });
};
