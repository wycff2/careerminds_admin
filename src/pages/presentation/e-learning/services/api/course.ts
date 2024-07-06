import axios from 'axios';
import { BaseUrl } from '../url';

export const createCategory = async (data: any) => {
	try {
		const resoponse = await axios.post(`${BaseUrl}Course/create`, data);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getAllCategory = async (pageSize: any) => {
	const { pageNo, page } = pageSize;
	try {
		const resoponse = await axios.get(
			`${BaseUrl}Course/getall?page_no=${pageNo}&page_size=${page}`,
		);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const removeCategory = async (removeId: any) => {
	try {
		const resoponse = await axios.delete(`${BaseUrl}Course/remove/${removeId}`);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const updateCategory = async (data: any) => {
	const { id, values } = data;
	try {
		const resoponse = await axios.put(`${BaseUrl}Course/update/${id}`, values);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getByIdCategory = async (id: any) => {
	try {
		const resoponse = await axios.get(`${BaseUrl}Course/getById/${id}`);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const updatethumbCategory = async (data: any) => {
	const { image, id, config } = data;

	const formData = new FormData();
	formData.append('image', image);

	try {
		const response = await axios.post(`${BaseUrl}Course/uploadImage/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			onUploadProgress: config,
		});
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	}
};


