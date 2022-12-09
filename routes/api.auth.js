var express = require('express');
var router = express.Router();
const apiAuth = require('../controllers/api.auth.controller');
const auth =require('../middleware/api.auth.middleware');
const multer = require('multer');
const fileUpload = multer();

router.post('/login', apiAuth.postLogin); //post login api
router.post('/register',fileUpload.single('avatar'), apiAuth.postReg); //post signup api
router.get('/profile',auth, apiAuth.getProfile);// get  profile api
router.get('/profileAdmin', apiAuth.getAdminProfile);// get  profile admin api
router.post('/logout',auth,apiAuth.postLogout ) ;// logout: đăng xuất
router.post('/logout-all',auth,apiAuth.postLogoutAll ) ;// logout: đăng xuất
router.put('/change-password',auth,apiAuth.putChangePassword); //change password api
router.post('/forgot-password',apiAuth.postForgotPassword);//sent forgot user link to rest password
router.put('/reset-password/:token',apiAuth.putResetPassword); //
router.put('/change-address',auth,apiAuth.putChangeAddress);//change address
router.put('/edits',auth,fileUpload.single('avatar') ,apiAuth.putEdit);
router.put('/edit-phone-number',auth,apiAuth.putEditPhone);
module.exports = router;