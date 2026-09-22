const searchService = require("../services/search.service");

const searchCRM = async (req, res, next) => {
  try {
    const results = await searchService.searchCRM(
      req.query.q,
      req.user
    );

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchCRM,
};