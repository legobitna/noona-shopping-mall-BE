const Product = require("../models/Product");

const productController = {};
const PAGE_SIZE = 5;
productController.createProduct = async (req, res) => {
  try {
    const {
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    } = req.body;
    const product = new Product({
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    });
    await product.save();
    res.status(200).json({ status: "success", product });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};
productController.getProducts = async (req, res) => {
  try {
    const { page, name } = req.query;
    console.log("ddd", name);
    const productList = await Product.find({
      name: { $regex: name, $options: "i" },
    }) // sku 문자가 없으면? 문자 포함은?
      .skip((page - 1) * PAGE_SIZE)
      .limit(5);
    const totalItemNum = await Product.find({
      name: { $regex: name, $options: "i" },
    }).count();

    const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);

    res
      .status(200)
      .json({ status: "success", data: productList, totalPageNum });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

productController.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) throw new Error("No item found");
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

productController.updateProduct = async (req, res) => {
  try {
    const {
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    } = req.body;
    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(
      { _id: productId },
      {
        sku,
        name,
        size,
        image,
        category,
        description,
        price,
        stock,
        status,
      },
      { new: true }
    );
    if (!product) throw new Error("No item found");
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

productController.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) throw new Error("No item found");
    res.status(200).json({ status: "success" });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};
module.exports = productController;
