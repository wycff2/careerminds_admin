import axios from 'axios';
import { BaseUrl } from '../url';

export const createEnrolment = async (data: any) => {
	try {
		const resoponse = await axios.post(`${BaseUrl}Enrolled/create`, data);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getAllEnrolment = async (pageSize: any) => {
	const { pageNo, page } = pageSize;
	try {
		const resoponse = await axios.get(
			`${BaseUrl}Enrolled/getall?page_no=${pageNo}&page_size=${page}`,
		);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};



export const updateEnrolment = async (data: any) => {
	const { id, values } = data;
	try {
		const resoponse = await axios.put(`${BaseUrl}Enrolled/update/${id}`, values);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};