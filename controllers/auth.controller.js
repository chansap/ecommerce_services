const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel.js");
const CustomError = require("../utils/customError.js");
const logger = require("../utils/winstonLog.utils.js");
const { createMail } = require("../utils/emails/createMail.js");

const authRegister = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    const chkUsr = await userModel.findOne({ email: email });

    if (chkUsr) {
      logger.error("User already exits");
      next(new CustomError("User already exits", 400));
    } else {
      let hashPwd = await bcrypt.hash(password, 10);

      const newUser = await userModel.create({
        userName: userName,
        email: email,
        password: hashPwd,
      });

      const neededUsr = {
        isAdmin: newUser.isAdmin,
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      };

      if (newUser) {
        await createMail(neededUsr.email);
        logger.info("User created Successfully");
        res.status(201).json({
          status: 201,
          success: true,
          message: "User created Successfully",
          user: neededUsr,
        });
      }
    }
  } catch (err) {
    console.log(err);
    logger.error("Problem on creating user");
    next(new CustomError());
  }
};

const authLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const findUsr = await userModel
      .findOne({ email: email })
      .select({ __v: 0 });

    if (findUsr) {
      const dryptPwd = await bcrypt.compare(password, findUsr.password);

      if (dryptPwd) {
        // For not showing Password
        const { password, ...others } = findUsr._doc;

        // Configuring JWT token
        const accesstoken = jwt.sign(
          {
            id: findUsr._id,
            admin: findUsr.isAdmin,
          },
          process.env.JWT_SCRT,
          { expiresIn: "3d" }
        );

        logger.info("Login Successful");
        res.status(200).json({
          status: 200,
          success: true,
          message: "Successfully login",
          user: { ...others, accesstoken },
        });
      } else {
        logger.error("Wrong password");
        next(new CustomError("Incorrect Password", 400));
      }
    } else {
      logger.error(next(new CustomError("User not Found", 400)));
    }
  } catch (err) {
    logger.error(next(new CustomError()));
  }
};

module.exports = {
  authRegister,
  authLogin,
};
