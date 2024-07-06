// import React, { FC, Fragment, useEffect, useMemo, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
// import { useFormik } from 'formik';
// import Modal, {
// 	ModalBody,
// 	ModalFooter,
// 	ModalHeader,
// 	ModalTitle,
// } from '../../../../../components/bootstrap/Modal';
// import showNotification from '../../../../../components/extras/showNotification';
// import Icon from '../../../../../components/icon/Icon';
// import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
// import Input from '../../../../../components/bootstrap/forms/Input';

// import Button from '../../../../../components/bootstrap/Button';
// import Textarea from '../../../../../components/bootstrap/forms/Textarea';
// import Select from '../../../../../components/bootstrap/forms/Select';
// import Option from '../../../../../components/bootstrap/Option';
// import { modules } from './data';
// import USERS from '../../../../../common/data/userDummyData';
// import Avatar from '../../../../../components/Avatar';
// import ModuleValidate from './validationEditForm';
// import Card, { CardBody } from '../../../../../components/bootstrap/Card';
// import Accordion, { AccordionItem } from '../../../../../components/bootstrap/Accordion';
// import VideoPlayer from '../../VideoPlayer/video';
// import { useDispatch, useSelector } from 'react-redux';
// import {
// 	createCourseModuleSlice,
// 	getAllCourseModuleSlice,
// 	removeCourseModuleSlice,
// 	updateCourseModuleSlice,
// 	uploadThumbCourseModuleSlice,
// } from '../../services/slice/modules';
// import {
// 	updateVideoCourseModule,
// 	updateVideothumbCourseModule,
// 	updatethumbCourseModule,
// } from '../../services/api/modules';
// import Spinner from '../../../../../components/bootstrap/Spinner';
// import Checks from '../../../../../components/bootstrap/forms/Checks';

// interface IModuleEditModalProps {
// 	id: string;
// 	isOpen: boolean;
// 	setIsOpen(...args: unknown[]): unknown;
// }
// const ModuleEditModal: FC<IModuleEditModalProps> = ({ id, isOpen, setIsOpen }) => {
// 	const [avlModules, setAvlModule] = useState<any[]>([]);

// 	const { courseModule } = useSelector((state: any) => state);
// 	console.log(courseModule.courseModules.data);
// 	const modulesFromStore = courseModule.courseModules?.data;

// 	useEffect(() => {
// 		if (Array.isArray(modulesFromStore)) {
// 			setAvlModule(modulesFromStore);
// 		}
// 	}, [modulesFromStore]);
// 	// console.log('edit id ,==>>', id);
// 	const itemData = id ? avlModules.filter((item) => item?._id.toString() === id.toString()) : {};
// 	const item = id && Array.isArray(itemData) ? itemData[0] : {};

// 	const dispatch = useDispatch();

// 	const [thumbnail, setThumbnail] = useState<string | ArrayBuffer | null | any>(null);
// 	const thumbInputRef = useRef<HTMLInputElement>(null);
// 	const [uploadProgress, setUploadProgress] = useState<any>(null);
// 	const [userCreated, setUserCreated] = useState<boolean>(false);
// 	const [showVideoContent, setShowVideoContent] = useState(false);

// 	const [selectedPicture, setSelectedPicture] = useState<string | null>(null);

// 	const [selectedVideo, setSelectedVideo] = useState<any>(null);
// 	const [videosUrl, setVideosUrl] = useState<any>(null);

// 	const fileInputRef = React.useRef<HTMLInputElement>(null);
// 	const fileVideoRef = React.useRef<HTMLInputElement>(null);

// 	const pageSize = useMemo(
// 		() => ({
// 			pageNo: 1,
// 			page: 11,
// 		}),
// 		[],
// 	);
// 	const calculateTotalProgress = (progresses: number[]) => {
// 		const total = progresses.reduce((acc, progress) => acc + progress, 0);
// 		return total / progresses.length;
// 	};

