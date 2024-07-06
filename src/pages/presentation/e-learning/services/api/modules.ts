import axios from 'axios';
import { BaseUrl } from '../url';

export const createCourseModule = async (data: any) => {
	try {
		const resoponse = await axios.post(`${BaseUrl}CourseModule/create`, data);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getAllCourseModule = async (pageSize: any) => {
	const { pageNo, page } = pageSize;
	try {
		const resoponse = await axios.get(
			`${BaseUrl}CourseModule/getall?page_no=${pageNo}&page_size=${page}`,
		);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const removeCourseModule = async (removeId: any) => {
	try {
		const resoponse = await axios.delete(`${BaseUrl}CourseModule/remove/${removeId}`);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const updateCourseModule = async (data: any) => {
	console.log('data api', data)
	const { id, values } = data;
	try {
		const resoponse = await axios.put(`${BaseUrl}CourseModule/update/${id}`, values);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getByIdCourseModule = async (id: any) => {
	try {
		const resoponse = await axios.get(`${BaseUrl}CourseModule/getById/${id}`);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getCourseModulesByCategoryApi = async (id: any) => {
	try {
		const resoponse = await axios.get(`${BaseUrl}CourseModule/getByCourseId/${id}`);
		return resoponse;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const updatethumbCourseModule = async (data: any) => {
	const { image, id, config } = data;

	const formData = new FormData();
	formData.append('image', image);

	try {
		const response = await axios.post(`${BaseUrl}CourseModule/uploadImage/${id}`, formData, {
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

export const updateVideothumbCourseModule = async (data: any) => {
	const { thumbnail, id, config } = data;
	console.log('thumbnail', thumbnail);

	const formData = new FormData();
	formData.append('thumbnail', thumbnail);

	try {
		const response = await axios.post(
			`${BaseUrl}CourseModule/uploadThumbnail/${id}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: config,
			},
		);
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	}
};


export const updateVideoCourseModule = async (data: any) => {
	const { video, id, config } = data;

	const formData = new FormData();
	formData.append('video', video);

	try {
		const response = await axios.post(`${BaseUrl}CourseModule/uploadVideo/${id}`, formData, {
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
