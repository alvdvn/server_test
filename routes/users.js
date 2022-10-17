var express = require('express');
var router = express.Router();
var usercontroller =require('../controllers/user.controller');
var multer = require('multer');
const upload = multer({dest:'./tmp/'})


//list
router.get('/',usercontroller.getListUSer);
//get form add
router.get('/add',usercontroller.GetFormAddUser);
//get post add
router.post('/add' ,upload.single('avatar'),usercontroller.postAddUser);
//edit form
router.get('/edit/:id' ,usercontroller.getFormEditUser);
//edit post
router.post('/edit/:id',upload.single('avatar') ,usercontroller.getPostEditUser);
//delete get
router.get('/delete/:id', usercontroller.getFormDelete);





module.exports = router;
