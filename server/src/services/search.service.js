const User = require("../models/user");
const Service = require("../models/service");
const Booking = require("../models/booking");
const Lead = require("../models/lead");
const Transaction = require("../models/transaction");
const SupportTicket = require("../models/supportTicket");

const searchCRM = async (query, currentUser) => {
  const search = query?.trim();

  if (!search) {
    return {
      customers: [],
      providers: [],
      services: [],
      bookings: [],
      leads: [],
      transactions: [],
      tickets: [],
    };
  }

  const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

  /*
   * Admin has access to the complete CRM.
   */
  if (currentUser.role === "admin") {
    const [
      customers,
      providers,
      services,
      bookings,
      leads,
      transactions,
      tickets,
    ] = await Promise.all([
      User.find({
        role: "customer",
        $or: [
          { name: regex },
          { email: regex },
          { phone: regex },
        ],
      })
        .select("name email phone status avatar")
        .sort({ createdAt: -1 })
        .limit(5),

      User.find({
        role: "provider",
        $or: [
          { name: regex },
          { email: regex },
          { phone: regex },
        ],
      })
        .select("name email phone status avatar")
        .sort({ createdAt: -1 })
        .limit(5),

      Service.find({
        $or: [
          { title: regex },
          { description: regex },
        ],
      })
        .populate("category", "name")
        .populate("provider", "name email")
        .select("title price rating status category provider")
        .sort({ createdAt: -1 })
        .limit(5),

      Booking.find({
        $or: [
          { address: regex },
          { notes: regex },
        ],
      })
        .populate("customer", "name email")
        .populate("provider", "name email")
        .populate("service", "title")
        .select(
          "customer provider service bookingDate amount status paymentStatus address"
        )
        .sort({ createdAt: -1 })
        .limit(5),

      Lead.find({
        $or: [
          { name: regex },
          { email: regex },
          { phone: regex },
          { notes: regex },
        ],
      })
        .populate("serviceInterest", "title")
        .populate("assignedTo", "name email")
        .select(
          "name email phone status priority serviceInterest assignedTo"
        )
        .sort({ createdAt: -1 })
        .limit(5),

      Transaction.find({
        transactionId: regex,
      })
        .populate("customer", "name email")
        .populate({
          path: "booking",
          select: "service bookingDate",
          populate: {
            path: "service",
            select: "title",
          },
        })
        .select(
          "transactionId customer booking amount paymentMethod status paidAt"
        )
        .sort({ createdAt: -1 })
        .limit(5),

      SupportTicket.find({
        $or: [
          { subject: regex },
          { description: regex },
        ],
      })
        .populate("customer", "name email")
        .populate("assignedTo", "name email")
        .select(
          "subject description customer assignedTo priority status category"
        )
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    return {
      customers,
      providers,
      services,
      bookings,
      leads,
      transactions,
      tickets,
    };
  }

  /*
   * Sales users should only receive lead data.
   * This preserves the existing role boundary.
   */
  if (currentUser.role === "sales") {
    const leads = await Lead.find({
      $or: [
        { name: regex },
        { email: regex },
        { phone: regex },
        { notes: regex },
      ],
    })
      .populate("serviceInterest", "title")
      .populate("assignedTo", "name email")
      .select(
        "name email phone status priority serviceInterest assignedTo"
      )
      .sort({ createdAt: -1 })
      .limit(10);

    return {
      customers: [],
      providers: [],
      services: [],
      bookings: [],
      leads,
      transactions: [],
      tickets: [],
    };
  }

  /*
   * Support users should only receive support-ticket data.
   * This preserves the existing role boundary.
   */
  if (currentUser.role === "support") {
    const tickets = await SupportTicket.find({
      $or: [
        { subject: regex },
        { description: regex },
      ],
    })
      .populate("customer", "name email")
      .populate("assignedTo", "name email")
      .select(
        "subject description customer assignedTo priority status category"
      )
      .sort({ createdAt: -1 })
      .limit(10);

    return {
      customers: [],
      providers: [],
      services: [],
      bookings: [],
      leads: [],
      transactions: [],
      tickets,
    };
  }

  return {
    customers: [],
    providers: [],
    services: [],
    bookings: [],
    leads: [],
    transactions: [],
    tickets: [],
  };
};

module.exports = {
  searchCRM,
};