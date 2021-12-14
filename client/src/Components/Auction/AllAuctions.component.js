import React, { useState, useEffect } from "react";
import AuctionCard from "./AuctionCard.component";
import {
    logout,
    getCurrentUser,
    isUserData,
} from "../../Services/auth.service";
import "./auctions.css";

const AllAuctions = () => {
	// const [auctions, setAuctions] = useState([]);
	const [user, setUser] = useState({});

    useEffect(() => {
        const userData = getCurrentUser();
        setUser(userData);
    }, []);

	const auctions = [
		{
			_id: 1,
			title: "Auction 1",
			description: "This is the first auction",
			image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
			price: "100",
		},
		{
			_id: 2,
			title: "Auction 2",
			description: "This is the first auction",
			image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
			price: "100",
		},
		{
			_id: 3,
			title: "Auction 3",
			description: "This is the first auction",
			image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
			price: "100",
		},
        {
            _id: 4,
            title: "Auction 4",
            description: "This is the first auction",
            image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
            price: "100",
        },
	];

	return (
		<div className="all-auctions">
			<h3>All Auctions</h3>
			<p>Hello {user.firstName}</p>
			<div className="row">
				{auctions.map((auction, k) => (
					<AuctionCard auction={auction} key={auction?._id} />
				))}
			</div>
		</div>
	);
};

export default AllAuctions;
