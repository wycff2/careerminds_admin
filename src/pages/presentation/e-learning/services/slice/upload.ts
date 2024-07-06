import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'; 
interface UploadState {
	uploadId: string;
	progress: number;
	status: 'uploading' | 'completed' | 'failed';
}

interface SetUploadProgressPayload {
	uploadId: string;
	progress: number;
}

interface UploadFailedPayload {
	uploadId: string;
}

const initialState: UploadState[] = [];

// Function to save upload state to cookies
const saveUploadStateToCookies = (state: UploadState[]) => {
  Cookies.set('uploadProgress', JSON.stringify(state));
};

export const uploadProgressSlice = createSlice({
	name: 'uploadProgress',
	initialState,
	reducers: {
		addUploadSlice: (state, action: PayloadAction<UploadState>) => {
			state.push(action.payload);
			saveUploadStateToCookies(state); 
		},
		setUploadSlice: (state, action: PayloadAction<SetUploadProgressPayload>) => {
			const { uploadId, progress } = action.payload;
			const upload = state.find((u) => u.uploadId === uploadId);
			if (upload) {
				upload.progress = progress;
				upload.status = progress >= 100 ? 'completed' : 'uploading';
			} else {
				state.push({
					uploadId,
					progress,
					status: progress >= 100 ? 'completed' : 'uploading',
				});
			}
			saveUploadStateToCookies(state);
		},
		setUploadFailedSlice: (state, action: PayloadAction<UploadFailedPayload>) => {
			const { uploadId } = action.payload;
			const upload = state.find((u) => u.uploadId === uploadId);
			if (upload) {
				upload.status = 'failed';
			}
			saveUploadStateToCookies(state);
		},
	},
});

export const { addUploadSlice, setUploadSlice, setUploadFailedSlice } = uploadProgressSlice.actions;

export default uploadProgressSlice.reducer;
