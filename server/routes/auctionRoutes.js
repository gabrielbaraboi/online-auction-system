const express = require("express");
const router = express.Router();
const controller = require("../controllers/auction");
const auth = require("../middleware/auth");

router.post("/createAuction", auth, controller.createAuction);
router.get("/getAllAuctions", controller.getAllAuctions);

module.exports = router;