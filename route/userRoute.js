const { register, login,setAvatar,allUserRoute } = require("../controller/userController");

const router = require('express').Router();
router.post("/register",register);
router.post("/login",login);
router.post("/setAvatar/:id",setAvatar);
router.get("/allUserRoute/:id",allUserRoute);
module.exports = router;