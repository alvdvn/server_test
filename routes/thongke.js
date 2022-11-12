var express = require('express');
var router = express.Router();
const thongKeController = require('../controllers/thongke.controller');

router.get('/',thongKeController.getFormAdd);
router.get('/filterAmountByDay',thongKeController.getFilter)

module.exports = router;
