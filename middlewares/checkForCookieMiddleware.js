const checkForCookieMiddleware = (req, res, next) => {
  if (!req.cookies.password) {
    return res.redirect("/login");
  } else {
    next();
  }
};

module.exports = {
  checkForCookieMiddleware,
};
