import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createAccount, createLogin } from '../api/auth';
import Cookies from 'js-cookie';

// Define the initial state
interface User {
	_id: string;
	email: string;
	password: string;
}

interface UserState {
	user: User | null;
	forgotUser: any[];
	loading: boolean;
	auth: boolean;
	error: any;
}

const initialState: UserState = {
	user: null,
	forgotUser: [],
	loading: false,
	auth: false,
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
export const createLoginSlice = AsyncFunctionThunk('createLogin', createLogin);
export const createAccountSlice = AsyncFunctionThunk('createAccount', createAccount);

// Create the slice
const AuthSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		setError: (state, action) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// createLoginSlice
			.addCase(createLoginSlice.fulfilled, (state, action) => {
				state.user = action.payload;
				localStorage.setItem('t_A1b2C3d', JSON.stringify(action.payload.data.token));
				Cookies.set('u_xhs2Q9d', JSON.stringify(action.payload.data), {
					expires: 12 / 24,
				});

				state.loading = false;
				state.auth = true;
			})
			.addCase(createLoginSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(createLoginSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(createAccountSlice.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
			})
			.addCase(createAccountSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(createAccountSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
export const { setError } = AuthSlice.actions;

export default AuthSlice.reducer;
