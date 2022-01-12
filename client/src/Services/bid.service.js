import axios from "axios";
import { authHeader } from "./auth.service";

const API_URL = "http://localhost:7055/bid";

export const getBidsByAuctionId = async (id) => {
	try {
		const res = await axios.get(API_URL + "/getBidsByAuctionId/" + id);
		return res;
	} catch (error) {
		throw error;
	}
};

export const getBidsByUserId = async (id) => {
	try {
		const res = await axios.get(API_URL + "/getBidsByUserId/" + id);
		return res;
	} catch (error) {
		throw error;
	}
};

export const getBidById = async (id) => {
	try {
		const res = await axios.get(API_URL + "/getBidById/" + id);
		return res;
	} catch (error) {
		throw error;
	}
};

export const createBid = async (data) => {
	try {
		const res = await axios.post(API_URL + "/createBid", data, {
			headers: authHeader(),
		});
		return res;
	} catch (error) {
		throw error;
	}
};

export const getLastBidByAuctionId = async (id) => {
	try {
		const res = await axios.get(API_URL + "/getLastBidByAuctionId/" + id);
		return res;
	} catch (error) {
		throw error;
	}
};
