import { configureStore, combineReducers } from '@reduxjs/toolkit';

import AuthSlice from './slice/auth';
import CourseModuleSlice from './slice/modules';
import UserSlice from './slice/users';
import CategorieSlice from './slice/course';
import FeedbackSlice from './slice/feedBack';
import EnrolmentSlice from './slice/enrolment';
import RoleSlice from './slice/accessControl';
import uploadProgressReducer from './slice/upload';

const rootReducer = combineReducers({
	role: RoleSlice,
	auth: AuthSlice,
	courseModule: CourseModuleSlice,
	users: UserSlice,
	category: CategorieSlice,
	feedback: FeedbackSlice,
	enrolment: EnrolmentSlice,
	uploadings: uploadProgressReducer,
});

export const store = configureStore({
	reducer: rootReducer,
});
