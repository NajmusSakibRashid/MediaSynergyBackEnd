const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authentication");
const contentRouter = require("./user-routers/content");
const profileRouter = require("./user-routers/profile");
// const notificationRouter = require("./user-routers/notifications");
// const communityRouter = require("./user-routers/community");
// const User = require("../models/User");
// const authMiddleware=require('../middlewares/authentication');
// const contentRouter=require('./user-routers/content');
// const profileRouter=require('./user-routers/profile');
const notificationRouter = require("./user-routers/notifications");
const buildProfileRouter = require("./user-routers/build-profile");
const fetchProfileRouter = require("./user-routers/fetchProfile");
const communityRouter = require("./user-routers/community");
const User = require("../models/User");

router.use(authMiddleware);

router.get("/", async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(400).send({ error: "User not found" });
  res.send({ user });
});

const authenticateToken = require("../middlewares/authentication");

// Endpoint to fetch user ID
router.get("/getUserId", authenticateToken, (req, res) => {
  // The user ID should be available in req.user from the authentication middleware
  console.log(req.json);

  const userId = req.user.id;
  res.json({ userId });
  console.log(res);
  console.log("Fetching user ID called -> User ID: ", userId);
});

router.get("/getUser/:userId", async (req, res) => {
  // The user ID should be available in req.user from the authentication middleware
  console.log("fetching user name");

  // fetch user from database
  const user = await User.findById(req.params.userId);
  res.json(user);
  // console.log(res);
  console.log("Fetching user called -> User: ", user);
});

router.use("/content", contentRouter);
router.use("/profile", profileRouter);
router.use("/notifications", notificationRouter);
router.use("/communities", communityRouter);
router.get("/", async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(400).send({ error: "User not found" });
  res.send({ user });
});

router.use("/content", contentRouter);
router.use("/profile", profileRouter);
router.use("/notifications", notificationRouter);
router.use("/build-profile", buildProfileRouter);
router.use("/fetch-profile", fetchProfileRouter);
router.use("/communities", communityRouter);

module.exports = router;
