import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuctionsByUserId } from "../../Services/auction.service";
import { Link } from "react-router-dom";
import "./profile.css";

const Profile = (props) => {
	const [auctions, setAuctions] = useState([]);
	const { id } = useParams();
	const user = props.user;

	useEffect(() => {
		getAuctionsByUserId(id)
			.then((res) => {
				setAuctions(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="profile">
						<h4>Hello, {user.firstName + " " + user.lastName}</h4>
						<h5>Your auctions:</h5>
						<div className="auctions">
							<table class="table">
								<thead>
									<tr>
										<th scope="col">Title</th>
										<th scope="col">Price</th>
										<th scope="col">Minimum Step</th>
										<th scope="col">Edit</th>
									</tr>
								</thead>
								<tbody>
									{auctions.map((auction) => (
										<tr key={auction._id}>
											<td>
												<Link
													to={
														"/auction/" +
														auction._id
													}
												>
													{auction.title}
												</Link>
											</td>
											<td>{auction.price}</td>
											<td>{auction.minStep}</td>

											<td>
												<Link
													to={
														"/auction/" +
														auction._id +
														"/edit"
													}
												>
													Edit
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
