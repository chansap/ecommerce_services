const router = require("express").Router();

const {
  verifyUser,
  verifyTokenAndAuthorization,
  verifyUserAdmin,
} = require("../middlewares/verifyuser.middleware");

const {
  updateUser,
  deleteUser,
  findUser,
  allUsers,
} = require("../controllers/user.controller");

// Update the user
router.put("/:id", [verifyUser, verifyTokenAndAuthorization], updateUser);

// Delete user
router.delete("/:id", [verifyUser, verifyTokenAndAuthorization], deleteUser);

// Get all users
router.get("/users", [verifyUser, verifyUserAdmin], allUsers);

// Get User
router.get("/find/:id", [verifyUser, verifyUserAdmin], findUser);

module.exports = router;
