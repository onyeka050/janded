const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userItemsController = require('../controllers/userItemsController');
const { authMiddleware } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Saved items validation
const saveItemValidation = [
  body('itemType')
    .isIn(['job', 'scholarship'])
    .withMessage('Item type must be "job" or "scholarship"'),
  body('itemId').isInt({ min: 1 }).withMessage('Valid item ID is required'),
  body('notes').optional().trim(),
  validate
];

// Application validation
const applicationValidation = [
  body('itemType')
    .isIn(['job', 'scholarship'])
    .withMessage('Item type must be "job" or "scholarship"'),
  body('itemId').isInt({ min: 1 }).withMessage('Valid item ID is required'),
  body('coverLetter').optional().trim(),
  body('resumeUrl').optional().isURL(),
  body('notes').optional().trim(),
  validate
];

// Saved Items Routes
router.post('/saved', authMiddleware, saveItemValidation, userItemsController.saveItem);
router.get('/saved', authMiddleware, userItemsController.getSavedItems);
router.delete('/saved/:id', authMiddleware, userItemsController.removeSavedItem);

// Applications Routes
router.post('/applications', authMiddleware, applicationValidation, userItemsController.createApplication);
router.get('/applications', authMiddleware, userItemsController.getApplications);
router.put('/applications/:id', authMiddleware, userItemsController.updateApplicationStatus);
router.delete('/applications/:id', authMiddleware, userItemsController.deleteApplication);

module.exports = router;
