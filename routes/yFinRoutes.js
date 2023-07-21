const express = require('express');
const upload = require('../middleware/imgUpload')

const {
    graph
} = require('../controllers/y-finance');

const router = express.Router();

router.post('/graph',graph);

module.exports = router;