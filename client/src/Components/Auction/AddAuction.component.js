import React, { useState } from "react";
import { useNavigate } from "react-router";
import useForm from "../../Hooks/useForm";
import AuctionValidationRules from "../../Services/Validation/AuctionValidationRules";
import { createAuction } from "../../Services/auction.service";
import Calendar from 'react-calendar';
import "./auctions.css";
import 'react-calendar/dist/Calendar.css';

const AddAuction = ({ onSubmit, auctionError }) => {
	const { values, errors, handleChange, handleSubmit } = useForm(
		sendData,
		AuctionValidationRules,
	);

	function sendData() {
		const data = {
			title: values.title,
			description: values.description,
			startPrice: values.startPrice,
			minStep: values.minStep,
			endTime: values.endTime
		};
		onSubmit(data);
	}

	return (
		<div>
			<form className="form-auction" onSubmit={handleSubmit}>
				<h3 className="mb-3 font-weight-normal">New Auction</h3>
				<input
					type="text"
					name="title"
					onChange={handleChange}
					className={`form-control ${errors.title && "is-danger"}`}
					placeholder="Title"
					value={values.title || ""}
				/>
				{errors.title && (
					<p className="help is-danger">{errors.title}</p>
				)}
				<input
					type="number"
					name="minStep"
					max="1000"
					min="1"
					onChange={handleChange}
					className={`form-control ${errors.minStep && "is-danger"}`}
					placeholder="Min Step"
					value={values.minStep || ""}
				/>
				{errors.minStep && (
					<p className="help is-danger">{errors.minStep}</p>
				)}
				<input
					type="number"
					name="startPrice"
					max="100000"
					min="1"
					onChange={handleChange}
					className={`form-control ${
						errors.startPrice && "is-danger"
					}`}
					placeholder="Start Price"
					value={values.startPrice || ""}
				/>
				{errors.startPrice && (
					<p className="help is-danger">{errors.startPrice}</p>
				)}
				<textarea
					type="text"
					name="description"
					onChange={handleChange}
					className={`form-control ${
						errors.description && "is-danger"
					}`}
					placeholder="Description"
					value={values.description || ""}
				/>
				{errors.description && (
					<p className="help is-danger">{errors.description}</p>
				)}
				<input
					type="date"
					name="endTime"
					onChange={handleChange}
					className={`form-control ${errors.endTime && "is-danger"}`}
					value={values.endTime || ""}
				/>
				{errors.endTime && (
					<p className="help is-danger">{errors.endTime}</p>
				)}

				{auctionError && (
					<p className="help is-danger">{auctionError}</p>
				)}
				<button className="btn btn-lg btn-primary" type="submit">
					Add Auction
				</button>
			</form>
		</div>
	);
};

export default () => {
	const [auctionError, setAuctionError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (data) => {
		createAuction(data)
			.then(() => {
				navigate("/");
				window.location.reload();
			})
			.catch((err) => {
				setAuctionError(err.response.data.message);
			});
	};

	return <AddAuction onSubmit={handleSubmit} auctionError={auctionError} />;
};
