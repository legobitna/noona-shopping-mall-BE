const Order = require("../models/Order");

const orderController = {};
orderController.createOrder = async (req, res) => {
  try {
    const { userId } = req;
    const { shipTo, contact, orderList } = req.body;
    const newOrder = await Order.create({ userId, shipTo, contact });
    if (!newOrder) throw new Error("order fail");

    let totalPrice = 0;
    orderList.array.forEach(async (item) => {
      const { productId, price, qty } = item;
      const orderItem = new OrderItem({
        orderId: newOrder._id,
        productId,
        price,
        qty,
      });
      totalPrice += price * qty;
      await orderItem.save();
    });
    await Order.findByIdAndUpdate({ _id: newOrder._id }, { totalPrice });
    res.status(200).json({ status: "success" });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = orderController;
