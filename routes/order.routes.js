const router = require("express").Router();

const {
  createOrders,
  updateOrder,
  deleteOrder,
  allOrders,
} = require("../controllers/order.controller");

const {
  verifyUser,
  verifyUserAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyuser.middleware");

// Create Order
router.post("/create", verifyUser, createOrders);

// Update Order
router.put("/update", [verifyUser, verifyUserAdmin], updateOrder);

// Delete Order
router.delete("/delete/:orderId", [verifyUser, verifyUserAdmin], deleteOrder);

// All Order
router.get("/", [verifyUser, verifyUserAdmin], allOrders);

module.exports = router;
