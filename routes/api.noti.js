var express = require('express');
var router = express.Router();
const apiNoti = require('../controllers/api.notification.controller');
const multer =require('multer');
const upload =multer();
router.get('/getall',apiNoti.getAllNoti);

module.exports = router;
