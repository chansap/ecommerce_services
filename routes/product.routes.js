const router = require("express").Router();

const {
  createProd,
  updateProd,
  deleteProd,
  allProd,
  findProduct,
} = require("../controllers/product.controller");

const {
  verifyUser,
  verifyUserAdmin,
} = require("../middlewares/verifyuser.middleware");

// create products
router.post("/create", [verifyUser, verifyUserAdmin], createProd);

// Update product
router.post("/update/:id", [verifyUser, verifyUserAdmin], updateProd);

// Delete product
router.delete("/delete/:id", [verifyUser, verifyUserAdmin], deleteProd);

// All Product
router.get("/", verifyUser, allProd);

// Get Product
router.get("/:id", verifyUser, findProduct);

module.exports = router;
