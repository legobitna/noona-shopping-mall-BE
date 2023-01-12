const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;
const orderSchema = Schema(
  {
    userId: { type: mongoose.ObjectId, ref: User },
    status: { type: String, default: "preparing" },
    totalPrice: { type: Number, required: true, default: 0 },
    shipTo: { type: String, required: true },
    contact: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
