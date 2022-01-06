import React from "react";
import './auctions.css'

const AuctionCard = ({ auction }) => {
	return (
		<div className="col-md-4">
			<div className="card mb-4 box-shadow auction-card">
				<div className="card-img-top">
					<img src="https://picsum.photos/200/300" alt={auction?.title} />
				</div>
				<div className="card-body">
					<div className="card-title">{auction?.title}</div>
					<div className="card-text">{auction?.description}</div>
				</div>
				<div className="card-footer">
					<p className="card-text">
						<small className="text-muted">
							Price: {auction?.currentPrice}
						</small>
					</p>
				</div>
			</div>
		</div>
	);
};

export default AuctionCard;