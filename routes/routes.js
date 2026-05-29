const express  = require("express");
const router  = express.Router();
const {createUser} =  require("../controllers/userController");
const validateUser = require("../middlewares/inputValidator");

// router.get("/user",getAllUsers);
router.post("/createUser",validateUser,createUser);
// router.get("/user/:id",getUserById);
// router.put("/user/:id",updateUser);


module.exports = router;
