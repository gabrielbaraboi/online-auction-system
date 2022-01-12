const Bid = require("../models/Bid");
const Auction = require("../models/Auction");

const createBid = async (req, res) => {
	try {
		const { amount, auction } = req.body;

		const auctionId = auction;

		if (!amount) {
			return res.status(400).json({ message: "Amount is required!" });
		}

		const bid = await Bid.create({
			amount,
			user: req.user._id,
			auction: auctionId,
		});

		if (bid) {
			const auction = await Auction.findById(auctionId).exec();

			if (auction) {
				await Auction.findByIdAndUpdate(
					{ _id: auctionId },
					{ price: amount },
				);
			}
			return res.status(200).json({ bid });
		}

		return res.status(200).json({ bid });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: "Create bid failed!" });
	}
};

const getLastBidByAuctionId = async (req, res) => {
	const auctionId = req.params.id;

	try {
		const bid = await Bid.findOne({ auction: auctionId })
			.sort({
				createdAt: -1,
			})
			.populate("user", "firstName lastName");

		if (!bid) {
			return res.status(400).json({ message: "No bids found!" });
		} else {
			return res.status(200).json(bid);
		}
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: "Get bids failed!" });
	}
};

const getBidsByAuctionId = async (req, res) => {
	const auctionId = req.params.id;

	try {
		const bids = await Bid.find({ auction: auctionId })
			.sort({ createdAt: -1 })
			.populate("user", "firstName lastName");

		if (!bids) {
			return res.status(400).json({ message: "No bids found!" });
		} else {
			return res.status(200).json(bids);
		}
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: "Get bids failed!" });
	}
};

module.exports = {
	createBid,
	getLastBidByAuctionId,
	getBidsByAuctionId,
};
