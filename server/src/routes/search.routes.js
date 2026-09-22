const express = require("express");

const searchController = require("../controllers/search.controller");
const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();

router.get(
  "/",
  protect,
  authorize("admin", "sales", "support"),
  searchController.searchCRM
);

module.exports = router;