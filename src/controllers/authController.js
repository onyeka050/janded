const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const crypto = require('crypto');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// Register new user
exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, country } = req.body;

    // Check if user exists
    const existingUser = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create user
    const result = await db.query(
      `INSERT INTO users (email, password, first_name, last_name, country, verification_token)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, email, first_name, last_name, country, is_verified`,
      [email.toLowerCase(), hashedPassword, firstName, lastName, country, verificationToken]
    );

    const user = result.rows[0];

    // Generate token
    const token = generateToken(user.id);

    // TODO: Send verification email with verificationToken

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          country: user.country,
          isVerified: user.is_verified
        },
        token
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = result.rows[0];

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          country: user.country,
          isVerified: user.is_verified,
          profilePicture: user.profile_picture
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, email, first_name, last_name, country, phone, bio, 
              profile_picture, resume_url, linkedin_url, is_verified, created_at
       FROM users WHERE id = $1`,
      [req.user.id]
    );

    const user = result.rows[0];

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        country: user.country,
        phone: user.phone,
        bio: user.bio,
        profilePicture: user.profile_picture,
        resumeUrl: user.resume_url,
        linkedinUrl: user.linkedin_url,
        isVerified: user.is_verified,
        memberSince: user.created_at
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user data'
    });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, country, phone, bio, linkedinUrl } = req.body;

    const result = await db.query(
      `UPDATE users 
       SET first_name = $1, last_name = $2, country = $3, phone = $4, 
           bio = $5, linkedin_url = $6, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING id, email, first_name, last_name, country, phone, bio, 
                 linkedin_url, is_verified`,
      [firstName, lastName, country, phone, bio, linkedinUrl, req.user.id]
    );

    const user = result.rows[0];

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        country: user.country,
        phone: user.phone,
        bio: user.bio,
        linkedinUrl: user.linkedin_url,
        isVerified: user.is_verified
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const result = await db.query(
      'SELECT password FROM users WHERE id = $1',
      [req.user.id]
    );

    const user = result.rows[0];

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await db.query(
      'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [hashedPassword, req.user.id]
    );

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password'
    });
  }
};

// Request password reset
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      // Don't reveal if email exists
      return res.json({
        success: true,
        message: 'If your email is registered, you will receive a password reset link'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await db.query(
      'UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE id = $3',
      [resetToken, resetTokenExpiry, result.rows[0].id]
    );

    // TODO: Send password reset email with resetToken

    res.json({
      success: true,
      message: 'If your email is registered, you will receive a password reset link'
    });
  } catch (error) {
    console.error('Request password reset error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process password reset request'
    });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const result = await db.query(
      'SELECT id FROM users WHERE reset_token = $1 AND reset_token_expiry > NOW()',
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await db.query(
      `UPDATE users 
       SET password = $1, reset_token = NULL, reset_token_expiry = NULL, 
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      [hashedPassword, result.rows[0].id]
    );

    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password'
    });
  }
};
