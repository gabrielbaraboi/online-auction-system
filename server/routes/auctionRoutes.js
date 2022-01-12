const express = require("express");
const router = express.Router();
const controller = require("../controllers/auction");
const auth = require("../middleware/auth");
const checkOwnership = require("../middleware/checkOwnership");

router.post("/createAuction", auth, controller.createAuction);
router.get("/getAllAuctions", controller.getAllAuctions);
router.get("/getAuctionById/:id", controller.getAuctionById);
router.get("/getCategories", controller.getCategories);
router.put("/updateAuctionById/:id", auth, checkOwnership, controller.updateAuction);
router.get("/getAuctionsByUserId/:id", controller.getAuctionsByUserId);

module.exports = router;