const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/imageDetail');

router.post('/upload-image', uploadImage);

module.exports = router;
