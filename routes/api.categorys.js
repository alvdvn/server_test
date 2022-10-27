var express = require('express');
var router = express.Router();
const apiCategory = require('../controllers/api.categorys.controller');

router.get('/getall',apiCategory.getApiCategory);
router.get('/getall/:id',apiCategory.getAllProductByCategory);

module.exports = router;
