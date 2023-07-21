const express = require('express');
const upload = require('../middleware/imgUpload')

const {
    signup,
    login
} = require('../controllers/auth');

const router = express.Router();

router.post('/signup',upload.single('file'),signup);
router.post('/login',upload.single('file'),login);

module.exports = router;