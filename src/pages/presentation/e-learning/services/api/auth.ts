import axios from 'axios';
import { BaseUrl } from '../url';


export const createLogin = async (data: any) => {
	try {
		const resoponse = await axios.post(`${BaseUrl}User/login`, data);

		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const createAccount = async (data: any) => {
	try {
		const resoponse = await axios.post(`${BaseUrl}User/create`, data);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const changePassword = async (data: any) => {
	const { id, values } = data;
	try {
		const resoponse = await axios.put(`${BaseUrl}User/changePassword/${id}`, values);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