// 	console.log('item', item);
// 	const formik = useFormik({
// 		initialValues: {
// 			// thumb: item?.thumb,
// 			course: '6662d9812e6b542210677a0c',
// 			Name: item?.Name || '',
// 			status: item?.status || 'active',
// 			description: item?.description || [''],
// 			avatar: item?.avatar,
// 			thumbnail: item?.thumbnail,
// 			video: item?.thumbnail,
// 		},
// 		validate: ModuleValidate,
// 		enableReinitialize: true,

// 		// onSubmit: async (values, { resetForm }) => {
// 		// 	try {
// 		// 		const config = (progressEvent: any) => {
// 		// 			const percentCompleted = Math.round(
// 		// 				(progressEvent.loaded * 100) / progressEvent.total,
// 		// 			);
// 		// 			setUploadProgress(percentCompleted);
// 		// 		};
// 		// 		setUserCreated(false);

// 		// 		if (id === '0') {
// 		// 			const res = await dispatch(createCourseModuleSlice(values) as any);

// 		// 			if (res?.payload?.data) {
// 		// 				const ID = res.payload.data._id;

// 		// 				if (thumbnail) {
// 		// 					const UploadThumb = (await updatethumbCourseModule({
// 		// 						id: ID,
// 		// 						image: thumbnail,
// 		// 						config: config,
// 		// 					})) as any;

// 		// 					if (UploadThumb.status !== 201) {
// 		// 						await dispatch(removeCourseModuleSlice(ID) as any);
// 		// 						showNotification(
// 		// 							<span className='d-flex align-items-center'>
// 		// 								<Icon icon='danger' size='lg' className='me-1' />
// 		// 								<span>Creating module failed</span>
// 		// 							</span>,
// 		// 							'Module creation failed due to image upload failure',
// 		// 						);
// 		// 						return;
// 		// 					}
// 		// 				}

// 		// 				if (selectedPicture) {
// 		// 					const UploadVideoThumb = (await updateVideothumbCourseModule({
// 		// 						id: ID,
// 		// 						thumbnail: selectedPicture,
// 		// 						config: config,
// 		// 					})) as any;

// 		// 					if (UploadVideoThumb.status !== 201) {
// 		// 						await dispatch(removeCourseModuleSlice(ID) as any);
// 		// 						showNotification(
// 		// 							<span className='d-flex align-items-center'>
// 		// 								<Icon icon='danger' size='lg' className='me-1' />
// 		// 								<span>Creating module failed</span>
// 		// 							</span>,
// 		// 							'Module creation failed due to video thumbnail upload failure',
// 		// 						);
// 		// 						return;
// 		// 					}
// 		// 				}

// 		// 				if (selectedVideo) {
// 		// 					const UploadVideoThumb = (await updateVideoCourseModule({
// 		// 						id: ID,
// 		// 						video: selectedVideo,
// 		// 						config: config,
// 		// 					})) as any;

// 		// 					if (UploadVideoThumb.status !== 201) {
// 		// 						await dispatch(removeCourseModuleSlice(ID) as any);
// 		// 						showNotification(
// 		// 							<span className='d-flex align-items-center'>
// 		// 								<Icon icon='danger' size='lg' className='me-1' />
// 		// 								<span>Creating module failed</span>
// 		// 							</span>,
// 		// 							'Module creation failed due to video thumbnail upload failure',
// 		// 						);
// 		// 						return;
// 		// 					}
// 		// 				}

// 		// 				setUserCreated(true);
// 		// 			}
// 		// 		} else {
// 		// 			await dispatch(updateCourseModuleSlice({ id, values }) as any);
// 		// 		}

// 		// 		await dispatch(getAllCourseModuleSlice({ pageNo: 1, page: 11 }) as any);
// 		// 		setIsOpen(false);

