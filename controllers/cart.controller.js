const cartController = {};
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
cartController.addItemToCart = async (req, res) => {
  try {
    const { userId } = req;
    const { productId, price, qty } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId });
      await cart.save();
    }
    const cartItem = new CartItem({ productId, price, qty, cartId: cart._id });
    await cartItem.save();
    res.status(200).json({ status: "success", data: cartItem });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};
cartController.getCart = async (req, res) => {
  try {
    const { userId } = req;
    const cart = await Cart.findOne({ userId });
    const cartItemList = await CartItem.find({ cartId: cart._id });
    res.status(200).json({ status: 200, data: cartItemList });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};
cartController.editCartItem = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;

    const { qty } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("There is no cart for this user");

    const item = await CartItem.findOneAndUpdate(
      { id, cartId: cart._id },
      { qty },
      { new: true }
    );
    if (!item) throw new Error("Can not find item");
    res.status(200).json({ status: 200, data: item });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

cartController.deleteCartItem = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params.id;
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("There is no cart for this user");

    const item = await CartItem.findOneAndDelete({ id, cartId: cart._id });
    if (!item) throw new Error("No Item to delete");
    res.status(200).json({ status: 200, data: item });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};
module.exports = cartController;
