import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuctionById } from "../../Services/auction.service";
import {
	createBid,
	getBidsByAuctionId,
	getLastBidByAuctionId,
} from "../../Services/bid.service";
import "./auctions.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Countdown from "react-countdown";
import countdownRenderer from "../../utils/countdown.component";
import { isUserData } from "../../Services/auth.service";

const SingleAuction = (props) => {
	const { id } = useParams();
	const [auction, setAuction] = useState({});
	const [price, setPrice] = useState(0);
	const [minPrice, setMinPrice] = useState(0);
	const [bids, setBids] = useState([]);
	const user = props.user;
	const [isOwnerOfAuction, setIsOwnerOfAuction] = useState(false);
	const [isEnded, setIsEnded] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(isUserData);
	const [lastBid, setLastBid] = useState({});

	useEffect(() => {
		getAuctionById(id)
			.then((res) => {
				setAuction(res.data);
				setPrice(res.data.price);
				setMinPrice(res.data.price);
				setIsEnded(
					Date.now() < new Date(res.data.endTime).getTime()
						? false
						: true,
				);
				if (user) {
					setIsOwnerOfAuction(
						user.id === res.data.owner._id ? true : false,
					);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		getBidsByAuctionId(id)
			.then((res) => {
				setBids(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [bids]);

	useEffect(() => {
		getLastBidByAuctionId(id)
			.then((res) => {
				setLastBid(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handlePlusClick = () => {
		setPrice(price + auction?.minStep);
	};

	const handleMinusClick = () => {
		setPrice(price - auction?.minStep);
	};

	const handleBidClick = () => {
		const data = {
			amount: price,
			auction: id,
		};
		if (
			isAuthenticated &&
			!isEnded &&
			price > minPrice &&
			!isOwnerOfAuction
		) {
			setBids([
				...bids,
				{
					amount: price,
					auction: id,
					user: {
						firstName: user.firstName,
						lastName: user.lastName,
					},
				},
			]);
			createBid(data)
				.then((res) => {
					setAuction({ ...auction, price: price });
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<div className="container page">
			<div className="row">
				<div className="col-md-7">
					<div className="auction-information">
						<h3>{auction?.title}</h3>
						<div className="auction-images">
							<Carousel
								showThumbs={false}
								showStatus={false}
								infiniteLoop={true}
								autoPlay={true}
								stopOnHover={true}
								interval={3000}
							>
								{/* {auction?.images.map((image, k) => (
									<div key={k}>
										<img src={image} alt="auction" />
									</div>
								))} */}
								<img
									src={
										auction?.image
											? auction?.image
											: "https://picsum.photos/300"
									}
									alt="auction"
								/>
								<img
									src={
										auction?.image
											? auction?.image
											: "https://picsum.photos/200"
									}
									alt="auction"
								/>
							</Carousel>
						</div>
						<div className="auction-owner">
							<strong>Owner:</strong>
							<p>
								{auction?.owner?.firstName +
									" " +
									auction?.owner?.lastName}
							</p>
						</div>
						<div className="auction-description">
							<strong>Description:</strong>
							<p>{auction?.description}</p>
						</div>
					</div>
				</div>
				<div className="col-md-5">
					<div className="auction-bids">
						<h3>Bids</h3>
						<div className="auction-bids-information">
							<div className="auction-bids-information-item">
								<strong>Start price:</strong>
								<p>{auction?.startPrice}</p>
							</div>
							<div className="auction-bids-information-item">
								<strong>Price:</strong>
								<p>{auction?.price}</p>
							</div>
							<div className="auction-bids-information-item">
								<strong>Min step:</strong>
								<p>{auction?.minStep}</p>
							</div>
							<div className="auction-bids-information-item">
								<strong>End date:</strong>
								<p>
									<Countdown
										date={new Date(auction.endTime)}
										renderer={countdownRenderer}
									/>
								</p>
							</div>
						</div>
						<div className="bids">
							{bids.map((bid) => (
								<div className="bid-item" key={bid._id}>
									<span>
										{bid.user.firstName +
											" " +
											bid.user.lastName}
									</span>
									<span>{bid.amount}</span>
								</div>
							))}
						</div>

						{isAuthenticated ? (
							!isEnded ? (
								!isOwnerOfAuction ? (
									<div className="bid">
										<div className="bid-price">
											<button
												className="btn btn-primary"
												onClick={handleMinusClick}
												disabled={
													price - auction.minStep <
													minPrice
												}
											>
												-
											</button>
											<div className="bid-price">
												{price + auction.minStep}
											</div>
											<button
												className="btn btn-primary"
												onClick={handlePlusClick}
											>
												+
											</button>
										</div>
										<button
											className="btn btn-primary"
											onClick={handleBidClick}
										>
											Make Bid
										</button>
									</div>
								) : (
									<span>
										You are the owner of this auction!
									</span>
								)
							) : (
								<span>Auction has closed!</span>
							)
						) : (
							<span>You must be logged in to make a bid!</span>
						)}
						{isEnded && lastBid && (
							<div className="winner">
								<h3>Winner</h3>
								<div className="winner-information">
									<div className="winner-information-item">
										<strong>Name:</strong>
										<p>
											{lastBid?.user?.firstName +
												" " +
												lastBid?.user?.lastName}
										</p>
									</div>
									<div className="winner-information-item">
										<strong>Amount:</strong>
										<p>{lastBid?.amount}</p>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleAuction;
