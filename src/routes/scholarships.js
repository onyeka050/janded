const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const scholarshipsController = require('../controllers/scholarshipsController');
const { authMiddleware, optionalAuth } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Scholarship validation
const scholarshipValidation = [
  body('name').trim().notEmpty().withMessage('Scholarship name is required'),
  body('organization').trim().notEmpty().withMessage('Organization is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('country').trim().notEmpty().withMessage('Country is required'),
  body('level').trim().notEmpty().withMessage('Level is required'),
  body('fundingType').trim().notEmpty().withMessage('Funding type is required'),
  body('deadline').isDate().withMessage('Valid deadline date is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('fields').optional().isArray(),
  body('benefits').optional().isArray(),
  body('eligibility').optional().isArray(),
  validate
];

// Public routes
router.get('/', optionalAuth, scholarshipsController.getScholarships);
router.get('/levels', scholarshipsController.getLevels);
router.get('/countries', scholarshipsController.getCountries);
router.get('/:id', optionalAuth, scholarshipsController.getScholarshipById);

// Protected routes
router.post('/', authMiddleware, scholarshipValidation, scholarshipsController.createScholarship);
router.put('/:id', authMiddleware, scholarshipsController.updateScholarship);
router.delete('/:id', authMiddleware, scholarshipsController.deleteScholarship);

module.exports = router;
