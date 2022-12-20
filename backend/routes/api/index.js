const router = require("express").Router();

router.get("/csrf/restore", (req, res, next) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

router.post("/test", (req, res, next) => {
  res.json({
    requestBody: req.body,
  });
});

//**** TEST AUTH Middlewares int utils/auth.js ****//
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");

const { User } = require("../../db/models");

router.get("/set-token-cookie", async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: "Demo-lition",
    },
  });

  setTokenCookie(res, user);

  return res.json({ user });
});

router.get("/restore-user", restoreUser, (req, res) => {
  return res.json(req.user);
});

router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});
//**** TEST AUTH Middlewares int utils/auth.js ****//

module.exports = router;
