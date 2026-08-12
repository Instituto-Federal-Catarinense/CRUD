const crypto = require("crypto");

module.exports = function (req, res, next) {
  const safeMethods = ["GET", "HEAD", "OPTIONS"];

  if (!req.session) return next();

  if (safeMethods.includes(req.method)) {
    if (!req.session.csrfToken) {
      req.session.csrfToken = crypto.randomBytes(32).toString("hex");
    }
    res.locals.csrfToken = req.session.csrfToken;
    return next();
  }

  const token = req.body._csrf || req.headers["x-csrf-token"];
  if (!token || token !== req.session.csrfToken) {
    return res.status(403).send("Token CSRF inválido. Recarregue a página e tente novamente.");
  }
  next();
};
