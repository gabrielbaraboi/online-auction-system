const Auction = require("../models/Auction");
const auctionsPerPage = 3;
const KEYS_TO_EXCLUDE = ["page"];

const createAuction = async (req, res) => {
	try {
		const { title, description, category, price, endTime, minStep } =
			req.body;

		if (
			!(title && description && category && price && endTime && minStep)
		) {
			return res
				.status(400)
				.json({ message: "All inputs are required!" });
		}

		const auction = await Auction.create({
			title,
			description,
			category,
			startPrice: price,
			price,
			endTime,
			minStep,
			owner: req.user._id,
		});

		return res.status(200).json({ auction });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: "Create auction failed!" });
	}
};

const getAllAuctions = async (req, res) => {
	const filterParams = req.query;
	const page = parseInt(req.query.page);
	const startIndex = (page - 1) * auctionsPerPage;
	const endIndex = page * auctionsPerPage;
	const result = {};

	try {
		result.auctions = await Auction.find(getQuery(filterParams))
			.populate("owner", "firstName lastName")
			.sort({ createdAt: -1 })
			.skip(startIndex)
			.limit(auctionsPerPage);

		if (result.auctions.length === 0) {
			return res.status(200).json({ message: "No auctions found!" });
		} else {
			const count = await Auction.countDocuments(getQuery(filterParams));
			if (startIndex > 0) result.previous = page - 1;
			if (endIndex < count) result.next = page + 1;
			result.total = Math.ceil(count / auctionsPerPage);
			return res.status(200).json(result);
		}
	} catch (err) {
		res.status(400).json({ message: "Get auctions failed!" });
		console.log(err);
	}
};

const getAuctionById = async (req, res) => {
	try {
		const auction = await Auction.findById(req.params.id).populate(
			"owner",
			"_id firstName lastName",
		);

		if (!auction) {
			return res.status(400).json({ message: "Auction not found!" });
		} else {
			return res.status(200).json(auction);
		}
	} catch (err) {
		res.status(400).json({ message: "Get auction failed!" });
		console.log(err);
	}
};

const getAuctionsByUserId = async (req, res) => {
	try {
		const id = req.params.id;
		const auctions = await Auction.find({ owner: id })
			.populate("owner", "firstName lastName")
			.sort({ createdAt: -1 });

		if (auctions.length === 0) {
			return res.status(200).json({ message: "No auctions found!" });
		} else {
			return res.status(200).json(auctions);
		}
	} catch (err) {
		res.status(400).json({ message: "Get auctions failed!" });
		console.log(err);
	}
};

const getCategories = async (req, res) => {
	try {
		const categories = await Auction.distinct("category");

		if (!categories) {
			return res.status(400).json({ message: "No categories found!" });
		} else {
			return res.status(200).json(categories);
		}
	} catch (err) {
		res.status(400).json({ message: "Get categories failed!" });
		console.log(err);
	}
};

const updateAuction = async (req, res) => {
	try {
		console.log(req.body);
		const auction = await Auction.findById(req.params.id).exec();

		if (!auction) {
			return res.status(400).json({ message: "Auction not found!" });
		} else {
			await Auction.findByIdAndUpdate(
				req.params.id,
				req.body,
				(err, updatedAuction) => {
					if (err)
						res.status(400).json({ message: "Failed to update auction!" });
					res.status(200).json(updatedAuction);
				}
			);
		}
	} catch (err) {
		res.status(400).json({ message: "Update auction failed!" });
		console.log(err);
	}
};

function getQuery(params) {
	const keys = Object.keys(params).filter(
		(key) => !KEYS_TO_EXCLUDE.includes(key),
	);
	const query = {};

	keys.forEach((key) => {
		query[key] = { $eq: params[key] };
	});

	return query;
}

module.exports = {
	createAuction,
	getAllAuctions,
	getAuctionById,
	getCategories,
	updateAuction,
	getAuctionsByUserId,
};
