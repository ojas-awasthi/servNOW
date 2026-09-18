const express = require("express");

const transactionController = require("../controllers/transaction.controller");
const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");

const {
  createPaymentSchema,
  transactionIdSchema,
} = require("../validators/transaction.validator");

const router = express.Router();

// All transaction routes require customer authentication
router.use(protect, authorize("customer"));

// Mock payment
router.post(
  "/pay",
  validate(createPaymentSchema),
  transactionController.createPayment
);

// Get my transactions
router.get(
  "/",
  transactionController.getMyTransactions
);

// Get a specific transaction
router.get(
  "/:id",
  validate(transactionIdSchema),
  transactionController.getTransactionById
);

module.exports = router;