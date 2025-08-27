const express = require('express');
const router = express.Router();
const { searchCoursesController ,filterCoursesController} = require('../controllers/searchfilter.controller');

router.get('/search', searchCoursesController);
router.get('/filter', filterCoursesController);

module.exports = router;
