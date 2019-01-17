const express = require('express');
const router = express.Router();
const path = require('path');
const stuff = require('../public/views/index');

console.log(stuff);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/index.html'))
});

module.exports = router;