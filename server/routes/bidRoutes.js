const express = require("express");
const router = express.Router();
const controller = require("../controllers/bid");
const auth = require("../middleware/auth");

router.post("/createBid", auth, controller.createBid);
router.get("/getLastBidByAuctionId/:id", controller.getLastBidByAuctionId);
router.get("/getBidsByAuctionId/:id", controller.getBidsByAuctionId);

exports = module.exports = router;