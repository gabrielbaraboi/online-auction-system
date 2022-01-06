import axios from "axios";
import { authHeader } from "./auth.service";

const API_URL = "http://localhost:7055/auction";

export const getAllAuctions = async () => {
	try {
		const res = await axios.get(API_URL + "/getAllAuctions");
		return res;
	} catch (error) {
		throw error;
	}
};

export const getAuctionById = async (id) => {
	try {
		const res = await axios.get(API_URL + "/getAuctionById/" + id);
		return res;
	} catch (error) {
		throw error;
	}
};

export const getAuctionsByUserId = async (id) => {
	try {
		const res = await axios.get(API_URL + "/getAuctionsByUserId/" + id);
		return res;
	} catch (error) {
		throw error;
	}
};

export const createAuction = async (data) => {
	try {
		const res = await axios.post(API_URL + "/createAuction", data, {
			headers: authHeader(),
		});
		return res;
	} catch (error) {
		throw error;
	}
};

export const deleteAuctionById = async (id) => {
	try {
		const res = await axios.delete(API_URL + "/deleteAuctionById/" + id, {
			headers: authHeader(),
		});
		window.location.reload();
		return res;
	} catch (error) {
		throw error;
	}
};

export const updateAuctionById = async (id, data) => {
	try {
		const res = await axios.put(API_URL + "/updateAuctionById/" + id, data, {
				headers: authHeader(),
			},
		);
		window.location.reload();
		return res;
	} catch (error) {
		throw error;
	}
};
