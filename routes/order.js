var express = require('express');
var router = express.Router();
var orderC = require('../controllers/order.controller');
const authC = require("../middleware/auth.middleware");


router.get('/listorder',authC.YeuCauDangNhap,orderC.getFormlistOrder);
router.get('/listorderByStatus/:status',authC.YeuCauDangNhap,orderC.getFormlistOrderByStatus);
router.get('/detail/:id',authC.YeuCauDangNhap,orderC.getFormDetaiOrder);
router.post('/detail/:id',authC.YeuCauDangNhap,orderC.PostDetailOrder);
router.get('/delete/:id',authC.YeuCauDangNhap,orderC.postDeleteOrder);



module.exports = router;
