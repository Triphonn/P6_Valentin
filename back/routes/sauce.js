const express = require('express');
const router = express.Router();

const sauces = require('../controllers/sauce');
const like = require('../controllers/like');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Create and modify sauces
router.get('/', auth, sauces.getAllSauces);
router.post('/', auth, multer, sauces.createSauce);
router.get('/:id', auth, sauces.getOneSauce);
router.put('/:id', auth, multer, sauces.modifySauce);
router.delete('/:id', auth, sauces.deleteSauce);

//Like and dislike
router.post('/:id/like', auth, like.likeSauce);

module.exports = router;
