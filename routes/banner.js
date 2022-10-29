var express = require('express');
var router = express.Router();
const bannerC = require('../controllers/banner.controller');
const uploadC = require('../controllers/upload.controller');

var multer = require('multer');
const upload = multer({dest:'./tmp/'})
/* GET users listing. */

router.get('/add',bannerC.getFormAdd);
router.post('/add',upload.single("anhbanner") ,bannerC.postAdd);
router.get('/list',bannerC.getFormList);
router.get('/edit/:id', bannerC.getFormEditBanner);
router.post('/edit/:id',upload.single("anhbanner"), bannerC.postEdit);
router.get('/delete/:id', bannerC.postDel);



module.exports = router;
