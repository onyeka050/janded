const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const jobsController = require('../controllers/jobsController');
const { authMiddleware, optionalAuth } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Job creation validation
const jobValidation = [
  body('title').trim().notEmpty().withMessage('Job title is required'),
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('country').trim().notEmpty().withMessage('Country is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('visaSponsored').optional().isBoolean(),
  body('requirements').optional().isArray(),
  body('benefits').optional().isArray(),
  validate
];

// Public routes
router.get('/', optionalAuth, jobsController.getJobs);
router.get('/categories', jobsController.getCategories);
router.get('/countries', jobsController.getCountries);
router.get('/:id', optionalAuth, jobsController.getJobById);

// Protected routes (require authentication)
router.post('/', authMiddleware, jobValidation, jobsController.createJob);
router.put('/:id', authMiddleware, jobsController.updateJob);
router.delete('/:id', authMiddleware, jobsController.deleteJob);

module.exports = router;
