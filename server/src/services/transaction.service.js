const mongoose = require("mongoose");
const crypto = require("crypto");

const Transaction = require("../models/Transaction");
const Booking = require("../models/Booking");
const ApiError = require("../utils/ApiError");
const createNotification = require("../utils/createNotification");

const createPayment = async (userId, data) => {
  const { booking, paymentMethod } = data;

  if (!mongoose.Types.ObjectId.isValid(booking)) {
    throw new ApiError(400, "Invalid booking ID");
  }

  const bookingExists = await Booking.findOne({
    _id: booking,
    customer: userId,
  });

  if (!bookingExists) {
    throw new ApiError(
      404,
      "Booking not found or does not belong to you"
    );
  }

  if (bookingExists.status === "cancelled") {
    throw new ApiError(
      400,
      "Payment cannot be made for a cancelled booking"
    );
  }

  if (bookingExists.paymentStatus === "paid") {
    throw new ApiError(
      409,
      "Booking has already been paid"
    );
  }

  const transactionId = `TXN-${Date.now()}-${crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase()}`;

  const transaction = await Transaction.create({
    booking: bookingExists._id,
    customer: userId,
    transactionId,
    amount: bookingExists.amount,
    paymentMethod,
    status: "success",
    paidAt: new Date(),
  });

  bookingExists.paymentStatus = "paid";
  await bookingExists.save();

  await createNotification({
    user: userId,
    title: "Payment successful",
    message: `Payment of ₹${bookingExists.amount} was completed successfully.`,
    type: "payment",
    relatedId: bookingExists._id,
  });

  return Transaction.findById(transaction._id)
    .populate("booking")
    .populate("customer", "name email phone");
};

const getMyTransactions = async (userId, query) => {
  const { status } = query;

  const filter = {
    customer: userId,
  };

  if (status) {
    filter.status = status;
  }

  return Transaction.find(filter)
    .populate("booking", "service bookingDate amount status")
    .sort({ createdAt: -1 });
};

const getTransactionById = async (userId, transactionId) => {
  if (!mongoose.Types.ObjectId.isValid(transactionId)) {
    throw new ApiError(400, "Invalid transaction ID");
  }

  const transaction = await Transaction.findOne({
    _id: transactionId,
    customer: userId,
  })
    .populate("booking")
    .populate("customer", "name email phone");

  if (!transaction) {
    throw new ApiError(404, "Transaction not found");
  }

  return transaction;
};

module.exports = {
  createPayment,
  getMyTransactions,
  getTransactionById,
};