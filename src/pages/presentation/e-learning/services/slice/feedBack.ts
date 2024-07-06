import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { getAllFeedbackApi } from '../api/feedBack';

interface FeedbackState {
	feedback: any[];
	loading: boolean;
	error: any;
}
const initialState: FeedbackState = {
	feedback: [],
	loading: false,
	error: null,
};

const AsyncFunctionThunk = (name: string, apiFunction: any) => {
	return createAsyncThunk<any, any>(
		`feedbackSlice/${name}`,
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

export const getAllFeedbackSlice = AsyncFunctionThunk('getAllFeedBackApi', getAllFeedbackApi);

// Create the slice for course modules
const FeedbackSlice = createSlice({
	name: 'feedbackSlice',
	initialState,
	reducers: {
		setError: (state, action) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder

			// getAllFeedbackSlice
			.addCase(getAllFeedbackSlice.fulfilled, (state, action) => {
				state.feedback = action.payload.data;
				state.loading = false;
			})
			.addCase(getAllFeedbackSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllFeedbackSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

// Export actions and reducers
export const { setError } = FeedbackSlice.actions;
export default FeedbackSlice.reducer;
