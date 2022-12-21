const express = require("express");
const router = express.Router();
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

// login route for existing user
router.post("/", async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = ["The provided credentials were invalid."];
    return next(err);
  }

  await setTokenCookie(res, user);

  return res.json({
    user,
  });
});

// logout route
router.delete("/", (_req, res) => {
  res.clearCookie("token");

  return res.json({
    message: "success",
  });
});

// restore session for user. This route explicitly uses restoreUser middleware
// from auth to retrieve whose user the current token cookie belongs to.
router.get("/", restoreUser, (req, res) => {
  const { user } = req;

  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  } else {
    return res.json({});
  }
});

module.exports = router;
