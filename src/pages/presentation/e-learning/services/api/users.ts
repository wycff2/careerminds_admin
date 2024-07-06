import axios from 'axios';
import { BaseUrl } from '../url';

export const getAllUsersApi = async (pageSize: any) => {
	const { pageNo, page } = pageSize;
	try {
		const resoponse = await axios.get(
			`${BaseUrl}User/getall?page_no=${pageNo}&page_size=${page}`,
		);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const uploadProfilePicture = async (data: any) => {
	const { image, id, config } = data;

	const formData = new FormData();
	formData.append('image', image);

	try {
		const response = await axios.post(`${BaseUrl}User/uploadImage/${id}`, formData, {
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

export const getByIdUser = async (userID: any) => {
	try {
		const resoponse = await axios.get(`${BaseUrl}User/getById/${userID}`);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const removeUser = async (removeId: any) => {
	try {
		const resoponse = await axios.delete(`${BaseUrl}User/remove/${removeId}`);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