// 		// 		if (userCreated) {
// 		// 			setUploadProgress(null);
// 		// 			resetForm();
// 		// 			showNotification(
// 		// 				<span className='d-flex align-items-center'>
// 		// 					<Icon icon='Info' size='lg' className='me-1' />
// 		// 					<span>{id === '0' ? 'Created' : 'Updated'} Successfully</span>
// 		// 				</span>,
// 		// 				`Module has been ${id === '0' ? 'created' : 'updated'} successfully`,
// 		// 			);
// 		// 		}
// 		// 	} catch (error) {
// 		// 		console.warn(error);
// 		// 	} finally {
// 		// 		resetForm();
// 		// 		setUploadProgress(null);
// 		// 		setUserCreated(false);
// 		// 	}
// 		// },
// 		onSubmit: async (values, { resetForm }) => {
// 			try {
// 				let progressUpdates: number[] = [];
// 				const updateProgress = (progressEvent: any, index: number) => {
// 					const percentCompleted = Math.round(
// 						(progressEvent.loaded * 100) / progressEvent.total,
// 					);
// 					progressUpdates[index] = percentCompleted;
// 					setUploadProgress(calculateTotalProgress(progressUpdates));
// 				};
// 				setUserCreated(false);

// 				if (id === '0') {
// 					const res = await dispatch(createCourseModuleSlice(values) as any);
// 					if (res?.payload?.data) {
// 						const ID = res.payload.data._id;

// 						if (thumbnail) {
// 							const uploadThumb = await updatethumbCourseModule({
// 								id: ID,
// 								image: thumbnail,
// 								config: (e: any) => updateProgress(e, 0),
// 							});
// 							if (uploadThumb.status !== 201) {
// 								await dispatch(removeCourseModuleSlice(ID) as any);
// 								showNotification(
// 									<span className='d-flex align-items-center'>
// 										<Icon icon='danger' size='lg' className='me-1' />
// 										<span>Creating module failed</span>
// 									</span>,
// 									'Module creation failed due to image upload failure',
// 								);
// 								return;
// 							}
// 						}

// 						if (selectedPicture) {
// 							const uploadVideoThumb = await updateVideothumbCourseModule({
// 								id: ID,
// 								thumbnail: selectedPicture,
// 								config: (e: any) => updateProgress(e, 1),
// 							});
// 							if (uploadVideoThumb.status !== 201) {
// 								await dispatch(removeCourseModuleSlice(ID) as any);
// 								showNotification(
// 									<span className='d-flex align-items-center'>
// 										<Icon icon='danger' size='lg' className='me-1' />
// 										<span>Creating module failed</span>
// 									</span>,
// 									'Module creation failed due to video thumbnail upload failure',
// 								);
// 								return;
// 							}
// 						}

// 						if (selectedVideo) {
// 							const uploadVideo = await updateVideoCourseModule({
// 								id: ID,
// 								video: selectedVideo,
// 								config: (e: any) => updateProgress(e, 2),
// 							});
// 							if (uploadVideo.status !== 201) {
// 								await dispatch(removeCourseModuleSlice(ID) as any);
// 								showNotification(
// 									<span className='d-flex align-items-center'>
// 										<Icon icon='danger' size='lg' className='me-1' />
// 										<span>Creating module failed</span>
// 									</span>,
// 									'Module creation failed due to video upload failure',
// 								);
// 								return;
// 							}
// 						}

// 						setUserCreated(true);
// 					}
// 				} else {
// 					await dispatch(updateCourseModuleSlice({ id, values }) as any);
// 				}

// 				await dispatch(getAllCourseModuleSlice({ pageNo: 1, page: 11 }) as any);
// 				setIsOpen(false);

// 				if (userCreated) {
// 					setUploadProgress(0);
// 					resetForm();
// 					showNotification(
// 						<span className='d-flex align-items-center'>
// 							<Icon icon='Info' size='lg' className='me-1' />
// 							<span>{id === '0' ? 'Created' : 'Updated'} Successfully</span>
// 						</span>,
// 						`Module has been ${id === '0' ? 'created' : 'updated'} successfully`,
// 					);
// 				}
// 			} catch (error) {
// 				console.warn(error);
// 			} finally {
// 				resetForm();
// 				setUploadProgress(null);
// 				setUserCreated(false);
// 			}
// 		},
// 	});

