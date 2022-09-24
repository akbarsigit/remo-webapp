const express = require('express');
const rentalController = require('../controllers/rentalController');

const router = express.Router();

// Creates a New Rental
router.route('/').post(rentalController.createRental);

// Update spesific rental
router.route("/:id").put(rentalController.update);

// Deletes rental by ID
router.route('/:id').delete(rentalController.deleteRental);

// Get all rental
router.get('/', rentalController.findAll);

// Get spesific rental by Id
router.get('/:id', rentalController.findById);

module.exports = router;
