import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createRoleApi, deleteRoleApi, getAllRoleApi, updateRoleApi } from '../api/accessControl';

// Define the initial state
interface RoleState {
	role: null;
	roles: any[];
	loading: boolean;
	error: any;
}

const initialState: RoleState = {
	role: null,
	roles: [],
	loading: false,
	error: null,
};

// Generalized async thunk function
const AsyncFunctionThunk = (name: string, apiFunction: any) => {
	return createAsyncThunk<any, any>(`role/${name}`, async (data: any, { rejectWithValue }) => {
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
export const createRoleSlice = AsyncFunctionThunk('createRoleApi', createRoleApi);
export const getAllRoleSlice = AsyncFunctionThunk('getAllRoleApi', getAllRoleApi);
export const updateRoleSlice = AsyncFunctionThunk('updateRoleApi', updateRoleApi);
export const deleteRoleSlice = AsyncFunctionThunk('deleteRoleApi', deleteRoleApi);

// Create the slice
const RoleSlice = createSlice({
	name: 'roleSlice',
	initialState,
	reducers: {
		setError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// create role
			.addCase(createRoleSlice.fulfilled, (state, action) => {
				state.role = action.payload;
				state.loading = false;
			})
			.addCase(createRoleSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(createRoleSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// get all Roles
			.addCase(getAllRoleSlice.fulfilled, (state, action) => {
				state.roles = action.payload.data;
				state.loading = false;
			})
			.addCase(getAllRoleSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllRoleSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// update role
			.addCase(updateRoleSlice.fulfilled, (state, action) => {
				state.role = action.payload;
				state.loading = false;
			})
			.addCase(updateRoleSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateRoleSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// delete role
			.addCase(deleteRoleSlice.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteRoleSlice.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
export const { setError } = RoleSlice.actions;

export default RoleSlice.reducer;
