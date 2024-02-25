const orderModel = require("../models/order.models");
const logger = require("../utils/winstonLog.utils.js");
const CustomError = require("../utils/customError.js");

// create Order
const createOrders = async (req, res, next) => {
  try {
    const orderData = await orderModel.create({
      userId: req.user.id,
      products: req.body.products,
      amount: req.body.amount,
      address: req.body.address,
      status: req.body.status,
    });
    if (orderData) {
      logger.info("Successfully created Order");
      res.status(201).json({
        status: 201,
        success: true,
        message: "Successfully created Order",
        data: orderData,
      });
    } else {
      logger.warn("Not able to create order");
      next(new CustomError("Not able to create order", 400));
      // res.status(400).json("Not able to create");
    }
  } catch (error) {
    logger.error("Something went wrong");
    next(new CustomError());
    // return res.status(500).json(error);
  }
};

// Update Order
const updateOrder = async (req, res, next) => {
  try {
    const updateDataOrder = await orderModel.updateOne(
      {
        userId: req.user.id,
        "products.productId": req.body.products[0].productId,
      },
      {
        // products: req.body.products,
        $set: {
          "products.$.quantity": req.body.products[0].quantity,
          amount: req.body.amount,
          address: req.body.address,
          status: req.body.status,
        },
      }
    );

    if (updateDataOrder) {
      return res.status(200).json(updateDataOrder);
    } else {
      logger.warn("Problem on Updating Orders");
      next(new CustomError("Problem on Updating Orders", 400));
      // return res.status(400).json("Problem on Updating");
    }
  } catch (error) {
    logger.error("Something went wrong");
    next(new CustomError());
    // return res.status(500).json(error);
  }
};

// Delete Order
const deleteOrder = async (req, res, next) => {
  try {
    const deleteOrdData = await orderModel.findOneAndDelete({
      _id: req.params.orderId,
    });

    if (deleteOrdData) {
      logger.info("Order Successfully Deleted ");
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Order Successfully Deleted",
      });
    } else {
      logger.warn("Problem on Deleting");
      next(new CustomError("Problem on Deleting", 400));
      // return res.status(400).json("Problem on Deleting");
    }
  } catch (error) {
    logger.error("Something went wrong");
    next(new CustomError());
    // return res.status(500).json(error);
  }
};

// get all orders
const allOrders = async (req, res, next) => {
  try {
    const allOrdersData = await orderModel.find();

    if (allOrdersData) {
      logger.info("Getting all Orders");
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Getting all Orders",
        orders: allOrdersData,
      });
    } else {
      logger.warn("Problem on fetching Orders");
      next(new CustomError("Problem on fetching Orders", 400));
      // return res.status(400).json("Problem on fetching");
    }
  } catch (error) {
    logger.error("Something went wrong");
    next(new CustomError());
    // return res.status(500).json(error);
  }
};

module.exports = { createOrders, updateOrder, deleteOrder, allOrders };
