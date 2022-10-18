var express = require('express');
var router = express.Router();
const apiCategory = require('../controllers/api.categorys.controller');

router.get('/getall',apiCategory.getApiCategory);

module.exports = router;
