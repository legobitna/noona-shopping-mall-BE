const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const userSchema = Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    level: { type: String, default: "customer" },
  },
  { timestamps: true } // 이게 있으면 createAt과 updateAt이 생긴다
);
userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.__v;
  delete obj.updatedAt;
  return obj;
};
userSchema.methods.generateToken = async function () {
  // 유저에서 많이 쓰이는 함수이니 여기에 정의
  //https://mongoosejs.com/docs/guide.html#methods
  // 화살표함수 안쓰게 주의

  const token = await jwt.sign({ _id: this.id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
