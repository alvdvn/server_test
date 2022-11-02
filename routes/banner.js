var express = require('express');
var router = express.Router();
const bannerC = require('../controllers/banner.controller');
const uploadC = require('../controllers/upload.controller');
const authC = require('../middleware/auth.middleware');

var multer = require('multer');
const upload = multer({dest:'./tmp/'})
/* GET users listing. */

router.get('/add',authC.YeuCauDangNhap,bannerC.getFormAdd);
router.post('/add',authC.YeuCauDangNhap,upload.single("anhbanner") ,bannerC.postAdd);
router.get('/list',authC.YeuCauDangNhap,bannerC.getFormList);
router.get('/edit/:id',authC.YeuCauDangNhap, bannerC.getFormEditBanner);
router.post('/edit/:id',authC.YeuCauDangNhap,upload.single("anhbanner"), bannerC.postEdit);
router.get('/delete/:id',authC.YeuCauDangNhap, bannerC.postDel);



module.exports = router;
