const Auction = require("../models/Auction");

const checkOwnership = async (req, res, next) => {
    const auctionId = req.params.id;

    try {
        const auction = await Auction.findById(auctionId).populate("owner", "_id").exec();


        if (auction.owner._id.toString() !== req.user._id.toString()) {
            console.log("Auction owner id: " + auction.owner._id);
            return res.status(401).json({ message: "You are not authorized to edit this auction!" });
        }

        next();
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Check ownership failed!" });
    }
}

module.exports = checkOwnership;