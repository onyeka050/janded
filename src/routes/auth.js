const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Validation rules
const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain uppercase, lowercase, and number'),
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('country').optional().trim(),
  validate
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
];

const updateProfileValidation = [
  body('firstName').optional().trim().notEmpty(),
  body('lastName').optional().trim().notEmpty(),
  body('country').optional().trim(),
  body('phone').optional().trim(),
  body('bio').optional().trim(),
  body('linkedinUrl').optional().isURL().withMessage('Valid LinkedIn URL required'),
  validate
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain uppercase, lowercase, and number'),
  validate
];

// Routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.get('/me', authMiddleware, authController.getCurrentUser);
router.put('/profile', authMiddleware, updateProfileValidation, authController.updateProfile);
router.put('/change-password', authMiddleware, changePasswordValidation, authController.changePassword);
router.post('/forgot-password', 
  [body('email').isEmail().normalizeEmail(), validate],
  authController.requestPasswordReset
);
router.post('/reset-password',
  [
    body('token').notEmpty(),
    body('newPassword').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    validate
  ],
  authController.resetPassword
);

module.exports = router;