// 	const handleAddThumbnailClick = () => {
// 		if (thumbInputRef.current) {
// 			thumbInputRef.current.click();
// 		}
// 	};

// 	const handleAddThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const file = e.target.files && e.target.files[0];
// 		setThumbnail(file as any);
// 	};
// 	console.log('thumb,', thumbnail);

// 	const handleDeleteThumbnail = () => {
// 		setThumbnail(null);
// 	};

// 	const handleAddDescription = () => {
// 		formik.setFieldValue('description', [...formik.values.description, '']);
// 	};

// 	const handleDescriptionChange = (index: number, value: string) => {
// 		const newDescriptions = [...formik.values.description];
// 		newDescriptions[index] = value;
// 		formik.setFieldValue('description', newDescriptions);
// 	};

// 	// video thubmbnail
// 	const openFileInput = () => {
// 		if (fileInputRef.current) {
// 			fileInputRef.current.click();
// 		}
// 	};

// 	const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		const file = event.target.files && event.target.files[0];

// 		setSelectedPicture(file as any);
// 	};

// 	console.log('selectedPicture', selectedPicture);

// 	const deleteThumbnail = () => {
// 		setSelectedPicture(null);
// 	};

// 	// video player
// 	const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		const file = event.target.files?.[0];

// 		if (file) {
// 			setSelectedVideo(file);
// 			const videosURL = URL.createObjectURL(file);
// 			setVideosUrl(videosURL);
// 		}
// 	};

// 	const handleAddVideoClick = () => {
// 		if (fileVideoRef.current) {
// 			fileVideoRef.current.click();
// 		}
// 	};

// 	const handleDeleteVideo = () => {
// 		setSelectedVideo(null);
// 		setVideosUrl(null);
// 		// Reset the file input value
// 		if (fileVideoRef.current) {
// 			fileVideoRef.current.value = '';
// 		}
// 	};

// 	if (id || id === '0') {
// 		return (
// 			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='md' titleId={id.toString()}>
// 				<ModalHeader setIsOpen={setIsOpen} className=''>
// 					<ModalTitle id={id}>{id === '0' ? 'New Module' : 'Update Module'}</ModalTitle>
// 				</ModalHeader>
// 				<ModalBody className='px-4 g-4 row '>
// 					{uploadProgress === null && (
// 						<div>
// 							<Card>
// 								<CardBody>
// 									<div className='row g-4 col-md-12'>
// 										<div className='fs-6 fw-bold text-center'>
// 											Text-Based Content
// 										</div>
// 										<FormGroup
// 											id='name'
// 											label='Thumbnail'
// 											className='col-md-12'>
// 											<div className='col-12'>
// 												<div className='row g-4 align-items-center'>
// 													<div className='col-lg-auto'>
// 														{thumbnail ||
// 														item?.avatar !== '' ||
// 														item?.avatar !== null ? (
// 															<Avatar
// 																srcSet={
// 																	thumbnail ||
// 																	`https://e-learning-backend.cradle.services/${item?.avatar}`
// 																}
// 																src={
// 																	thumbnail ||
// 																	`https://e-learning-backend.cradle.services/${item?.avatar}`
// 																}
// 																color={USERS.JOHN.color}
// 																rounded={2}
// 																style={{
// 																	width: '100px',
// 																	height: '100px',
// 																}}
// 															/>
// 														) : (
// 															<Avatar
// 																srcSet={USERS.JOHN.srcSet}
// 																src={USERS.JOHN.src}
// 																color={USERS.JOHN.color}
// 																rounded={2}
// 																style={{
// 																	width: '100px',
// 																	height: '100px',
// 																}}
// 															/>
// 														)}
// 													</div>
// 													<div className='col-lg'>
// 														<div className='row g-4'>
// 															<div className='col-auto'>
// 																<input
// 																	type='file'
// 																	onChange={
// 																		handleAddThumbnailChange
// 																	}
// 																	ref={thumbInputRef}
// 																	style={{ display: 'none' }}
// 																	accept='image/*'
// 																/>
// 																{!thumbnail ? (
// 																	<Button
// 																		color='info'
// 																		isLight
// 																		icon='Add'
// 																		onClick={
// 																			handleAddThumbnailClick
// 																		}>
// 																		Add Thumbnail
// 																	</Button>
// 																) : (
// 																	<Button
// 																		color='danger'
// 																		isLight
// 																		icon='Delete'
// 																		onClick={
// 																			handleDeleteThumbnail
// 																		}>
// 																		Delete Thumbnail
// 																	</Button>
// 																)}
// 															</div>
// 															<div className='col-12'>
// 																<p className=' text-muted'>
// 																	Avatar helps your user get to
// 																	know about cource.
// 																</p>
// 															</div>
// 														</div>
// 													</div>
// 												</div>
// 											</div>
// 										</FormGroup>
// 										<FormGroup id='Name' label='Name' className='col-md-12'>
// 											<Input
// 												onChange={formik.handleChange}
// 												value={formik.values.Name}
// 												onBlur={formik.handleBlur}
// 												isValid={formik.isValid}
// 												isTouched={Boolean(formik.touched.Name)}
// 												invalidFeedback={formik.errors.Name as string}
// 											/>
// 										</FormGroup>
// 										<FormGroup id='status' label='Status' className='col-md-12'>
// 											<Select
// 												placeholder='Please select...'
// 												onChange={formik.handleChange}
// 												ariaLabel='Status select'
// 												value={formik.values.status}>
// 												<Option
// 													value='active'
// 													selected={formik.values.status === 'active'}>
// 													Active
// 												</Option>
// 												<Option
// 													value='inactive'
// 													selected={formik.values.status === 'inactive'}>
// 													Inactive
// 												</Option>
// 											</Select>
// 										</FormGroup>

