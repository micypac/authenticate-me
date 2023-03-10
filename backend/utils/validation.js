const { validationResult } = require("express-validator");

// middleware for formatting errors from express-validator
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    const err = new Error("Bad request.");
    err.title = "Bad request.";
    err.status = 400;
    err.errors = errors;

    next(err);
  }

  next();
};

module.exports = {
  handleValidationErrors,
};
