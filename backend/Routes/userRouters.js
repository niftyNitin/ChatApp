const express= require("express")
const {protect}= require("../middleware/authMiddleware")
const {registerUser,authUser,allUsers,updateUser} = require("../controllers/userControllers")
const router = express.Router();

router.route('/').post(registerUser).get(protect,allUsers).put(protect,updateUser);
router.post('/login',authUser);

module.exports= router;