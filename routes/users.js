var express = require('express');
var router = express.Router();
var usercontroller =require('../controllers/user.controller');
var multer = require('multer');
const auth = require("../middleware/auth.middleware");
const upload = multer({dest:'./tmp/'})


//list
router.get('/',auth.YeuCauDangNhap,usercontroller.getListUSer);
//get form add
router.get('/add',auth.YeuCauDangNhap,usercontroller.GetFormAddUser);
//get post add
router.post('/add',auth.YeuCauDangNhap ,upload.single('avatar'),usercontroller.postAddUser);
//edit form
router.get('/edit/:id' ,usercontroller.getFormEditUser);
//edit post
router.post('/edit/:id',upload.single('avatar') ,usercontroller.getPostEditUser);
//delete get
router.get('/delete/:id', usercontroller.getFormDelete);





module.exports = router;
