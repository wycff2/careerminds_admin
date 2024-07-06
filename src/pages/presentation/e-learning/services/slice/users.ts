// UserSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { getAllUsersApi, getByIdUser, removeUser } from '../api/users';

// Define the initial state
interface UserState {
	user: any;
	users: any[];
	loading: boolean;
	error: any;
}

const initialState: UserState = {
	user: null,
	users: [],
	loading: false,
	error: null,
};

// Generalized async thunk function
const AsyncFunctionThunk = (name: string, apiFunction: any) => {
	return createAsyncThunk<any, any>(`auth/${name}`, async (data: any, { rejectWithValue }) => {
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
	});
};

// Define async thunks for each operation
export const getAllUserSlice = AsyncFunctionThunk('getAllUsersApi', getAllUsersApi);
export const getByIdUserSlice = AsyncFunctionThunk('getByIdUser', getByIdUser);
export const removeUserSlice = AsyncFunctionThunk('removeUser', removeUser);

// Create the slice
const UserSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setError: (state, action) => {
			state.error = action.payload;
		},
		clearUserSlice: (state) => {
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// get All user slice
			.addCase(getAllUserSlice.fulfilled, (state, action) => {
				state.users = action.payload.data;
				state.loading = false;
			})
			.addCase(getAllUserSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllUserSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// getByID user slice
			.addCase(getByIdUserSlice.fulfilled, (state, action) => {
				state.user = action.payload.data;
				state.loading = false;
			})
			.addCase(getByIdUserSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(getByIdUserSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// remove user slice
			.addCase(removeUserSlice.fulfilled, (state, action) => {
				state.users = action.payload.data;
				state.loading = false;
			})
			.addCase(removeUserSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(removeUserSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { setError, clearUserSlice } = UserSlice.actions;

export default UserSlice.reducer;
