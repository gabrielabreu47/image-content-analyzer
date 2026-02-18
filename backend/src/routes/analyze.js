const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadValidator');
const { analyzeImage } = require('../services/openaiService');

router.post('/analyze', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No image file provided. Please upload an image.',
      });
    }

    const result = await analyzeImage(req.file.buffer, req.file.mimetype);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
