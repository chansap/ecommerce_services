const bcrypt = require("bcrypt");

const userModel = require("../models/userModel");
const logger = require("../utils/winstonLog.utils.js");
const CustomError = require("../utils/customError.js");

const updateUser = async (req, res, next) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  try {
    const updatedUser = await userModel
      .findByIdAndUpdate(
        req.user.id,
        {
          $set: req.body,
        },
        { new: true, useFindAndModify: false }
      )
      .select({ __v: 0, password: 0 });

    if (updatedUser) {
      logger.info("User Details Updated Successfully");
      res.status(202).json({
        status: 202,
        success: true,
        message: "User Details Updated Successfully",
        user: updatedUser,
      });
    } else {
      logger.error("User Details can not be Updated");
      next(new CustomError("User Details can not be Updated", 400));
    }
  } catch (error) {
    logger.error("Something went wrong");
    next(new CustomError());

    // res.status(500).json({
    //   message: "Something went wrong",
    // });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userModel.findByIdAndDelete(req.user.id);
    logger.info("User deleted Successfully");
    res.status(200).json({
      status: 200,
      success: true,
      message: "User deleted Successfully",
    });
  } catch (error) {
    logger.error("Something went wrong");
    next(new CustomError());
    // res.status(500).json(error);
  }
};

const findUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (user) {
      const { password, __v, ...others } = user._doc;
      logger.info("User found");
      res.status(202).json({
        status: 202,
        success: true,
        message: "User found",
        user: others,
      });
    } else {
      logger.warn("User not found");
      next(new CustomError("User not found", 400));
    }
  } catch (error) {
    logger.error("Something went wrong");
    next(new CustomError());
    // res.status(500).json(error);
  }
};

const allUsers = async (req, res, next) => {
  const query = req.query.limit;
  try {
    const users = query
      ? await userModel.find().limit(parseInt(query))
      : await userModel.find().select({ password: 0, __v: 0 });

    logger.info("All users");
    res.status(202).json({
      status: 200,
      success: true,
      message: "All users",
      users,
    });
  } catch (error) {
    logger.error("Something went wrong");
    next(new CustomError());
  }
};

module.exports = { updateUser, deleteUser, findUser, allUsers };
