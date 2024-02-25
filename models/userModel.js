const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // createdAt :  Date.now
  },
  { timestamps: true }
);

const userModel = Mongoose.model("User", UserSchema);

module.exports = userModel;
