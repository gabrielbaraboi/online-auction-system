import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login.component";
import Register from "./Components/Auth/Register.component";
import AllAuctions from "./Components/Auction/AllAuctions.component";
import AddAuction from "./Components/Auction/AddAuction.component";
import EditAuction from "./Components/Auction/EditAuction.component";
import NavBar from "./Components/Navbar/NavBar.component";
import "bootstrap/dist/css/bootstrap.min.css";
import RequireAuth from "./Components/RequireAuth.component";
import PublicRoute from "./Components/PublicRoute.component";
import AuthVerify, {
	logout,
	getCurrentUser,
	isUserData,
} from "./Services/auth.service";
import SingleAuction from "./Components/Auction/SingleAuction.component";
import Profile from "./Components/Profile/Profile.component";

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
					<Route
						path="/auction/:id"
						element={
							<SingleAuction user={user} />
						}
					/>
					<Route
						path="/auction/:id/edit"
						element={
							<RequireAuth redirectTo="/signin">
								<EditAuction user={user} />
							</RequireAuth>
						}
					/>
					<Route
						path="/profile/:id"
						element={
							<RequireAuth redirectTo="/signin">
								<Profile user={user} />
							</RequireAuth>
						}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;
