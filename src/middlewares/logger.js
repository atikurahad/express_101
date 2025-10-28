//Activity logger middleware

const activityLogger = (req, res, next) => {
  const timestamp = new Date().toDateString();
  console.log(`[${timestamp}] , ${req.method} ${req.url}`);
  next();
};

module.exports = activityLogger;
