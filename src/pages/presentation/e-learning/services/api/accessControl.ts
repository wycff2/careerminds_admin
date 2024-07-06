import axios from 'axios';
import { BaseUrl } from '../url';

// create role
export const createRoleApi = async (data: any) => {
	try {
		const resoponse = await axios.post(`${BaseUrl}roles/create`, data);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

// get role
export const getAllRoleApi = async (pageSize: any) => {
	const { pageNo, page } = pageSize;
	try {
		const resoponse = await axios.get(
			`${BaseUrl}roles/getall?page_no=${pageNo}&page_size=${page}`,
		);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

// update role
export const updateRoleApi = async (updateRequest: any) => {
	const { id, data } = updateRequest;
	try {
		const resoponse = await axios.put(`${BaseUrl}roles/update/${id}`, data);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

// delete role
export const deleteRoleApi = async (removeId: any) => {
	try {
		const resoponse = await axios.delete(`${BaseUrl}roles/deleteRole/${removeId}`);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
