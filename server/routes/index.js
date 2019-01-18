const express = require('express');
const router = express.Router();
const path = require('path');
const html = require('../public/views/index').default;

router.get('/', (req, res) => {
    res.send('<!DOCTYPE html>' + html)
});

module.exports = router;