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

import Button from '../../../../../components/bootstrap/Button';
import USERS, { sam } from '../../../../../common/data/userDummyData';
import Avatar from '../../../../../components/Avatar';
import ModuleValidate from './validationEditForm';
import Card, { CardBody } from '../../../../../components/bootstrap/Card';
import VideoPlayer from '../../VideoPlayer/video';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourseModuleSlice, removeCourseModuleSlice } from '../../services/slice/modules';
import { updateVideoCourseModule, updateVideothumbCourseModule } from '../../services/api/modules';
import compressImage from '../../component/helper/resizeImage';
import { setUploadSlice } from '../../services/slice/upload';

interface IModuleEditModalVideoContentProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}
const ModuleEditModalVideoContent: FC<IModuleEditModalVideoContentProps> = ({
	id,
	isOpen,
	setIsOpen,
}) => {
	const [avlModules, setAvlModule] = useState<any[]>([]);

	const { courseModule } = useSelector((state: any) => state);
	const modulesFromStore = courseModule.courseModules;

	useEffect(() => {
		if (Array.isArray(modulesFromStore)) {
			setAvlModule(modulesFromStore);
		}
	}, [modulesFromStore]);
	const itemData = id ? avlModules.filter((item) => item?._id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};

	const dispatch = useDispatch();

	const [uploadProgress, setUploadProgress] = useState<any>(null);
	const [userCreated, setUserCreated] = useState<boolean>(false);

	const [selectedPicture, setSelectedPicture] = useState<string | ArrayBuffer | null | any>(null);

	const [selectedVideo, setSelectedVideo] = useState<string | ArrayBuffer | null | any>(null);
	const [videosUrl, setVideosUrl] = useState<any>(null);

	const fileInputRef = React.useRef<HTMLInputElement>(null);
	const fileVideoRef = React.useRef<HTMLInputElement>(null);

	const pageSize = useMemo(
		() => ({
			pageNo: 1,
			page: 11,
		}),
		[],
	);
	const calculateTotalProgress = (progresses: number[]) => {
		const total = progresses.reduce((acc, progress) => acc + progress, 0);
		return total / progresses.length;
	};

	const formik = useFormik({
		initialValues: {
			course: '6662d9812e6b542210677a0c',
			Name: item?.Name || '',
			status: item?.status || 'active',
			description: item?.description || [''],
			avatar: item?.avatar,
			thumbnail: item?.thumbnail,
			video: item?.thumbnail,
		},
		validate: ModuleValidate,
		enableReinitialize: true,
		onSubmit: async (values, { resetForm }) => {
			try {
				setIsOpen(false);
				let progressUpdates: number[] = [];
				const updateProgress = (progressEvent: any, index: number) => {
					const percentCompleted = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total,
					);
					progressUpdates[index] = percentCompleted;
					setUploadProgress(calculateTotalProgress(progressUpdates));
					dispatch(setUploadSlice({ uploadId: ID, progress: percentCompleted }));
				};
				setUserCreated(false);

				const ID = id;

				if (selectedPicture) {
					const resizedPicture = await compressImage(selectedPicture); 
					const uploadVideoThumb = await updateVideothumbCourseModule({
						id: ID,
						thumbnail: resizedPicture,
						config: (e: any) => updateProgress(e, 1),
					});
					if (uploadVideoThumb.status !== 201) {
						await dispatch(removeCourseModuleSlice(ID) as any);
						showNotification(
							<span className='d-flex align-items-center'>
								<Icon icon='danger' size='lg' className='me-1' />
								<span>Creating module failed</span>
							</span>,
							'Module creation failed due to video thumbnail upload failure',
						);
						return;
					}
				}

				if (selectedVideo) {
					const uploadVideo = await updateVideoCourseModule({
						id: ID,
						video: selectedVideo,
						config: (e: any) => updateProgress(e, 2),
					});
					if (uploadVideo.status !== 201) {
						await dispatch(removeCourseModuleSlice(ID) as any);
						showNotification(
							<span className='d-flex align-items-center'>
								<Icon icon='danger' size='lg' className='me-1' />
								<span>Creating module failed</span>
							</span>,
							'Module creation failed due to video upload failure',
						);
						return;
					}
				}

				setUserCreated(true);

				await dispatch(getAllCourseModuleSlice({ pageNo: 1, page: 11 }) as any);

				if (userCreated) {
					setUploadProgress(0);
					resetForm();
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>{id === '0' ? 'Created' : 'Updated'} Successfully</span>
						</span>,
						`Module has been ${id === '0' ? 'created' : 'updated'} successfully`,
					);
				}
			} catch (error) {
				console.warn(error);
			} finally {
				resetForm();
				setUploadProgress(null);
				setUserCreated(false);
			}
		},
	});

	// video thubmbnail
	const openFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];

		setSelectedPicture(file as any);
	};

	const deleteThumbnail = () => {
		setSelectedPicture(null);
	};

	// video player
	const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			setSelectedVideo(file);
			const videosURL = URL.createObjectURL(file);
			setVideosUrl(videosURL);
		}
	};

	const handleAddVideoClick = () => {
		if (fileVideoRef.current) {
			fileVideoRef.current.click();
		}
	};

	const handleDeleteVideo = () => {
		setSelectedVideo(null);
		setVideosUrl(null);
		// Reset the file input value
		if (fileVideoRef.current) {
			fileVideoRef.current.value = '';
		}
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
					<ModalTitle id={id}>{id === '0' ? 'New Module' : 'Update Module'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4 g-4 row '>
					<div>
						<Card>
							<CardBody>
								<div className='row g-4 col-md-12'>
									<div className='fs-6 fw-bold text-center py-2'>
										Video-Based Content
									</div>
									<FormGroup
										id='title'
										label='Video Thumbnail'
										className='col-md-6 my-3'>
										<div className='col-12'>
											<div className='row g-4 align-items-center'>
												<div className='col-10'>
													{selectedPicture ? (
														<Avatar
															src={URL.createObjectURL(
																selectedPicture,
															)}
															color={USERS.JOHN.color}
															rounded={0}
															style={{
																width: '120%',
																height: 'auto',
																backgroundSize: 'cover',
															}}
														/>
													) : item?.thumbnail ? (
														<Avatar
															src={`https://e-learning-backend.cradle.services/${item?.thumbnail}`}
															color={USERS.JOHN.color}
															rounded={0}
															style={{
																width: '120%',
																height: 'auto',
																backgroundSize: 'cover',
															}}
														/>
													) : (
														<Avatar
															src={sam.src}
															color={USERS.JOHN.color}
															rounded={0}
															style={{
																width: '120%',
																height: 'auto',
																backgroundSize: 'cover',
															}}
														/>
													)}
													<input
														type='file'
														ref={fileInputRef}
														style={{ display: 'none' }}
														onChange={handleFileInputChange}
													/>
												</div>

												<div className='col-12'>
													{!selectedPicture ? (
														<Button
															className='d-block mx-auto'
															color='primary'
															isLight
															icon='AddAPhoto'
															onClick={openFileInput}>
															{item?.thumbnail || selectedPicture
																? 'Change Thumbnail'
																: 'Add Thumbnail'}
														</Button>
													) : (
														<Button
															color='danger'
															isLight
															icon='Delete'
															onClick={deleteThumbnail}>
															Delete Thumbnail
														</Button>
													)}
												</div>
											</div>
										</div>
									</FormGroup>

									<FormGroup
										id='title'
										label='Video Trailer'
										className='col-md-6 my-3'>
										<div className='col-12'>
											<div className=' g-4 align-items-center'>
												<input
													type='file'
													accept='video/*'
													ref={fileVideoRef}
													style={{ display: 'none' }}
													onChange={handleVideoFileChange}
												/>
												<div className='col-12'>
													{item?.video || videosUrl ? (
														<>
															<VideoPlayer
																url={
																	videosUrl ||
																	`https://e-learning-backend.cradle.services/${item?.video}`
																}
																height='auto'
																width={'100%'}
																controls
															/>
															<Button
																className='d-block mx-auto mt-4'
																color='danger'
																isLight
																icon='Delete'
																onClick={handleDeleteVideo}>
																Remove Video
															</Button>
														</>
													) : (
														<div>
															<Button
																className='py-5'
																rounded={0}
																style={{
																	width: '100%',
																	height: '100px',
																	cursor: 'alias',
																}}
																color='light'>
																Add Video
															</Button>
														</div>
													)}
												</div>

												<div className='col-12 mt-4'>
													{!selectedVideo ? (
														<Button
															className='d-block mx-auto'
															color='primary'
															isLight
															icon='AddAPhoto'
															onClick={handleAddVideoClick}>
															{item?.video || selectedVideo
																? 'Change Video'
																: 'Add Video'}
														</Button>
													) : undefined}
												</div>
											</div>
										</div>
									</FormGroup>
								</div>
							</CardBody>
						</Card>
					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4 '>
					<Button color='info' onClick={formik.handleSubmit}>
						{id === '0' ? 'Save' : 'Update'}
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
	return null;
};
ModuleEditModalVideoContent.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default ModuleEditModalVideoContent;
