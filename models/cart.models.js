const Mongoose = require("mongoose");

const CartSchemas = new Mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const cartModel = Mongoose.model("Cart", CartSchemas);

module.exports = cartModel;
