const mongoose = require("mongoose");
const Cart = require("./Cart");
const Product = require("./Product");
const Schema = mongoose.Schema;
const cartItemSchema = Schema(
  {
    cartId: { type: mongoose.ObjectId, ref: Cart },
    productId: { type: mongoose.ObjectId, ref: Product },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);
cartItemSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  return obj;
};
const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItem;
