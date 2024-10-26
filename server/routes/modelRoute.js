const express = require('express');
const router = express.Router();
const {getResponse}=require('../controllers/modelController');
router.post('/', getResponse);

module.exports = router;