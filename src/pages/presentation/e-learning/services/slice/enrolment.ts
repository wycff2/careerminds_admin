import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createEnrolment, getAllEnrolment } from '../api/enrolment';

interface UserState {
	enrolment: any;
	enrolments: any[];
	loading: boolean;
	error: any;
}

const initialState: UserState = {
	enrolment: null,
	enrolments: [],
	loading: false,
	error: null,
};

// Generalized async thunk function
const AsyncFunctionThunk = (name: string, apiFunction: any) => {
	return createAsyncThunk<any, any>(
		`enrolment/${name}`,
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
export const getAllEnrolmentSlice = AsyncFunctionThunk('getAllEnrolment', getAllEnrolment);
export const createEnrolmentSlice = AsyncFunctionThunk('createEnrolment', createEnrolment);

// Create the slice for course modules
const EnrolmentSlice = createSlice({
	name: 'enrolmentSlice',
	initialState,
	reducers: {
		setError: (state, action) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// getAllCategorieSlice
			.addCase(getAllEnrolmentSlice.fulfilled, (state, action) => {
				state.enrolments = action.payload.data;
				state.loading = false;
			})
			.addCase(getAllEnrolmentSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllEnrolmentSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			// createEnrolmentSlice
			.addCase(createEnrolmentSlice.fulfilled, (state, action) => {
				state.enrolment = action.payload.data;
				state.loading = false;
			})
			.addCase(createEnrolmentSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(createEnrolmentSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

// Export actions and reducers
export const { setError } = EnrolmentSlice.actions;
export default EnrolmentSlice.reducer;
