import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
	createCategory,
	getAllCategory,
	getByIdCategory,
	removeCategory,
	updateCategory,
	updatethumbCategory,
} from '../api/course';

interface UserState {
	category: any;
	categories: any[];
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
	category: null,
	categories: [],
	loading: false,
	error: null,
};

// Generalized async thunk function
const AsyncFunctionThunk = (name: string, apiFunction: any) => {
	return createAsyncThunk<any, any>(
		`category/${name}`,
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
export const createCategorieSlice = AsyncFunctionThunk('createCategory', createCategory);
export const getAllCategorieSlice = AsyncFunctionThunk('getAllCategory', getAllCategory);
export const removeCategorieSlice = AsyncFunctionThunk('removeCategory', removeCategory);
export const updateCategorieSlice = AsyncFunctionThunk('updateCategory', updateCategory);
export const getByIdcategorieslice = AsyncFunctionThunk('getByIdcategory', getByIdCategory);
export const uploadThumbcategorieslice = AsyncFunctionThunk(
	'updatethumbcategory',
	updatethumbCategory,
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
const CategorieSlice = createSlice({
	name: 'categorieSlice',
	initialState,
	reducers: {
		setError: (state, action) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// createCategorieSlice
			.addCase(createCategorieSlice.fulfilled, (state, action) => {
				state.categories = action.payload;
				state.loading = false;
			})
			.addCase(createCategorieSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(createCategorieSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// getAllCategorieSlice
			.addCase(getAllCategorieSlice.fulfilled, (state, action) => {
				state.categories = action.payload;
				state.loading = false;
			})
			.addCase(getAllCategorieSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllCategorieSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// removecategorieslice
			.addCase(removeCategorieSlice.fulfilled, (state, action) => {
				state.categories = action.payload;
				state.loading = false;
			})
			.addCase(removeCategorieSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(removeCategorieSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// updateCategorieSlice
			.addCase(updateCategorieSlice.fulfilled, (state, action) => {
				state.categories = action.payload;
				state.loading = false;
			})
			.addCase(updateCategorieSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateCategorieSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// getByIdcategorieslice
			.addCase(getByIdcategorieslice.fulfilled, (state, action) => {
				state.category = action.payload;
				state.loading = false;
			})
			.addCase(getByIdcategorieslice.pending, (state) => {
				state.loading = true;
			})
			.addCase(getByIdcategorieslice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// uploadThumbcategorieslice
			.addCase(uploadThumbcategorieslice.fulfilled, (state, action) => {
				const index = state.categories.findIndex(
					(module) => module._id === action.payload._id,
				);
				if (index !== -1) {
					state.categories[index] = {
						...state.categories[index],
						image: action.payload.image,
					};
				}
				state.loading = false;
			})
			.addCase(uploadThumbcategorieslice.pending, (state) => {
				state.loading = true;
			})
			.addCase(uploadThumbcategorieslice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

// Export actions and reducers
export const { setError } = CategorieSlice.actions;
export default CategorieSlice.reducer;
