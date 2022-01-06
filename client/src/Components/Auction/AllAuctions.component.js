import React, { useState, useEffect } from "react";
import AuctionCard from "./AuctionCard.component";
import "./auctions.css";
import { getAllAuctions } from "../../Services/auction.service";

const AllAuctions = (props) => {
	const [auctions, setAuctions] = useState([]);
	const user = props.user;

	useEffect(() => {
		getAllAuctions()
			.then((res) => {
				setAuctions(res.data.auctions);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="all-auctions">
			<h3>All Auctions</h3>
			<div className="row">
				{auctions.length === 0 ? (
					<p>No auctions yet</p>
				) : (
					auctions.map((auction, k) => (
						<AuctionCard auction={auction} key={auction?._id} />
					))
				)}
			</div>
		</div>
	);
};

export default AllAuctions;
