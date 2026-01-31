const jwt = require('jsonwebtoken');
const db = require('../config/database');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No authentication token provided' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const result = await db.query(
      'SELECT id, email, first_name, last_name, country, is_verified FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Attach user to request
    req.user = result.rows[0];
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid authentication token' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication token expired' 
      });
    }
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Authentication error' 
    });
  }
};

// Optional auth - doesn't fail if no token provided
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const result = await db.query(
        'SELECT id, email, first_name, last_name, country, is_verified FROM users WHERE id = $1',
        [decoded.userId]
      );
      if (result.rows.length > 0) {
        req.user = result.rows[0];
      }
    }
    next();
  } catch (error) {
    // Continue without user if token is invalid
    next();
  }
};

module.exports = { authMiddleware, optionalAuth };
