import React, { useState } from "react";
import { useNavigate } from "react-router";
import RegisterValidationRules from "../../Services/Validation/RegisterValidationRules";
import { register } from "../../Services/auth.service";
import useForm from "../../Hooks/useForm";
import "./auth.css";

const Register = ({ onSubmit, authError }) => {
	const { values, errors, handleChange, handleSubmit } = useForm(
		sendData,
		RegisterValidationRules,
	);

	function sendData() {
		const data = {
			email: values.email,
			password: values.password,
			firstName: values.firstName,
			lastName: values.lastName,
		};
		onSubmit(data);
	}

	return (
		<div>
			<form className="form-signup" onSubmit={handleSubmit}>
				<h3 className="mb-3 font-weight-normal">Sign Up</h3>
				<div className="form-group">
					<div className="row">
						<div className="col">
							<input
								type="text"
								className={`form-control ${
									errors.firstName && "is-danger"
								}`}
								name="firstName"
								placeholder="First Name"
								required="required"
								onChange={handleChange}
								value={values.firstName || ""}
							/>
							{errors.firstName && (
								<p className="help is-danger">
									{errors.firstName}
								</p>
							)}
						</div>
						<div className="col">
							<input
								type="text"
								className={`form-control ${
									errors.lastName && "is-danger"
								}`}
								name="lastName"
								placeholder="Last Name"
								required="required"
								onChange={handleChange}
								value={values.lastName || ""}
							/>
							{errors.lastName && (
								<p className="help is-danger">
									{errors.lastName}
								</p>
							)}
						</div>
					</div>
				</div>
				<input
					type="email"
					className={`form-control ${
						errors.email && "is-danger"
					}`}
					placeholder="Email address"
					required="required"
					name="email"
					onChange={handleChange}
					value={values.email || ""}
				/>
				{errors.email && (
					<p className="help is-danger">{errors.email}</p>
				)}
				<input
					type="password"
					className={`form-control ${
						errors.password && "is-danger"
					}`}
					placeholder="Password"
					required="requied"
					name="password"
					onChange={handleChange}
					value={values.password || ""}
				/>
				{errors.password && (
					<p className="help is-danger">{errors.password}</p>
				)}
				<input
					type="password"
					className={`form-control ${
						errors.confirmPassword  && "is-danger"
					}`}
					placeholder="Confirm Password"
					required="required"
					onChange={handleChange}
					name="confirmPassword"
					value={values.confirmPassword || ""}
				/>
				{errors.confirmPassword && (
					<p className="help is-danger">{errors.confirmPassword}</p>
				)}
				<button className="btn btn-lg btn-primary" type="submit">
					Sign Up
				</button>
				<p className="help is-danger">{authError}</p>
				<p className="mt-5 mb-3 text-muted">© 2021</p>
			</form>
		</div>
	);
};

export default () => {
	const [authError, setAuthError] = useState(false);
	const history = useNavigate();

	const handleSubmit = async (data) => {
		register(data)
			.then(() => {
				history.push("/signin");
			})
			.catch((err) => {
				// setAuthError(err.response.data.message);
			});
	};

	return <Register onSubmit={handleSubmit} authError={authError} />;
};
