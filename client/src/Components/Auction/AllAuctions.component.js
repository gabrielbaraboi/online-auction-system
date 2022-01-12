import React, { useState, useEffect } from "react";
import AuctionCard from "./AuctionCard.component";
import "./auctions.css";
import { getAllAuctions, getCategories } from "../../Services/auction.service";

const AllAuctions = (props) => {
	const [auctions, setAuctions] = useState([]);
	const [values, setValues] = useState({});
	const [page, setPage] = useState(1);
	const [nextPage, setNextPage] = useState(1);
	const [totalPages, setTotalPages] = useState();
	const [categories, setCategories] = useState([]);
	const user = props.user;

	const goNextPage = () => {
		if (nextPage) setPage(nextPage);
	};

	const goPrevPage = () => {
		if (page >= 2) setPage(page - 1);
	};

	const clear = () => {
		setValues({});
		setPage(1);
	};

	function handleChange(event) {
		setPage(1);
		event.persist();
		setValues((values) => ({
			...values,
			[event.target.name]: event.target.value,
		}));
	}

	useEffect(() => {
		getAllAuctions(page, values.category)
			.then((res) => {
				setAuctions(res.data.auctions);
				setNextPage(res.data.next);
				setTotalPages(res.data.total);
			})
			.catch((err) => {
				console.log(err);
				setAuctions([]);
				setTotalPages(1);
				setNextPage(1);
			});
	}, [page, values]);

	useEffect(() => {
		getCategories()
			.then((res) => {
				setCategories(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="all-auctions">
			<h3>All Auctions</h3>
			<div className="row">
				<div className="col-md-10">
					{auctions.length === 0 ? (
						<p>No auctions yet</p>
					) : (
						<>
							<div className="row">
								{auctions.map((auction, k) => (
									<AuctionCard
										auction={auction}
										key={auction?._id}
									/>
								))}
							</div>
							<div className="pagination-wrapper">
								<button
									className="btn btn-primary"
									disabled={page <= 1}
									onClick={goPrevPage}
								>
									&lt; Previous Page
								</button>
								<span>
									{page}/{totalPages ? totalPages : 1}
								</span>
								<button
									className="btn btn-primary"
									disabled={!nextPage}
									onClick={goNextPage}
								>
									Next Page &gt;
								</button>
							</div>
						</>
					)}
				</div>
				<div className="col-md-2">
					<div>
						<h3>Filter</h3>
						<div>
							<h4>Category</h4>
							{categories.map((category, k) => (
								<div key={k}>
									<input
										type="radio"
										id={(`category-`, k)}
										name="category"
										value={category}
										onChange={handleChange}
										checked={values.category === category}
									/>
									<label htmlFor={(`category-`, k)}>
										{category}
									</label>
									<div className="check" />
								</div>
							))}
						</div>
						<br />
						<button className="btn btn-primary" onClick={clear}>
							Clear
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllAuctions;
