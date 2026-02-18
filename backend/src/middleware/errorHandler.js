function errorHandler(err, _req, res, _next) {
  console.error('[Error]', err.message);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      error: 'File too large. Maximum size is 10MB.',
    });
  }

  if (err.message && err.message.startsWith('Invalid file type')) {
    return res.status(415).json({
      error: err.message,
    });
  }

  if (err.status === 401 || err.code === 'invalid_api_key') {
    return res.status(500).json({
      error: 'Image analysis service configuration error.',
    });
  }

  if (err.status === 429) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Please try again in a moment.',
    });
  }

  res.status(500).json({
    error: 'An unexpected error occurred while analyzing the image.',
  });
}

module.exports = errorHandler;
