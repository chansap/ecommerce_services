const cartModel = require("../models/cart.models");
const logger = require("../utils/winstonLog.utils.js");
const CustomError = require("../utils/customError.js");

// Create Cart
const createCart = async (req, res, next) => {
  try {
    var dataCart;
    // Check weather the cart is created or not
    const userCart = await cartModel.findOne({
      userId: req.user.id,
    });

    if (!userCart) {
      dataCart = await cartModel.create({
        userId: req.user.id,
        products: req.body.products,
      });
    } else {
      dataCart = await cartModel.updateOne(
        {
          userId: req.user.id,
        },
        {
          $push: {
            products: {
              $each: req.body.products,
            },
          },
        }
      );
    }

    if (dataCart.nModified === 1) {
      logger.info("Items added to Cart successfully");
      res.status(201).json({
        status: 201,
        success: true,
        message: "Items added to Cart successfully",
        data: dataCart,
      });
    } else {
      logger.warn("Not able to create cart");
      next(new CustomError("Not able to create cart", 400));
    }
    // return res.status(500).json(error);
  } catch (error) {
    logger.error("Something went wrong");
    next(new CustomError());
  }
};

// Update Cart
const updateCart = async (req, res, next) => {
  try {
    const updateDataCart = await cartModel.updateOne(
      {
        userId: req.user.id,
        "products.productId": req.body.products.productId,
      },
      {
        // products: req.body.products,
        $set: { "products.$.quantity": req.body.products.quantity },
      }
    );

    if (updateDataCart) {
      return res.status(202).json(updateDataCart);
    } else {
      return res.status(400).json("Problem on Updating");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Delete Product
const deleteCartItems = async (req, res, next) => {
  try {
    const deleteItem = await cartModel.updateOne(
      {
        userId: req.user.id,
      },
      {
        $pull: { products: { productId: req.body.products.productId } },
      }
    );

    if (deleteItem) {
      return res.status(200).json(deleteItem);
    } else {
      return res.status(400).json("Problem on Deleting");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Get All Items in Cart
const allCartItems = async (req, res, next) => {
  try {
    const allItems = await cartModel.findOne({
      userId: req.user.id,
    });

    if (allItems) {
      logger.info("Fetching all Items");
      return res.status(200).json({
        status: 200,
        success: true,
        message: "All items in the cart",
        items: allItems,
      });
    } else {
      logger.warn("Problem on fetching");
      next(new CustomError("Problem on fetching", 400));
      // return res.status(400).json("Problem on fetching");
    }
  } catch (error) {
    logger.error("Something went wrong");
    next(new CustomError());
  }
};

const cartItemForAllUser = async (req, res, next) => {
  try {
    const cartItem = await cartModel.find();

    if (cartItem) {
      logger.info("All carts for users");
      return res.status(200).json({
        status: 200,
        success: true,
        message: "All carts for users",
        data: cartItem,
      });
    } else {
      logger.warn("Problem on fetching");
      next(new CustomError("Problem on fetching", 400));
    }
  } catch (error) {
    logger.error("Something went wrong");
    next(new CustomError());
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCartItems,
  allCartItems,
  cartItemForAllUser,
};
