const getPagination = (page = 1, limit = 10) => {
  const currentPage = Math.max(Number(page) || 1, 1);
  const pageLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);

  const skip = (currentPage - 1) * pageLimit;

  return {
    page: currentPage,
    limit: pageLimit,
    skip,
  };
};

module.exports = getPagination;