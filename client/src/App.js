import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login.component";
import Register from "./Components/Auth/Register.component";
import AllAuctions from "./Components/Auction/AllAuctions.component";
import AddAuction from "./Components/Auction/AddAuction.component";
import NavBar from "./Components/Navbar/NavBar.component";
import "bootstrap/dist/css/bootstrap.min.css";
import RequireAuth from "./Components/RequireAuth.component";
import PublicRoute from "./Components/PublicRoute.component";
import AuthVerify, {
	logout,
	getCurrentUser,
	isUserData,
} from "./Services/auth.service";

function App() {
	const [user, setUser] = useState({});

	useEffect(() => {
		const userData = getCurrentUser();
		if (isUserData(userData)) {
			AuthVerify();
			setUser(userData);
		}
	}, []);

	return (
		<>
			<NavBar user={user} />
			<div className="container">
				<Routes>
					<Route path="/" exact element={<AllAuctions user={user} />} />
					<Route
						path="/new"
						element={
							<RequireAuth redirectTo="/signin">
								<AddAuction user={user} />
							</RequireAuth>
						}
					/>
					<Route
						path="/signin"
						element={
							<PublicRoute redirectTo="/">
								<Login />
							</PublicRoute>
						}
					/>
					<Route
						path="/signup"
						element={
							<PublicRoute redirectTo="/">
								<Register />
							</PublicRoute>
						}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;
