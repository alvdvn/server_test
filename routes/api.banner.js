var express = require('express');
var router = express.Router();
const apiBanner = require('../controllers/api.banner.controller');
const multer =require('multer');
const upload =multer();
router.get('/getall',apiBanner.getApiBanner);
router.post('/addIMG',upload.single("IMG"),apiBanner.postIMG);

module.exports = router;
