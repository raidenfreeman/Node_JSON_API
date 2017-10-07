const express = require('express');
const router = express.Router();
const debug = require('debug')('ln');

// Do work here
router.get('/', (req, res) => {
  debug('%O',req);
  res.send('Hey! It works!');
});

module.exports = router;
