const Auction = require('../models/Auction');

const createAuction = async (req, res) => {
    try {
        const { title, description, startPrice, endTime, minStep } = req.body;

        console.log(req.body);
        console.log(req.user);

        if (!(title && description && startPrice && endTime && minStep)) {
            return res.status(400).json({ message: "All inputs are required!" });
        }

        const auction = await Auction.create({
            title,
            description,
            startPrice,
            endTime,
            minStep,
            currentPrice: startPrice,
            owner: req.user._id
        });

        return res.status(200).json({ auction });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Create auction failed!" });
    }
};

const getAllAuctions = async (req, res) => {
    const result = {};

    try {
        result.auctions = await Auction.find({})
            .populate('owner', 'firstName lastName')
            .sort({ createdAt: -1 });

        if (result.auctions.length === 0) {
            return res.status(200).json({ message: "No auctions found!" });
        } else {
            return res.status(200).json(result);
        }
    } catch (err) {
        res.status(400).json({ message: "Get auctions failed!" });
        console.log(err);
    }
};

module.exports = {
    createAuction,
    getAllAuctions
};