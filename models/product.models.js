const Mongoose = require("mongoose");

const ProductSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    catagories: {
      type: Array,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModel = Mongoose.model("Product", ProductSchema);

module.exports = userModel;
