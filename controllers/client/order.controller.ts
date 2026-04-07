import { Request, Response } from "express";
import Order from "../../models/order.model";
import { generateOrderCode } from "../../helpers/generate";

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

  res.status(200).json({
    message: "Đặt hàng thành công!",
    orderCode: orderCode,
  });
};
