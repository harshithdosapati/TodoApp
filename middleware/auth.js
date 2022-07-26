const config = require('config');
const jwt = require('jsonwebtoken');

// Middleware function to authenticate users to access the private routes 
function auth(req, res, next) {
  const token = req.header('x-auth-token');
  const account_id = req.header('account_id');
  const account_name = req.header('account_name');

  if(!token) return res.status(401).json({msg: 'No token, Authorization denied'});

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
    req.account_id = account_id;
    req.account_name = account_name;
    next();

  } catch(e) {
    res.status(400).json({msg: 'Invalid Token'})
  }
}

module.exports = auth;