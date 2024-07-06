import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
	createCourseModule,
	getAllCourseModule,
	getByIdCourseModule,
	getCourseModulesByCategoryApi,
	removeCourseModule,
	updateCourseModule,
	updatethumbCourseModule,
} from '../api/modules';

interface UserState {
	courseModule: any;
	courseModules: any[];
	loading: boolean;
	error: any;
}

interface RemoveModalState {
	isOpen: boolean;
	idToRemove: any;
}

const initialRemoveModalState: RemoveModalState = {
	isOpen: false,
	idToRemove: null,
};

const initialState: UserState = {
	courseModule: null,
	courseModules: [],
	loading: false,
	error: null,
};

// Generalized async thunk function
const AsyncFunctionThunk = (name: string, apiFunction: any) => {
	return createAsyncThunk<any, any>(
		`courseModule/${name}`,
		async (data: any, { rejectWithValue }) => {
			try {
				const response: AxiosResponse<any, any> = await apiFunction(data);
				return response.data;
			} catch (error: any) {
				console.error(`Failed to ${name}:`, error);
				if (error.response && error.response.data) {
					return rejectWithValue(error.response.data);
				}
				return rejectWithValue({ error: error.message });
			}
		},
	);
};

// Define async thunks for each operation
export const createCourseModuleSlice = AsyncFunctionThunk('createCourseModule', createCourseModule);
export const getAllCourseModuleSlice = AsyncFunctionThunk('getAllCourseModule', getAllCourseModule);
export const removeCourseModuleSlice = AsyncFunctionThunk('removeCourseModule', removeCourseModule);
export const updateCourseModuleSlice = AsyncFunctionThunk('updateCourseModule', updateCourseModule);
export const getByIdCourseModuleSlice = AsyncFunctionThunk(
	'getByIdCourseModule',
	getByIdCourseModule,
);
export const getCourseModulesByCategorySlice = AsyncFunctionThunk(
	'getCourseModulesByCategoryApi',
	getCourseModulesByCategoryApi,
);
export const uploadThumbCourseModuleSlice = AsyncFunctionThunk(
	'updatethumbCourseModule',
	updatethumbCourseModule,
);

// Create the slice for remove modal
const removeModalSlice = createSlice({
	name: 'removeModal',
	initialState: initialRemoveModalState,
	reducers: {
		openRemoveModal: (state, action) => {
			state.isOpen = true;
			state.idToRemove = action.payload;
		},
		closeRemoveModal: (state) => {
			state.isOpen = false;
			state.idToRemove = null;
		},
	},
});

// Combine both slices
export const { openRemoveModal, closeRemoveModal } = removeModalSlice.actions;

// Create the slice for course modules
const CourseModuleSlice = createSlice({
	name: 'courseModuleSlice',
	initialState,
	reducers: {
		setError: (state, action) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// createCourseModuleSlice
			.addCase(createCourseModuleSlice.fulfilled, (state, action) => {
				state.courseModules = action.payload.data;
				state.loading = false;
			})
			.addCase(createCourseModuleSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// getAllCourseModuleSlice
			.addCase(getAllCourseModuleSlice.fulfilled, (state, action) => {
				state.courseModules = action.payload.data;
				state.loading = false;
			})
			.addCase(getAllCourseModuleSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllCourseModuleSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// removeCourseModuleSlice
			.addCase(removeCourseModuleSlice.fulfilled, (state, action) => {
				state.courseModules = action.payload;
				state.loading = false;
			})
			.addCase(removeCourseModuleSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(removeCourseModuleSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// updateCourseModuleSlice
			.addCase(updateCourseModuleSlice.fulfilled, (state, action) => {
				state.courseModules = action.payload.data;
				state.loading = false;
			})
			.addCase(updateCourseModuleSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// getByIdCourseModuleSlice
			.addCase(getByIdCourseModuleSlice.fulfilled, (state, action) => {
				state.courseModule = action.payload.data;
				state.loading = false;
			})
			.addCase(getByIdCourseModuleSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(getByIdCourseModuleSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// getCourseModulesByCategorySlice
			.addCase(getCourseModulesByCategorySlice.fulfilled, (state, action) => {
				state.courseModules = action.payload.data;
				state.loading = false;
			})
			.addCase(getCourseModulesByCategorySlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(getCourseModulesByCategorySlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// uploadThumbCourseModuleSlice
			.addCase(uploadThumbCourseModuleSlice.fulfilled, (state, action) => {
				const index = state.courseModules.findIndex(
					(module) => module._id === action.payload._id,
				);
				if (index !== -1) {
					state.courseModules[index] = {
						...state.courseModules[index],
						image: action.payload.image,
					};
				}
				state.loading = false;
			})
			.addCase(uploadThumbCourseModuleSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(uploadThumbCourseModuleSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

// Export actions and reducers
export const { setError } = CourseModuleSlice.actions;
export default CourseModuleSlice.reducer;
