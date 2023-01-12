const mongoose = require("mongoose");
const Order = require("./Order");
const Product = require("./Product");
const Schema = mongoose.Schema;
const orderItemSchema = Schema(
  {
    orderId: { type: mongoose.ObjectId, ref: Order },
    productId: { type: mongoose.ObjectId, ref: Product },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

const OrderItem = mongoose.model("OrderItem", orderItemSchema);
module.exports = OrderItem;
