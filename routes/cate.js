var express = require('express');
const cateControlller = require("../controllers/cate.controller");
var router = express.Router();
var multer = require('multer');
const auth = require("../middleware/auth.middleware");
const upload = multer({dest:'./tmp/'})


//get list category
router.get('/',auth.YeuCauDangNhap,cateControlller.getListCate);
//get Form add
router.get('/add',auth.YeuCauDangNhap,cateControlller.getFormAddCate);
//post add cate
router.post('/add',auth.YeuCauDangNhap,upload.single('CateImg'),cateControlller.postAddCate);
//get Form updated cate
router.get('/edit/:id',cateControlller.getFormUpdateCate);
//post update cate
router.post('/edit/:id',upload.single('CateImg'),cateControlller.postUpdateCate);
//delete
router.get('/delete/:id',cateControlller.getFormDelete);
module.exports = router;