const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = Schema(
  {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    size: { type: Array },
    image: { type: String },
    category: { type: Array },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Object },
    status: { type: String, default: "preparing" },
  },
  { timestamps: true }
);
productSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.updatedAt;
  return obj;
};
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