// 										<FormGroup label='Description' className='col-md-12'>
// 											<>
// 												{formik.values.description.map(
// 													(description: any, idx: any) => (
// 														<div key={idx} className='my-2'>
// 															<Textarea
// 																id={`description-${idx}`}
// 																onChange={(e: any) =>
// 																	handleDescriptionChange(
// 																		idx,
// 																		e.target.value,
// 																	)
// 																}
// 																value={description}
// 																rows={2}
// 																onBlur={formik.handleBlur}
// 																isValid={formik.isValid}
// 																isTouched={Boolean(
// 																	formik.touched.description,
// 																)}
// 																invalidFeedback={
// 																	formik.errors
// 																		.description as string
// 																}
// 															/>
// 														</div>
// 													),
// 												)}
// 												<Button
// 													className='mx-auto d-block'
// 													color='dark'
// 													isLight
// 													icon='Add'
// 													onClick={handleAddDescription}>
// 													More
// 												</Button>
// 											</>
// 										</FormGroup>
// 									</div>
// 								</CardBody>
// 							</Card>

// 							<Card className='col-md-12'>
// 								<Checks
// 									isValidMessage={false}
// 									label={
// 										showVideoContent
// 											? 'Hide Video Content'
// 											: 'Show Video Content'
// 									}
// 									onChange={() => setShowVideoContent(!showVideoContent)}
// 									type='switch'
// 								/>
// 							</Card>

// 							{showVideoContent && (
// 								<Card>
// 									<CardBody>
// 										<div className='row g-4 col-md-12'>
// 											<div className='fs-6 fw-bold text-center py-2'>
// 												Video-Based Content
// 											</div>
// 											<FormGroup
// 												id='title'
// 												label='Video Thumbnail'
// 												className='col-md-6 my-3'>
// 												<div className='col-12'>
// 													<div className='row g-4 align-items-center'>
// 														<div className='col-10'>
// 															{selectedPicture ||
// 															item?.thumbnail !== '' ||
// 															item?.thumbnail !== null ? (
// 																<Avatar
// 																	srcSet={
// 																		selectedPicture ||
// 																		`https://e-learning-backend.cradle.services/${item?.thumbnail}`
// 																	}
// 																	src={
// 																		selectedPicture ||
// 																		`https://e-learning-backend.cradle.services/${item?.thumbnail}`
// 																	}
// 																	color={USERS.JOHN.color}
// 																	rounded={0}
// 																	style={{
// 																		width: '120%',
// 																		height: '100px',
// 																		backgroundSize: 'cover',
// 																	}}
// 																/>
// 															) : (
// 																<div>
// 																	<Button
// 																		className='py-5 d-block mx-auto'
// 																		rounded={0}
// 																		style={{
// 																			width: '120%',
// 																			height: '100px',
// 																			cursor: 'alias',
// 																		}}
// 																		color='light'>
// 																		Add Thumbnail
// 																	</Button>
// 																</div>
// 															)}
// 															<input
// 																type='file'
// 																ref={fileInputRef}
// 																style={{ display: 'none' }}
// 																onChange={handleFileInputChange}
// 															/>
// 														</div>

