var express = require('express');
var router = express.Router();
var usercontroller =require('../controllers/user.controller');
const auth = require("../middleware/auth.middleware");
const multer = require('multer');
const fileUpload = multer();

//list
router.get('/',auth.YeuCauDangNhap,usercontroller.getListUSer);
//get form add
router.get('/add',auth.YeuCauDangNhap,usercontroller.GetFormAddUser);
//get post add
router.post('/add',auth.YeuCauDangNhap ,fileUpload.single('avatar'),usercontroller.postAddUser);
//edit form
router.get('/edit/:id' ,usercontroller.getFormEditUser);
//edit post
router.post('/edit/:id',fileUpload.single('avatar') ,usercontroller.getPostEditUser);
//delete get
router.get('/delete/:id', usercontroller.getFormDelete);


module.exports = router;
