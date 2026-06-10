const router = require('express').Router();
const { getDashboardSummaryHandler } = require('../controllers/dashboardController');

router.get('/', getDashboardSummaryHandler);

module.exports = router;