// 														<div className='col-12'>
// 															{!selectedPicture ? (
// 																<Button
// 																	className='d-block mx-auto'
// 																	color='primary'
// 																	isLight
// 																	icon='AddAPhoto'
// 																	onClick={openFileInput}>
// 																	{item?.thumbnail ||
// 																	selectedPicture
// 																		? 'Change Thumbnail'
// 																		: 'Add Thumbnail'}
// 																</Button>
// 															) : (
// 																<Button
// 																	color='danger'
// 																	isLight
// 																	icon='Delete'
// 																	onClick={deleteThumbnail}>
// 																	Delete Thumbnail
// 																</Button>
// 															)}
// 														</div>
// 													</div>
// 												</div>
// 											</FormGroup>

// 											<FormGroup
// 												id='title'
// 												label='Video Trailer'
// 												className='col-md-6 my-3'>
// 												<div className='col-12'>
// 													<div className=' g-4 align-items-center'>
// 														<input
// 															type='file'
// 															accept='video/*'
// 															ref={fileVideoRef}
// 															style={{ display: 'none' }}
// 															onChange={handleVideoFileChange}
// 														/>
// 														<div className='col-12'>
// 															{selectedVideo ||
// 															item?.video !== '' ||
// 															item?.video !== null ? (
// 																<>
// 																	<VideoPlayer
// 																		url={
// 																			videosUrl ||
// 																			`https://e-learning-backend.cradle.services/${item?.video}`
// 																		}
// 																		height={100}
// 																		width={'100%'}
// 																		controls
// 																	/>
// 																	{item?.video ||
// 																	selectedVideo ? null : (
// 																		<Button
// 																			className='d-block mx-auto mt-4'
// 																			color='danger'
// 																			isLight
// 																			icon='Delete'
// 																			onClick={
// 																				handleDeleteVideo
// 																			}>
// 																			Remove Video
// 																		</Button>
// 																	)}
// 																</>
// 															) : (
// 																<div>
// 																	<Button
// 																		className='py-5'
// 																		rounded={0}
// 																		style={{
// 																			width: '100%',
// 																			height: '100px',
// 																			cursor: 'alias',
// 																		}}
// 																		color='light'>
// 																		Add Video
// 																	</Button>
// 																</div>
// 															)}
// 														</div>

// 														<div className='col-12 mt-4'>
// 															{!selectedVideo ? (
// 																<Button
// 																	className='d-block mx-auto'
// 																	color='primary'
// 																	isLight
// 																	icon='AddAPhoto'
// 																	onClick={handleAddVideoClick}>
// 																	{item?.video || selectedVideo
// 																		? 'Change Video'
// 																		: 'Add Video'}
// 																</Button>
// 															) : undefined}
// 														</div>
// 													</div>
// 												</div>
// 											</FormGroup>
// 										</div>
// 									</CardBody>
// 								</Card>
// 							)}
// 						</div>
// 					)}

