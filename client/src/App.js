import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login.component";
import Register from "./Components/Auth/Register.component";
import AllAuctions from "./Components/Auction/AllAuctions.component";
import AddAuction from "./Components/Auction/AddAuction.component";
import NavBar from "./Components/Navbar/NavBar.component";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<>
			<NavBar />
			<div className="container">
				<Routes>
					<Route path="/" exact element={<AllAuctions />} />
					<Route path="/new" element={<AddAuction />} />
					<Route path="/signin" element={<Login />} />
					<Route path="/signup" element={<Register />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
