const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const miscController = require('../controllers/miscController');
const validate = require('../middleware/validate');

// Visa Sponsors Routes
router.get('/visa-sponsors', miscController.getVisaSponsors);
router.get('/visa-sponsors/:id', miscController.getVisaSponsorById);

// Newsletter Routes
router.post('/newsletter/subscribe',
  [body('email').isEmail().normalizeEmail(), validate],
  miscController.subscribeNewsletter
);
router.post('/newsletter/unsubscribe',
  [body('email').isEmail().normalizeEmail(), validate],
  miscController.unsubscribeNewsletter
);
router.get('/newsletter/stats', miscController.getNewsletterStats);

module.exports = router;
