import React, { FC, useEffect, useRef, useState } from 'react';
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
import Textarea from '../../../../../components/bootstrap/forms/Textarea';
import Select from '../../../../../components/bootstrap/forms/Select';
import Option from '../../../../../components/bootstrap/Option';
import { categories } from './data';
import CategoryValidate from './validationEditForm';
import { useDispatch, useSelector } from 'react-redux';
import {
	createCategorieSlice,
	getAllCategorieSlice,
	updateCategorieSlice,
} from '../../services/slice/course';
import InputGroup, { InputGroupText } from '../../../../../components/bootstrap/forms/InputGroup';
import { Label } from '../../../../../components/icon/material-icons';
import Avatar from '../../../../../components/Avatar';
import USERS, { sam } from '../../../../../common/data/userDummyData';
import compressImage from '../../component/helper/resizeImage';
import { updatethumbCategory } from '../../services/api/course';

interface ICategoryEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}

interface Category {
	id: string;
	name: string;
	status: string;
	language: string;
	description: string;
}

const CategoryEditModal: FC<ICategoryEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	const [avlCategory, setAvlCategory] = useState<any[]>([]);
	const [moduleLoading, setModuleLoading] = useState<boolean>(false);
	const [uploadProgress, setUploadProgress] = useState<any>(null);

	// console.log('edit id ,==>>', id);
	const itemData = id ? avlCategory.filter((item) => item?._id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};

	// console.log('item', item);

	const { category } = useSelector((state: any) => state);
	const categoryFromStore = category?.categories?.data;
	const [thumbnail, setThumbnail] = useState<string | ArrayBuffer | null | any>(null);
	const thumbInputRef = useRef<HTMLInputElement>(null);

	const dispatch = useDispatch();

	const calculateTotalProgress = (progresses: number[]) => {
		const total = progresses.reduce((acc, progress) => acc + progress, 0);
		return total / progresses.length;
	};

	const formik = useFormik({
		initialValues: {
			Name: item?.Name || '',
			status: item?.status || 'active',
			description: item?.description || '',
			language: item?.language || 'English',
			price: item?.price || '',
			discount: item?.discount,
		},
		validate: CategoryValidate,
		enableReinitialize: true,
		onSubmit: async (values: any, { resetForm, setFieldError }) => {
			try {
				setModuleLoading(true);
				let progressUpdates: number[] = [];
				const updateProgress = (progressEvent: any, index: number) => {
					const percentCompleted = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total,
					);
					progressUpdates[index] = percentCompleted;
					setUploadProgress(calculateTotalProgress(progressUpdates));
				};
				let response;

				if (id === '0') {
					// Create Category
					values.discount = Number(values.discount);
					response = await dispatch(createCategorieSlice(values) as any);

					if (response?.payload?.data) {
						const ID = response.payload.data._id;

						if (thumbnail) {
							const resizedImage = await compressImage(thumbnail);
							await updatethumbCategory({
								id: ID,
								image: resizedImage,
								config: (e: any) => updateProgress(e, 0),
							});
						}

						showNotification(
							<span className='d-flex align-items-center'>
								<Icon icon='Info' size='lg' className='me-1' />
								<span>Created Successfully</span>
							</span>,
							'Course has been created successfully',
						);
						setIsOpen(false);
						setModuleLoading(false);
						await dispatch(getAllCategorieSlice({ pageNo: 1, page: 11 }) as any);
					}
				} else {
					// Update Category
					values.discount = Number(values.discount);
					response = await dispatch(updateCategorieSlice({ id, values }) as any);

					if (response?.payload?.data) {
						const ID = response.payload.data._id;

						if (thumbnail) {
							const resizedImage = await compressImage(thumbnail);
							await updatethumbCategory({
								id: ID,
								image: resizedImage,
								config: (e: any) => updateProgress(e, 0),
							});
						}

						showNotification(
							<span className='d-flex align-items-center'>
								<Icon icon='Info' size='lg' className='me-1' />
								<span>Created Successfully</span>
							</span>,
							'Course has been created successfully',
						);
						setIsOpen(false);
						setModuleLoading(false);
						await dispatch(getAllCategorieSlice({ pageNo: 1, page: 11 }) as any);
					}
				}
				if (response.payload.error) {
					if (response.payload.error.includes('Course already exist')) {
						setFieldError('Name', 'Course name already exists');
					} else {
						throw new Error(response.payload.error);
					}
				}
			} catch (error) {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='danger' size='lg' className='me-1' />
						<span>{id === '0' ? 'Create Failed' : 'Update Failed'}</span>
					</span>,
					`Category could not be ${
						id === '0' ? 'created' : 'updated'
					}. Please try again.`,
				);
			} finally {
				setModuleLoading(false);
			}
		},
	});

	useEffect(() => {
		if (Array.isArray(categoryFromStore)) {
			setAvlCategory(categoryFromStore);
		}
	}, [categoryFromStore]);

	const handleAddThumbnailClick = () => {
		if (thumbInputRef.current) {
			thumbInputRef.current.click();
		}
	};

	const handleAddThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		setThumbnail(file as any);
	};

	const handleDeleteThumbnail = () => {
		setThumbnail(null);
	};

	if (id || id === '0') {
		return (
			<form noValidate>
				<Modal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					size='md'
					titleId={id.toString()}
					// isCentered
					isAnimation={false}>
					<ModalHeader setIsOpen={setIsOpen} className='p-4'>
						<ModalTitle id={id}>{'New Course'}</ModalTitle>
					</ModalHeader>
					<ModalBody className='px-4'>
						<div className='row g-4'>
							<FormGroup id='name' label='Thumbnail' className='col-md-12'>
								<div className='col-12'>
									<div className='row g-4 align-items-center'>
										<div className='col-lg-auto'>
											{thumbnail ? (
												<Avatar
													src={URL.createObjectURL(thumbnail)}
													color={USERS.JOHN.color}
													rounded={2}
													style={{
														width: '100px',
														height: '100px',
													}}
												/>
											) : item?.avatar ? (
												<Avatar
													src={`https://e-learning-backend.cradle.services/${
														item?.avatar || item?.avatar
													}`}
													color={USERS.JOHN.color}
													rounded={2}
													style={{
														width: '100px',
														height: '100px',
													}}
												/>
											) : (
												<Avatar
													src={sam.src}
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
															Add Thumbnail
														</Button>
													) : (
														<Button
															color='danger'
															isLight
															icon='Delete'
															onClick={handleDeleteThumbnail}>
															Delete Thumbnail
														</Button>
													)}
												</div>
												<div className='col-12'>
													<p className='text-muted'>
														Avatar helps your user get to know about the
														Course.
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</FormGroup>
							<FormGroup id='Name' label='Name' className='col-md-12'>
								<Input
									onChange={formik.handleChange}
									value={formik.values.Name}
									onBlur={formik.handleBlur}
									isValid={formik.isValid}
									isTouched={Boolean(formik.touched.Name)}
									invalidFeedback={formik.errors.Name as string}
								/>
							</FormGroup>
							<FormGroup id='price' label='Price' className='col-md-6'>
								<InputGroup>
									<InputGroupText>$</InputGroupText>
									<Input
										name='price'
										onChange={formik.handleChange}
										value={formik.values.price}
										onBlur={formik.handleBlur}
										isValid={formik.isValid}
										isTouched={Boolean(formik.touched.price)}
										invalidFeedback={formik.errors.price as string}
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup id='discount' label='Discount' className='col-md-6'>
								<InputGroup>
									<InputGroupText>%</InputGroupText>
									<Input
										name='discount'
										onChange={formik.handleChange}
										value={formik.values.discount}
										onBlur={formik.handleBlur}
										isValid={formik.isValid}
										isTouched={Boolean(formik.touched.discount)}
										invalidFeedback={formik.errors.discount as string}
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup id='language' label='Language' className='col-md-6'>
								<Select
									placeholder='Please select...'
									onChange={formik.handleChange}
									ariaLabel='Parent category select'
									onBlur={formik.handleBlur}
									value={formik.values.language}
									isValid={formik.isValid}
									isTouched={Boolean(formik.touched.language)}
									invalidFeedback={formik.errors.language as string}>
									<Option
										value='English'
										selected={formik.values.status === 'English'}>
										English
									</Option>
									<Option
										value='Spanish'
										selected={formik.values.status === 'Spanish'}>
										Spanish
									</Option>
									<Option
										value='French'
										selected={formik.values.status === 'French'}>
										French
									</Option>
									<Option
										value='German'
										selected={formik.values.status === 'German'}>
										German
									</Option>
									<Option
										value='Chinese'
										selected={formik.values.status === 'Chinese'}>
										Chinese
									</Option>
								</Select>
							</FormGroup>
							<FormGroup id='status' label='Status' className='col-md-6'>
								<Select
									placeholder='Please select...'
									onChange={formik.handleChange}
									ariaLabel='Status select'
									value={formik.values.status}
									onBlur={formik.handleBlur}
									isValid={formik.isValid}
									isTouched={Boolean(formik.touched.status)}
									invalidFeedback={formik.errors.status as string}>
									{/* Provide different values for each option */}
									<Option
										value='active'
										selected={formik.values.status === 'Active'}>
										Active
									</Option>
									<Option
										value='inactive'
										selected={formik.values.status === 'Inactive'}>
										Inactive
									</Option>
								</Select>
							</FormGroup>

							<FormGroup id='description' label='Description' className='col-md-12'>
								<Textarea
									id='description'
									onChange={formik.handleChange}
									value={formik.values.description}
									onBlur={formik.handleBlur}
									isValid={formik.isValid}
									isTouched={Boolean(formik.touched.description)}
									invalidFeedback={formik.errors.description as string}
								/>
							</FormGroup>
						</div>
					</ModalBody>
					<ModalFooter className='px-4 pb-4'>
						{!moduleLoading ? (
							<Button color='primary' onClick={formik.handleSubmit}>
								{id === '0' ? 'Create' : 'Update'}
							</Button>
						) : (
							<Button color='primary' isDisable>
								{id === '0' ? 'Creating...' : 'Updating...'}
							</Button>
						)}
					</ModalFooter>
				</Modal>
			</form>
		);
	}
	return null;
};
CategoryEditModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default CategoryEditModal;
