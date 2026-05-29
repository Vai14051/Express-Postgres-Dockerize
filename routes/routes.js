const express  = require("express");
const router  = express.Router();
const {createUser} =  require("../controllers/userController");

// router.get("/user",getAllUsers);
router.post("/createUser",createUser);
// router.get("/user/:id",getUserById);
// router.put("/user/:id",updateUser);


module.exports = router;
