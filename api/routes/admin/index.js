const express = require("express");
const router = express.Router();

const isLoggedIn = require("../../middleware/isLoggedIn");
const isAdmin = require("../../middleware/isAdmin");

const BlockUser = require("./blockuser");
const VerifyUser = require("./verifyuser");

router.post("/verifyuser", isLoggedIn, isAdmin, VerifyUser);
router.post("/blockuser", isLoggedIn, isAdmin, BlockUser);

module.exports = router;
