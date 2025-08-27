const searchfilterService = require('../service/searchfilter.service')

const filterCoursesController = async (req, res) => {
  try {
    const result = await searchfilterService.filterCourses(req.query);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Filter courses error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const searchCoursesController = async (req, res) => {
  try {
    const result = await searchfilterService.searchCourses(req.query);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Search courses error:', error);
    if (error.message === 'INVALID_QUERY') {
      return res.status(400).json({ success: false, error: 'Search query must be at least 2 characters long' });
    }
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

module.exports = {
    filterCoursesController,
    searchCoursesController
}