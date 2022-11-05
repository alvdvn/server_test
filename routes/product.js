var express = require('express');

const ProC = require('../controllers/product.controller');
const uploadC = require('../controllers/upload.controller');
const auth = require('../middleware/auth.middleware');
var router = express.Router();
const upload = require('../utils/multer');
const multer = require('multer');
const fileUpload = multer();


router.get('/list',auth.YeuCauDangNhap,ProC.getListProduct);
router.get('/add',auth.YeuCauDangNhap,ProC.getFormAddPro);
router.post('/add',auth.YeuCauDangNhap,fileUpload.single("img"), ProC.postAddPro);
router.get('/edit/:id',ProC.getFormEditPro);
router.post('/edit/:id',fileUpload.single('img'),ProC.postEditPro);
router.get('/del/:id',ProC.postDelPro);
router.get('/upload/:id',uploadC.getFormUpload);
router.post('/upload/:id',upload.array('anh_product',10),uploadC.postUpload);





module.exports = router;