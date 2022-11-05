var express = require('express');
const cateControlller = require("../controllers/cate.controller");
var router = express.Router();
var multer = require('multer');
const fileUpload = multer();
const auth = require("../middleware/auth.middleware");


//get list category
router.get('/',auth.YeuCauDangNhap,cateControlller.getListCate);
//get Form add
router.get('/add',auth.YeuCauDangNhap,cateControlller.getFormAddCate);
//post add cate
router.post('/add',auth.YeuCauDangNhap,fileUpload.single('CateImg'),cateControlller.postAddCate);
//get Form updated cate
router.get('/edit/:id',cateControlller.getFormUpdateCate);
//post update cate
router.post('/edit/:id',fileUpload.single('CateImg'),cateControlller.postUpdateCate);
//delete
router.get('/delete/:id',cateControlller.getFormDelete);
module.exports = router;