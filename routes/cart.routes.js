const router = require("express").Router();

const {
  createCart,
  updateCart,
  deleteCartItems,
  allCartItems,
  cartItemForAllUser,
} = require("../controllers/cart.controller");

const {
  verifyUser,
  verifyUserAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyuser.middleware");

// create cart
router.post("/create", verifyUser, createCart);

// Update product
router.put(
  "/update/:id",
  [verifyUser, verifyTokenAndAuthorization],
  updateCart
);

// Delete product
router.delete(
  "/delete/:id",
  [verifyUser, verifyTokenAndAuthorization],
  deleteCartItems
);

// All Product
router.get("/", verifyUser, allCartItems);

// All carts for Admin
// router.get("/", [verifyUser, verifyUserAdmin], cartItemForAllUser);

module.exports = router;
