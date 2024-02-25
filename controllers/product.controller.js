const bcrypt = require("bcrypt");

const productModel = require("../models/product.models");
const logger = require("../utils/winstonLog.utils.js");
const CustomError = require("../utils/customError.js");

// create product
const createProd = async (req, res) => {
  const { title, description, img, catagories, color, price, size } = req.body;

  try {
    const newProd = await productModel.create({
      title,
      description,
      img,
      catagories,
      color,
      price,
      size,
    });

    if (newProd != null) {
      logger.info("Product created Successfully");
      return res.status(201).json({
        status: 201,
        success: true,
        message: "Product created Successfully",
        product: newProd,
      });
    } else {
      logger.error("Problem on creating product");
      next(new CustomError("Problem on creating product", 400));
      // return res.status(400).json("Problem on creating product");
    }
  } catch (error) {
    logger.error("Something went wrong");
    next(new CustomError());
    // return res.status(500).json(error);
  }
};

// update product
const updateProd = async (req, res) => {
  const prodId = req.params.id;

  try {
    const updateProd = await productModel.findByIdAndUpdate(
      prodId,
      {
        $set: req.body,
      },
      { new: true, useFindAndModify: false }
    );

    if (updateProd) {
      logger.info("Product Updated Successfully");
      return res.status(202).json({
        status: 200,
        success: true,
        message: "Product Updated Successfully",
        product: updateProd,
      });
    } else {
      logger.warn("Problem on Upgrading");
      next(new CustomError("Problem on Upgrading", 400));
      // return res.status(400).json("Problem on Upgrading");
    }
  } catch (error) {
    logger.error("Something went wrong");
    next(new CustomError());
    // return res.status(500).json(error);
  }
};

// delete product
const deleteProd = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);

    logger.info("Product deleted Successfully");
    res.status(200).json({
      status: 200,
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (error) {
    logger.error("Something went wrong");
    next(new CustomError());
    // res.status(500).json(error);
  }
};

// All products
const allProd = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    var products;

    if (qNew) {
      logger.info("All new products");
      products = await productModel.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      logger.info("All products on Category");
      products = await productModel.find({
        catagories: {
          $in: [qCategory],
        },
      });
    } else {
      logger.info("All products");
      products = await productModel.find();
    }

    res.status(202).json({
      status: 200,
      success: true,
      message: "Products",
      products,
    });
  } catch (error) {
    logger.error("Something went wrong");
    next(new CustomError());
    // res.status(500).json(error);
  }
};

// find Prodct
const findProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (product) {
      logger.info("Product Details");
      res.status(200).json({
        status: 200,
        success: true,
        message: "Product Details",
        product,
      });
    } else {
      logger.warn("No product found");
      next(new CustomError("No product found", 400));
      // res.status(400).json("No product found");
    }
  } catch (error) {
    logger.error("Something went wrong");
    next(new CustomError());
    // res.status(500).json(error);
  }
};
module.exports = { createProd, updateProd, deleteProd, allProd, findProduct };
