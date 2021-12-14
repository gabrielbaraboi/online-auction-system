import React, { useState } from "react";
import { useNavigate } from "react-router";
import useForm from "../../Hooks/useForm";
import LoginValidationRules from "../../Services/Validation/LoginValidationRules";
import { login } from "../../Services/auth.service";
import "./auth.css";

const Login = ({ onSubmit, authError }) => {
	const { values, errors, handleChange, handleSubmit } = useForm(
		sendData,
		LoginValidationRules,
	);

	function sendData() {
		const data = {
			email: values.email,
			password: values.password,
		};
		onSubmit(data);
	}

	return (
		<div>
			<form className="form-signin" onSubmit={handleSubmit}>
				<h3 className="mb-3 font-weight-normal">Sign In</h3>
				<input
					type="email"
					name="email"
					onChange={handleChange} 
					className={`form-control ${errors.email && "is-danger"}`}
					placeholder="Email address"
					value={values.email || ""}
				/>
				{errors.email && (
					<p className="help is-danger">{errors.email}</p>
				)}
				<input
					type="password"
					name="password"
					onChange={handleChange} 
					className={`form-control ${errors.password && "is-danger"}`}
					onChange={handleChange}
					placeholder="Password"
					value={values.password || ""}
				/>
				{errors.password && (
					<p className="help is-danger">{errors.password}</p>
				)}
				<button className="btn btn-lg btn-primary" type="submit">
					Sign in
				</button>
				<p className="mt-5 mb-3 text-muted">© 2021</p>
			</form>
		</div>
	);
};

export default () => {
    const [authError, setAuthError] = useState('');
    const history = useNavigate();

    const handleSubmit = data => {
        login(data)
            .then(() => {
                history.push("/");
                window.location.reload();
            })
            .catch(err => {
                // setAuthError(err.response.data.message)
            });
    };

    return <Login onSubmit={handleSubmit} authError={authError} />
};