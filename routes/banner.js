var express = require('express');
var router = express.Router();
const bannerC = require('../controllers/banner.controller');
const authC = require('../middleware/auth.middleware');
const multer = require('multer');
const fileUpload = multer();



router.get('/add',authC.YeuCauDangNhap,bannerC.getFormAdd);
router.post('/add',authC.YeuCauDangNhap,fileUpload.single("anhbanner") ,bannerC.postAdd);
router.get('/list',authC.YeuCauDangNhap,bannerC.getFormList);
router.get('/edit/:id',authC.YeuCauDangNhap, bannerC.getFormEditBanner);
router.post('/edit/:id',authC.YeuCauDangNhap,fileUpload.single("anhbanner"), bannerC.postEdit);
router.get('/delete/:id',authC.YeuCauDangNhap, bannerC.postDel);

module.exports = router;
