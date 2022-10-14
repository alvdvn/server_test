var express = require('express');
var router = express.Router();
const apiBanner = require('../controllers/api.banner.controller');

router.get('/getall',apiBanner.getApiBanner);

module.exports = router;
