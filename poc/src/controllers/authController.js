const authService = require('../services/authService');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
        code: 'VALIDATION_ERROR'
      });
    }

    const result = await authService.login(email, password);

    res.json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { login };