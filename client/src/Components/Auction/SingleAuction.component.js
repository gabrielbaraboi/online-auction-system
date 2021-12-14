import React from "react";

const SingleAuction = ({ auction }) => {
	return (
		<div className="auction-container">
			<div className="auction-image">
				<img src={auction.image} alt={auction.title} />
			</div>
			<div className="auction-info">
				<div className="auction-title">{auction.title}</div>
				<div className="auction-price">{auction.price}</div>
				<div className="auction-description">{auction.description}</div>
			</div>
		</div>
	);
};

export default SingleAuction;
