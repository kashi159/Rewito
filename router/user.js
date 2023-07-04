const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/restaurant', userController.getRestaurants);
router.get('/details/:id', userController.getDetails);
router.post('/review/:id', userController.postReview);

module.exports = router;