var express = require('express');
var router = express.Router();
const notiC = require('../controllers/noti.controller');
const authC = require('../middleware/auth.middleware');
const multer = require('multer');
const fileUpload = multer();

router.get('/',authC.YeuCauDangNhap,notiC.getNoti);
router.get('/add',authC.YeuCauDangNhap,notiC.getAddNoti);
router.post('/add',authC.YeuCauDangNhap, notiC.sendNoti);
router.get('/edit/:id',authC.YeuCauDangNhap, notiC.getFormEditNoti);
router.post('/edit/:id',authC.YeuCauDangNhap, notiC.postEditNoti);
router.get('/delete/:id',authC.YeuCauDangNhap, notiC.postDel);


module.exports = router;
