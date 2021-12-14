import React from "react";
import './auctions.css'

const AuctionCard = ({ auction }) => {
	return (
		<div className="col-md-4">
			<div className="card mb-4 box-shadow auction-card">
				<div className="card-img-top">
					<img src={auction?.image} alt={auction?.title} />
				</div>
				<div className="card-body">
					<div className="card-title">{auction?.title}</div>
					<div className="card-text">{auction?.description}</div>
				</div>
				<div className="card-footer">
					<p class="card-text">
						<small class="text-muted">
							Price: {auction?.price}
						</small>
					</p>
				</div>
			</div>
		</div>
	);
};

export default AuctionCard;
