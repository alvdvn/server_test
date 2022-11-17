var express = require('express');
var router = express.Router();
const thongKeController = require('../controllers/thongke.controller');

router.get('/',thongKeController.getFormAdd);
//get day
router.get('/filterAmountByDay',thongKeController.getFilter);
//get month
router.get('/filterAmountByMonth',thongKeController.getFilterMonth);
//get year (not done)
router.get('/filterAmountMonthtoYear',thongKeController.getFilterMonthtoYear);
//get all status order
router.get('/filterPendingOrder',thongKeController.getfilterStatusOrder);
//get all income order
router.get('/filterIncome',thongKeController.getfilterIncome);




module.exports = router;