// 					{uploadProgress !== null && (
// 						<div className='d-flex justify-content-center align-items-center vh-50'>
// 							<FormGroup
// 								label={`Creating module... ${Math.floor(uploadProgress)}%`}
// 								className=' text-center col-lg-12 vh-50'>
// 								<div className='progress'>
// 									<div
// 										className='progress-bar'
// 										role='progressbar'
// 										style={{ width: `${uploadProgress}%` }}
// 										aria-valuenow={uploadProgress}
// 										aria-valuemin={0}
// 										aria-valuemax={100}></div>
// 								</div>
// 							</FormGroup>
// 						</div>
// 					)}
// 				</ModalBody>
// 				<ModalFooter className='px-4 pb-4 '>
// 					{uploadProgress === null && (
// 						<Button color='info' onClick={formik.handleSubmit}>
// 							{id === '0' ? 'Save' : 'Update'}
// 						</Button>
// 					)}
// 				</ModalFooter>
// 			</Modal>
// 		);
// 	}
// 	return null;
// };
// ModuleEditModal.propTypes = {
// 	id: PropTypes.string.isRequired,
// 	isOpen: PropTypes.bool.isRequired,
// 	setIsOpen: PropTypes.func.isRequired,
// };

// export default ModuleEditModal;

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
import Textarea from '../../../../../components/bootstrap/forms/Textarea';
import Select from '../../../../../components/bootstrap/forms/Select';
import Option from '../../../../../components/bootstrap/Option';
import USERS, { sam } from '../../../../../common/data/userDummyData';
import Avatar from '../../../../../components/Avatar';
import ModuleValidate from './validationEditForm';
import Card, { CardBody } from '../../../../../components/bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import {
	createCourseModuleSlice,
	getAllCourseModuleSlice,
	removeCourseModuleSlice,
	updateCourseModuleSlice,
} from '../../services/slice/modules';
import { updatethumbCourseModule } from '../../services/api/modules';
import { getAllCategorieSlice } from '../../services/slice/course';
import compressImage from '../../component/helper/resizeImage';
interface IModuleEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}
const ModuleEditModal: FC<IModuleEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	const [avlModules, setAvlModule] = useState<any[]>([]);

	const { courseModule } = useSelector((state: any) => state);
	const { categories } = useSelector((state: any) => state?.category);
	const [moduleLoading, setModuleLoading] = useState<boolean>(false);

	const modulesFromStore = courseModule.courseModules;
	const courseToAdd = categories?.data;

	useEffect(() => {
		if (Array.isArray(modulesFromStore)) {
			setAvlModule(modulesFromStore);
		}
	}, [modulesFromStore]);
	// console.log('edit id ,==>>', id);
	const itemData = id ? avlModules.filter((item) => item?._id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};

	const dispatch = useDispatch();

	const [thumbnail, setThumbnail] = useState<string | ArrayBuffer | null | any>(null);
	const thumbInputRef = useRef<HTMLInputElement>(null);
	const [uploadProgress, setUploadProgress] = useState<any>(null);
	const [userCreated, setUserCreated] = useState<boolean>(false);

	const calculateTotalProgress = (progresses: number[]) => {
		const total = progresses.reduce((acc, progress) => acc + progress, 0);
		return total / progresses.length;
	};

	const formik = useFormik({
		initialValues: {
			// thumb: item?.thumb,
			course: item?.course || '',
			Name: item?.Name || '',
			status: item?.status || 'active',
			description: item?.description || [''],
		},
		validate: ModuleValidate,
		enableReinitialize: true,
		onSubmit: async (values, { resetForm }) => {
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

				if (id === '0') {
					const res = await dispatch(createCourseModuleSlice(values) as any);
					console.log('res', res);
					if (res?.payload?.data) {
						const ID = res.payload.data._id;

						if (thumbnail) {
							const resizedImage = await compressImage(thumbnail);
							const uploadThumb = await updatethumbCourseModule({
								id: ID,
								image: resizedImage,
								config: (e: any) => updateProgress(e, 0),
							});
							if (uploadThumb.status !== 201) {
								await dispatch(removeCourseModuleSlice(ID) as any);
								showNotification(
									<span className='d-flex align-items-center'>
										<Icon icon='danger' size='lg' className='me-1' />
										<span>Creating module failed</span>
									</span>,
									'Curriculum creation failed due to image upload failure',
								);
								setModuleLoading(false);
								return;
							}
							if (uploadThumb.status === 201) {
								showNotification(
									<span className='d-flex align-items-center'>
										<Icon icon='Info' size='lg' className='me-1' />
										<span>Created Successfully</span>
									</span>,
									'Curriculum has been created successfully',
								);
								setIsOpen(false);
								setModuleLoading(false);
								await dispatch(
									getAllCourseModuleSlice({ pageNo: 1, page: 11 }) as any,
								);
							}
						}
					}
				} else {
					await dispatch(updateCourseModuleSlice({ id, values }) as any);
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Updated Successfully</span>
						</span>,
						'Curriculum has been updated successfully',
					);
					setModuleLoading(false);
					setIsOpen(false);
					setModuleLoading(false);
					await dispatch(getAllCourseModuleSlice({ pageNo: 1, page: 11 }) as any);
				}
			} catch (error) {
				console.warn(error);
			} finally {
				setIsOpen(false);
				setModuleLoading(false);
			}
		},
	});

	const pageSize = useMemo(
		() => ({
			pageNo: 1,
			page: 11,
		}),
		[],
	);

	useEffect(() => {
		dispatch(getAllCategorieSlice(pageSize) as any);
	}, [dispatch, pageSize]);

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

	const handleAddDescription = () => {
		formik.setFieldValue('description', [...formik.values.description, '']);
	};

	const handleDescriptionChange = (index: number, value: string) => {
		const newDescriptions = [...formik.values.description];
		newDescriptions[index] = value;
		formik.setFieldValue('description', newDescriptions);
	};

	if (id || id === '0') {
		return (
			<Modal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				size='md'
				titleId={id.toString()}
				isAnimation={false}>
				<ModalHeader setIsOpen={setIsOpen} className=''>
					<ModalTitle id={id}>
						{id === '0' ? 'New Curriculum' : 'Update Curriculum'}
					</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4 g-4 row '>
					<div>
						<Card>
							<CardBody>
								<div className='row g-4 col-md-12'>
									<div className='fs-6 fw-bold text-center'>
										Text-Based Content
									</div>
									<FormGroup id='course' label='Course'>
										<Select
											placeholder='Select course...'
											onChange={formik.handleChange}
											ariaLabel='Parent Enrollment select'
											onBlur={formik.handleBlur}
											value={formik.values.course}
											isValid={formik.isValid}
											isTouched={Boolean(formik.touched.course)}
											invalidFeedback={formik.errors.course as string}
											name='course'>
											{courseToAdd &&
												courseToAdd.map((c: any, i: any) => (
													<option key={i} value={c?._id}>
														{c?.Name}
													</option>
												))}
										</Select>
									</FormGroup>
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
															src={`https://e-learning-backend.cradle.services/${item?.avatar}`}
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
																	onClick={
																		handleAddThumbnailClick
																	}>
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
																Avatar helps your user get to know
																about the Curriculum.
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
									<FormGroup id='status' label='Status' className='col-md-12'>
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

									<FormGroup label='Description' className='col-md-12'>
										<>
											{formik.values.description.map(
												(description: any, idx: any) => (
													<div key={idx} className='my-2'>
														<Textarea
															id={`description-${idx}`}
															onChange={(e: any) =>
																handleDescriptionChange(
																	idx,
																	e.target.value,
																)
															}
															value={description}
															rows={2}
															onBlur={formik.handleBlur}
															isValid={formik.isValid}
															isTouched={Boolean(
																formik.touched.description,
															)}
															invalidFeedback={
																formik.errors.description as string
															}
														/>
													</div>
												),
											)}
											<Button
												className='mx-auto d-block'
												color='dark'
												isLight
												icon='Add'
												onClick={handleAddDescription}>
												More
											</Button>
										</>
									</FormGroup>
								</div>
							</CardBody>
						</Card>
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
		);
	}
	return null;
};
ModuleEditModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default ModuleEditModal;
