import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import useForm from "../../Hooks/useForm";
import { getAuctionById, updateAuctionById } from "../../Services/auction.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./auctions.css";

const EditAuction = () => {
	const [auction, setAuction] = useState({});
	const [values, setValues] = useState({});
	const [auctionError, setAuctionError] = useState(null);
	const navigate = useNavigate();

	const { id } = useParams();

	const handleSubmit = () => {
		const data = {
			title: values.title,
			description: values.description,
			category: values.category,
			price: values.price,
			minStep: values.minStep,
		};
		if (values.endTime) {
			data.endTime = values.endTime;
		} else {
			data.endTime = auction.endTime;
		}
		updateAuctionById(id, data)
			.then(() => {
				navigate("/");
				window.location.reload();
			})
			.catch((err) => {
				setAuctionError(err.response.data.message);
			});
	};

	useEffect(() => {
		getAuctionById(id)
			.then((res) => {
				setAuction(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			<form className="form-auction" onSubmit={handleSubmit}>
				<h3 className="mb-3 font-weight-normal">Edit Auction</h3>
				<input
					type="text"
					name="title"
					onChange={(e) => {setValues({...values, title: e.target.value})}}
					className={`form-control`}
					placeholder="Title"
					value={values.title || auction.title}
				/>
				<input
					type="number"
					name="minStep"
					max="1000"
					min="1"
					onChange={(e) => {setValues({...values, minStep: e.target.value})}}
					className={`form-control`}
					placeholder="Min Step"
					value={values.minStep || auction.minStep}
				/>
				<input
					type="number"
					name="price"
					max="100000"
					min="1"
					onChange={(e) => {setValues({...values, price: e.target.value})}}
					className={`form-control`}
					placeholder="Start Price"
					value={values.price || auction.price}
				/>
				<textarea
					type="text"
					name="description"
					onChange={(e) => {setValues({...values, description: e.target.value})}}
					className={`form-control`}
					placeholder="Description"
					value={values.description || auction.description}
				/>
				<select
					name="category"
					onChange={(e) => {setValues({ ...values, category: e.target.value })}}
					className={`form-control`}
					value={values.category || auction.category}
				>
					<option value="">Select Category</option>
					<option value="art">Art</option>
					<option value="books">Books</option>
					<option value="clothing">Clothing</option>
					<option value="electronics">Electronics</option>
					<option value="furniture">Furniture</option>
					<option value="games">Games</option>
					<option value="music">Music</option>
					<option value="sports">Sports</option>
				</select>
				<DatePicker
					selected={values.endTime || ""}
					className="form-control"
					placeholderText="End Time"
					onChange={(date) => {setValues({ ...values, endTime: date })}}
					showTimeSelect
					dateFormat="MMMM d, yyyy h:mm aa"
				/>
				<button className="btn btn-lg btn-primary" type="submit">
					Add Auction
				</button>
				{auctionError && <p className="text-danger">{auctionError}</p>}
			</form>
		</div>
	);
};

export default EditAuction;
