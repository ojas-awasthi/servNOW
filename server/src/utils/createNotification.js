const Notification = require("../models/Notification");

const createNotification = async ({
  user,
  title,
  message,
  type,
  relatedId = null,
}) => {
  return Notification.create({
    user,
    title,
    message,
    type,
    relatedId,
  });
};

module.exports = createNotification;