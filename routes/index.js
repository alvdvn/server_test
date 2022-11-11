var express = require('express');
const authController = require("../controllers/auth.controller");
const auth =require('../middleware/auth.middleware');
var router = express.Router();


router.get('/',auth.ChuaDangNhap,authController.getFormLogin);
router.post('/',auth.ChuaDangNhap,authController.postLogin);
router.get('/account',auth.YeuCauDangNhap, authController.getProfileUser);
router.get('/logout',auth.YeuCauDangNhap, authController.getLogOut);
router.get("/reset-password/:token",authController.postResetPassword)
module.exports = router;
