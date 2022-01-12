import React from "react";
import { Link } from "react-router-dom";
import { isUserData, logout } from "../../Services/auth.service";

const NavBar = (props) => {
	const user = props.user;

	console.log(isUserData());

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<Link className="navbar-brand" to={"/"}>
					Online Auction
				</Link>
				<div className="collapse navbar-collapse" id="navbarsExample07">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<Link className="nav-link" to={"/"}>
								Home
							</Link>
						</li>
						{isUserData() ? (
							<li className="nav-item">
								<Link className="nav-link" to={"/new"}>
									New Auction
								</Link>
							</li>
						) : null}
						{isUserData() ? (
							<li className="nav-item">
								<Link className="nav-link" to={"/profile/" + user.id}>
									Profile
								</Link>
							</li>
						) : null}
						{isUserData() ? (
							<li className="nav-item">
								<Link
									className="nav-link"
									to={"/"}
									onClick={logout}
								>
									Logout
								</Link>
							</li>
						) : null}
						{!isUserData() ? (
							<>
								{" "}
								<li className="nav-item">
									<Link className="nav-link" to={"/signin"}>
										Sign In
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to={"/signup"}>
										Sign Up
									</Link>
								</li>
							</>
						) : null}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
