const express = require('express');
const router = express.Router();
const { uploadImage,getAllImages } = require('../controllers/imageDetail');

router.post('/upload-image', uploadImage);
router.get('/get-all-images', getAllImages);

module.exports = router;
