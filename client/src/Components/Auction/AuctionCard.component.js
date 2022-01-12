import React from "react";
import { Link } from "react-router-dom";
import "./auctions.css";
import Countdown from "react-countdown";
import countdownRenderer from "../../utils/countdown.component";

const AuctionCard = ({ auction }) => {
	return (
		<div className="col-md-5">
			<div className="card box-shadow auction-card">
				<div className="card-img-top">
					<img
						src="https://picsum.photos/200/300"
						alt={auction?.title}
					/>
				</div>
				<div className="card-body">
					<div className="card-title">
						<Link to={"/auction/" + auction?._id}>
							{auction?.title}
						</Link>
					</div>
					<div className="card-text">{auction?.description}</div>
				</div>
				<div className="card-footer">
					<p className="card-text">
						<small className="text-muted">
							Price: {auction?.price}
						</small>
						<br />
						<Countdown
							date={new Date(auction.endTime)}
							renderer={countdownRenderer}
						/>
					</p>
				</div>
			</div>
		</div>
	);
};

export default AuctionCard;
