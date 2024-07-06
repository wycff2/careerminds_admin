import React, { Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../../layout/SubHeader/SubHeader';
import Button from '../../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Avatar from '../../../../components/Avatar';
import Icon from '../../../../components/icon/Icon';
import useTourStep from '../../../../hooks/useTourStep';
import PageLoader from '../component/helper/PageLoader';
import CommonDesc from '../../../../common/other/CommonDesc';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import showNotification from '../../../../components/extras/showNotification';
import { sam } from '../../../../common/data/userDummyData';
import RecentActivities from './resentActivities';
import { changePassword } from '../services/api/auth';
import ChangePasswordValidation from './validate';

const EmployeePage = () => {
	useTourStep(19);
	const navigate = useNavigate();
	const { id } = useParams();
	const [passwordChangeCTA, setPasswordChangeCTA] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { user, loading } = useSelector((state: any) => state?.users);
	const dispatch = useDispatch();

	const handleSave = async (values: any) => {
		try {
			const data = {
				values,
				id: user?._id,
			};

			const response = await changePassword(data);
			if (
				response.status === 200 &&
				response.data.message === 'Password changed successfully.'
			) {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='info' size='lg' className='me-1' />
						<span>Updated Successfully</span>
					</span>,
					'The password has been successfully updated.',
				);
				setIsLoading(false);
				setPasswordChangeCTA(false);
			} else {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Error' size='lg' className='me-1' />
						<span>Update Failed</span>
					</span>,
					"Failed to update the user's password. Please check your current password and try again.",
					'danger',
				);
				setIsLoading(false);
			}
		} catch (error) {
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Error' size='lg' className='me-1' />
					<span>Update Failed</span>
				</span>,
				"An error occurred while updating the user's password. Please try again later.",
				'danger',
			);
			setIsLoading(false);
		}
	};

	const formik = useFormik({
		initialValues: {
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
		validate: ChangePasswordValidation,
		onSubmit: (values, { resetForm }) => {
			setIsLoading(true);
			handleSave(values);
			resetForm();
		},
	});

	const BackToList = () => {
		navigate(-1);
	};

	return (
		<Fragment>
			{loading ? (
				<PageLoader />
			) : (
				<PageWrapper title={`${user?.Name}`}>
					<SubHeader className='mt-4'>
						<SubHeaderLeft>
							<Button
								color='info'
								isLink
								icon='ArrowBack'
								tag='a'
								onClick={BackToList}>
								Back to List
							</Button>
							<SubheaderSeparator />
						</SubHeaderLeft>
						<SubHeaderRight>
							<span className='text-muted fst-italic me-2'>Last update:</span>
							<span className='fw-bold'>{moment(user?.updated_at).fromNow()}</span>
						</SubHeaderRight>
					</SubHeader>
					<Page>
						<div className='pt-3 pb-5 d-flex align-items-center'>
							<span className='display-4 fw-bold me-3'>{`${user?.Name}`}</span>
							<span className='border border-success border-2 text-success fw-bold px-3 py-2 rounded'>
								{user?.role === 'admin' ? 'CEO, Founder' : ''}
							</span>
						</div>
						<div className='row'>
							<div className='col-lg-4'>
								<Card className='shadow-3d-info'>
									<CardBody>
										<div className='row g-5'>
											<div className='col-12 d-flex justify-content-center'>
												{user?.avatar ? (
													<Avatar
														src={
															user?.avatar &&
															`https://e-learning-backend.cradle.services/${user?.avatar}`
														}
													/>
												) : (
													<Avatar src={sam?.src} srcSet={sam?.srcSet} />
												)}
											</div>
											<div className='col-12'>
												<div className='row g-2'>
													<div className='col-12'>
														<div className='d-flex align-items-center'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='Mail'
																	size='3x'
																	color='info'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-5 mb-0'>
																	{`${user?.email}`}
																</div>
																<div className='text-muted'>
																	Email Address
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</CardBody>
								</Card>
							</div>
							<div className='col-lg-8'>
								<Card>
									<CardHeader>
										<CardLabel icon='LocalPolice' iconColor='primary'>
											<CardTitle>Password</CardTitle>
											<CardSubTitle>Password change operations</CardSubTitle>
										</CardLabel>
										<CardActions>
											{passwordChangeCTA ? (
												<Button
													color='danger'
													isLight
													icon='Cancel'
													onClick={() => setPasswordChangeCTA(false)}>
													Cancel
												</Button>
											) : (
												<>
													<span>Do you want to change?</span>
													<Button
														color='primary'
														isLight
														icon='PublishedWithChanges'
														onClick={() => setPasswordChangeCTA(true)}>
														Yes
													</Button>
												</>
											)}
										</CardActions>
									</CardHeader>
									{passwordChangeCTA && (
										<CardBody>
											<form onSubmit={formik.handleSubmit}>
												<div className='row g-4'>
													<div className='col-12'>
														<FormGroup
															id='oldPassword'
															label='Current password'>
															<Input
																type='password'
																placeholder='Current password'
																name='oldPassword'
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={formik.values.oldPassword}
																isTouched={Boolean(
																	formik.touched.oldPassword,
																)}
																isValid={
																	formik.touched.oldPassword &&
																	!formik.errors.oldPassword
																}
																invalidFeedback={
																	formik.errors
																		.oldPassword as string
																}
															/>
														</FormGroup>
													</div>
													<div className='col-12'>
														<FormGroup
															id='newPassword'
															label='New password'>
															<Input
																type='password'
																placeholder='New password'
																name='newPassword'
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={formik.values.newPassword}
																isTouched={Boolean(
																	formik.touched.newPassword,
																)}
																isValid={
																	formik.touched.newPassword &&
																	!formik.errors.newPassword
																}
																invalidFeedback={
																	formik.errors
																		.newPassword as string
																}
															/>
														</FormGroup>
													</div>
													<div className='col-12'>
														<FormGroup
															id='confirmPassword'
															label='Confirm new password'>
															<Input
																type='password'
																placeholder='Confirm new password'
																name='confirmPassword'
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={
																	formik.values.confirmPassword
																}
																isTouched={Boolean(
																	formik.touched.confirmPassword,
																)}
																isValid={
																	formik.touched
																		.confirmPassword &&
																	!formik.errors.confirmPassword
																}
																invalidFeedback={
																	formik.errors
																		.confirmPassword as string
																}
															/>
														</FormGroup>
													</div>
												</div>
												<div className='mt-4'>
													<Button
														color='primary'
														isDisable={!formik.isValid || isLoading}
														onClick={formik.handleSubmit}>
														{isLoading ? 'Saving...' : 'Save Changes'}
													</Button>
												</div>
											</form>
										</CardBody>
									)}
									<CardFooter>
										<CommonDesc>
											For your security, we recommend that you change your
											password every 1 month.
										</CommonDesc>
									</CardFooter>
								</Card>
								<div>
									<RecentActivities />
								</div>
							</div>
						</div>
					</Page>
				</PageWrapper>
			)}
		</Fragment>
	);
};

export default EmployeePage;
