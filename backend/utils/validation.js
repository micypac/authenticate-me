const { validationResult } = require("express-validators");

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(res);

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
