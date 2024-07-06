import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../../components/bootstrap/Modal';
import showNotification from '../../../../../components/extras/showNotification';
import Icon from '../../../../../components/icon/Icon';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../../components/bootstrap/forms/Input';
import Button from '../../../../../components/bootstrap/Button';
import userCreateValidate from './validation/userEdits';
import Select from '../../../../../components/bootstrap/forms/Select';
import Option from '../../../../../components/bootstrap/Option';
import { useDispatch, useSelector } from 'react-redux';
import { createAccountSlice } from '../../services/slice/auth';
import { getAllUserSlice, removeUserSlice } from '../../services/slice/users';
import { uploadProfilePicture } from '../../services/api/users';
import Avatar from '../../../../../components/Avatar';
import USERS from '../../../../../common/data/userDummyData';
import compressImage from '../../component/helper/resizeImage';
import { getAllRoleSlice } from '../../services/slice/accessControl';
import { capitalize } from '../../../../../utils/e-learning/common';

interface IUsersEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}

const UsersEditModal: FC<IUsersEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	const dispatch = useDispatch();

	const [uploadProgress, setUploadProgress] = useState<number | null>(null);
	const [thumbnail, setThumbnail] = useState<any>(null);
	const thumbInputRef = useRef<HTMLInputElement>(null);

	const { roles } = useSelector((state: any) => state?.role);
	console.log('roles', roles);

	const pageSize = useMemo(
		() => ({
			pageNo: 1,
			page: 11,
		}),
		[],
	);

	useEffect(() => {
		dispatch(getAllRoleSlice(pageSize) as any);
	}, [pageSize, dispatch]);

	const calculateTotalProgress = (progresses: number[]) => {
		const total = progresses.reduce((acc, progress) => acc + progress, 0);
		return total / progresses.length;
	};

	const formik = useFormik({
		initialValues: {
			Name: '',
			email: '',
			password: 'password123',
			confirmPassword: 'password123',
			status: 'active',
			role: 'student',
		},
		validate: userCreateValidate,
		enableReinitialize: true,
		onSubmit: async (values, { setFieldError, resetForm }) => {
			try {
				let progressUpdates: number[] = [];
				const updateProgress = (progressEvent: any, index: number) => {
					const percentCompleted = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total,
					);
					progressUpdates[index] = percentCompleted;
					setUploadProgress(calculateTotalProgress(progressUpdates));
				};

				const res = await dispatch(createAccountSlice(values) as any);
				if (res.payload.data) {
					const ID = res.payload.data._id;

					if (thumbnail) {
						const resizedImage = compressImage(thumbnail);
						const uploadThumb = await uploadProfilePicture({
							id: ID,
							image: thumbnail,
							config: (e: any) => updateProgress(e, 1),
						});
						if (uploadThumb.status !== 201) {
							await dispatch(removeUserSlice(ID) as any);
							showNotification(
								<span className='d-flex align-items-center'>
									<Icon icon='danger' size='lg' className='me-1' />
									<span>Creating User failed</span>
								</span>,
								'User creation failed due to image upload failure',
							);
							return;
						}
						if (uploadThumb.status === 201) {
							setUploadProgress(null);
							setIsOpen(false);
							dispatch(getAllUserSlice(pageSize) as any);
							showNotification(
								<span className='d-flex align-items-center'>
									<Icon icon='Info' size='lg' className='me-1' />
									<span>Created Successfully</span>
								</span>,
								'User has been created successfully',
							);
						}
					}
					resetForm();
				} else if (res.payload.error === 'User already exist') {
					setFieldError('email', 'Email is already registered');
				}
			} catch (error) {
				console.error('Error creating account:', error);
				setUploadProgress(null);
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Error' size='lg' className='me-1' />
						<span>Error</span>
					</span>,
					'An error occurred while creating the account',
				);
			}
		},
	});

	const handleAddThumbnailClick = () => {
		if (thumbInputRef.current) {
			thumbInputRef.current.click();
		}
	};

	const handleAddThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		if (file) {
			setThumbnail(file as any);
		}
	};

	const handleDeleteThumbnail = () => {
		setThumbnail(null);
	};

	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='md' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{'New User'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					{uploadProgress === null && (
						<div className='row g-4'>
							{/* <FormGroup>
								<div className='row g-4 align-items-center'>
									<div className='col-lg-auto'>
										{thumbnail ? (
											<Avatar
												srcSet={thumbnail}
												src={thumbnail}
												color={USERS.JOHN.color}
												rounded={2}
												style={{
													width: '100px',
													height: '100px',
												}}
											/>
										) : (
											<Avatar
												srcSet={USERS.JOHN.srcSet}
												src={USERS.JOHN.src}
												color={USERS.JOHN.color}
												rounded={2}
												style={{
													width: '100px',
													height: '100px',
												}}
											/>
										)}
									</div>
									<div className='col-lg'>
										<div className='row g-4'>
											<div className='col-auto'>
												<input
													type='file'
													onChange={handleAddThumbnailChange}
													ref={thumbInputRef}
													style={{ display: 'none' }}
													accept='image/*'
												/>
												{!thumbnail ? (
													<Button
														color='info'
														isLight
														icon='Add'
														onClick={handleAddThumbnailClick}>
														Profile Picture
													</Button>
												) : (
													<Button
														color='danger'
														isLight
														icon='Delete'
														onClick={handleDeleteThumbnail}>
														Profile Picture
													</Button>
												)}
											</div>
											<div className='col-12'>
												<p className=' text-muted'>
													Profile Picture helps your user get to know
													about you.
												</p>
											</div>
										</div>
									</div>
								</div>
							</FormGroup> */}
							<FormGroup>
								<div className='row g-4 align-items-center'>
									<div className='col-lg-auto'>
										{thumbnail ? (
											<Avatar
												src={URL.createObjectURL(thumbnail)}
												rounded={2}
												style={{
													width: '100px',
													height: '100px',
												}}
											/>
										) : (
											<Avatar
												src={USERS.JOHN.src}
												color={USERS.JOHN.color}
												rounded={2}
												style={{
													width: '100px',
													height: '100px',
												}}
											/>
										)}
									</div>
									<div className='col-lg'>
										<div className='row g-4'>
											<div className='col-auto'>
												<input
													type='file'
													onChange={handleAddThumbnailChange}
													ref={thumbInputRef}
													style={{ display: 'none' }}
													accept='image/*'
												/>
												{!thumbnail ? (
													<Button
														color='info'
														isLight
														icon='Add'
														onClick={handleAddThumbnailClick}>
														Profile Picture
													</Button>
												) : (
													<Button
														color='danger'
														isLight
														icon='Delete'
														onClick={handleDeleteThumbnail}>
														Delete Picture
													</Button>
												)}
											</div>
											<div className='col-12'>
												<p className='text-muted'>
													Profile Picture helps your user get to know
													about you.
												</p>
											</div>
										</div>
									</div>
								</div>
							</FormGroup>
							<FormGroup id='Name' label='Name' className='col-md-12'>
								<Input
									id='Name'
									name='Name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.Name}
									isValid={formik.isValid}
									isTouched={Boolean(formik.touched.Name)}
									invalidFeedback={formik.errors.Name as string}
								/>
							</FormGroup>
							<FormGroup id='email' label='Email' className='col-md-12'>
								<Input
									id='email'
									name='email'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.email}
									isValid={formik.isValid}
									isTouched={Boolean(formik.touched.email)}
									invalidFeedback={formik.errors.email as string}
								/>
							</FormGroup>
							<FormGroup id='password' label='Password' className='col-md-6'>
								<Input
									id='password'
									name='password'
									type='password'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.password}
									isValid={formik.isValid}
									isTouched={Boolean(formik.touched.password)}
									invalidFeedback={formik.errors.password as string}
								/>
							</FormGroup>
							<FormGroup
								id='confirmPassword'
								label='Confirm Password'
								className='col-md-6'>
								<Input
									id='confirmPassword'
									name='confirmPassword'
									type='password'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.confirmPassword}
									isValid={formik.isValid}
									isTouched={Boolean(formik.touched.confirmPassword)}
									invalidFeedback={formik.errors.confirmPassword as string}
								/>
							</FormGroup>
							<FormGroup id='status' label='Status' className='col-md-6'>
								<Select
									placeholder='Please select...'
									onChange={formik.handleChange}
									ariaLabel='Status select'
									value={formik.values.status}>
									<Option
										value='active'
										selected={formik.values.status === 'active'}>
										Active
									</Option>
									<Option
										value='inactive'
										selected={formik.values.status === 'inactive'}>
										Inactive
									</Option>
								</Select>
							</FormGroup>
							<FormGroup id='role' label='Role' className='col-md-6'>
								<Select
									placeholder='Please select...'
									onChange={formik.handleChange}
									ariaLabel='Role select'
									value={formik.values.role}
									name='role'>
									{roles
										.filter((f: any) => f?.name !== 'superAdmin')
										.map((role: any) => (
											<Option
												key={role?._id}
												value={role?._id}
												selected={formik.values.role === role?._id}>
												{capitalize(role?.display_name)}
											</Option>
										))}
								</Select>
							</FormGroup>
						</div>
					)}
					{uploadProgress !== null && (
						<div className='d-flex justify-content-center align-items-center vh-50'>
							<FormGroup
								label={`Creating module... ${Math.floor(uploadProgress)}%`}
								className=' text-center col-lg-12 vh-50'>
								<div className='progress' style={{ height: '5px' }}>
									<div
										className='progress-bar'
										role='progressbar'
										style={{ width: `${uploadProgress}%` }}
										aria-valuenow={uploadProgress}
										aria-valuemin={0}
										aria-valuemax={100}></div>
								</div>
							</FormGroup>
						</div>
					)}
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button color='info' onClick={formik.handleSubmit}>
						Save
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
	return null;
};

UsersEditModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default UsersEditModal;
