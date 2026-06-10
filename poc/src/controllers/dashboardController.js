const { getDashboardSummary } = require('../services/dashboardService');

async function getDashboardSummaryHandler(req, res) {
  try {
    const summary = await getDashboardSummary();
    return res.status(200).json(summary);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { getDashboardSummaryHandler };