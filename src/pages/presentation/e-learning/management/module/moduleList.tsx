import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../../../layout/SubHeader/SubHeader';
import Page from '../../../../../layout/Page/Page';
import { dashboardPagesMenu } from '../../../../../menu';
import Card, { CardBody } from '../../../../../components/bootstrap/Card';
import { getFirstLetter } from '../../../../../helpers/helpers';
import data from '../../../../../common/data/dummyCustomerData';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../../components/PaginationButtons';
import Button from '../../../../../components/bootstrap/Button';
import Icon from '../../../../../components/icon/Icon';
import Input from '../../../../../components/bootstrap/forms/Input';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../../components/bootstrap/Dropdown';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
import useSortableData from '../../../../../hooks/useSortableData';
import InputGroup, { InputGroupText } from '../../../../../components/bootstrap/forms/InputGroup';
import Popovers from '../../../../../components/bootstrap/Popovers';
import ModuleEditModal from './moduleEditModal';

import useDarkMode from '../../../../../hooks/useDarkMode';
// import { modules } from './data';
import Modal, { ModalBody, ModalFooter } from '../../../../../components/bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllCourseModuleSlice,
	getCourseModulesByCategorySlice,
	removeCourseModuleSlice,
	updateCourseModuleSlice,
} from '../../services/slice/modules';
import { getColorNameWithIndex } from '../../../../../common/data/enumColors';
import moment from 'moment';
import showNotification from '../../../../../components/extras/showNotification';
import ModuleEditModalVideoContent from './modulevideoCintentModal';
import PageLoader from '../../component/helper/PageLoader';
import { getAllCategorieSlice } from '../../services/slice/course';
import Checks, { ChecksGroup } from '../../../../../components/bootstrap/forms/Checks';
import Unauthorised from '../../component/helper/unAuthorised';
import ChangeAuthorised from '../../component/helper/changeAuthorised';
import Cookies from 'js-cookie';
import ImageViewer from '../../component/helper/ImageViewer';
import { capitalize } from '../../../../../utils/e-learning/common';
import Spinner from '../../../../../components/bootstrap/Spinner';
const ModuleList = () => {
	const { darkModeStatus } = useDarkMode();
	const dispatch = useDispatch();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['5']);
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [editModalVideoContentStatus, setEditModalVideoContentStatus] = useState<boolean>(false);
	const [currentEditId, setCurrentEditId] = useState<any>('0');
	const [videoCurrentEditId, setVideoCurrentEditId] = useState<any>('');
	const [avlModules, setAvlModule] = useState<any[]>([]);
	const [deleteModal, setDeleteModal] = useState<boolean>(false);
	const [currentRemoveId, setCurrentRemoveId] = useState<any>('0');
	const [checkIsAuth, setCheckIsAuth] = useState<boolean>(false);
	const [courseId, setCourseId] = useState<any>('');
	const [resetFilters, setResetFilters] = useState<boolean>(false);
	const [viewImage, setViewImage] = useState<boolean>(false);
	const [imageSrc, setImageSrc] = useState<any>(null);
	const [updateStatusLoading, setUpdateStatusLoading] = useState<boolean>(false)

	const { courseModules, loading } = useSelector((state: any) => state?.courseModule);
	const { categories } = useSelector((state: any) => state?.category);
	const modulesFromStore = courseModules;
	const uploadings = useSelector((state: any) => state?.uploadings);

	// console.log('progressprogressprogressprogress', uploadings);

	const formik = useFormik({
		initialValues: {
			searchInput: '',
			course: courseId || '',
			minPrice: '',
			maxPrice: '',
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData = useMemo(() => {
		return avlModules?.filter((f: any) => {
			return f.Name.toLowerCase().includes(formik.values.searchInput.toLowerCase());
		});
	}, [avlModules, formik.values.searchInput]);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	const { user } = useSelector((state: any) => state?.users);
	const checkAuthOrNot = user?.role?.admin_permissions?.Module;

	const openEditModal = useCallback(
		(id: any) => {
			if (!checkAuthOrNot?.write) {
				setCheckIsAuth(true);
			} else {
				setCurrentEditId(id as any);
				setEditModalStatus(true);
			}
		},
		[checkAuthOrNot],
	);

	const openEditModalVideo = useCallback(
		(id: any) => {
			if (!checkAuthOrNot?.write) {
				setCheckIsAuth(true);
			} else {
				setVideoCurrentEditId(id as any);
				setEditModalVideoContentStatus(true);
			}
		},
		[checkAuthOrNot],
	);

	const openAddModal = useCallback(() => {
		if (!checkAuthOrNot?.write) {
			setCheckIsAuth(true);
		} else {
			setCurrentEditId('0');
			setEditModalStatus(true);
		}
	}, [checkAuthOrNot]);

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

	useEffect(() => {
		if (courseId && resetFilters) {
			if(avlModules.length < 1){
				
			}
			dispatch(getCourseModulesByCategorySlice(courseId) as any);
		} else {
			dispatch(getAllCourseModuleSlice(pageSize) as any);
		}
	}, [dispatch, pageSize, courseId, resetFilters]);

	useEffect(() => {
		if (Array.isArray(modulesFromStore)) {
			setAvlModule(modulesFromStore);
		}
	}, [modulesFromStore]);

	const handleThumbnailClick = (src: any) => {
		setImageSrc(src);
		setViewImage(true);
	};

	const handleUpdateStatus = useCallback(
		async (moduleId: any, updatedStatus: { status: string }) => {
			setUpdateStatusLoading(true);
			const statusUpdateData = {
				id: moduleId.toString(),
				values: updatedStatus,
			};
			try {
				const response = await dispatch(updateCourseModuleSlice(statusUpdateData) as any);
				if (response.payload.isSuccess) {
					setUpdateStatusLoading(false);
					dispatch(getAllCourseModuleSlice(pageSize) as any);
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='check' size='lg' className='me-1' />
							<span>Update successful</span>
						</span>,
						'Curriculum status has been successfully updated.',
					);
				}
			} catch (error) {
				console.error('Error updating status:', error);
			}
		},
		[dispatch, pageSize],
	);

	const handleRemoveModule = useCallback(
		async (removeModuleId: any) => {
			if (!checkAuthOrNot?.delete) {
				setCheckIsAuth(true);
			} else {
				setCurrentRemoveId(removeModuleId);
				setDeleteModal(true);
			}
		},
		[checkAuthOrNot],
	);

	const confirmDelete = async () => {
		await dispatch(removeCourseModuleSlice(currentRemoveId) as any);
		if (courseId && resetFilters) {
			dispatch(getCourseModulesByCategorySlice(courseId) as any);
		} else {
			dispatch(getAllCourseModuleSlice(pageSize) as any);
		}
		setDeleteModal(false);
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='DeleteDelete' size='lg' className='me-1' />
				<span>Delete Successfully</span>
			</span>,
			`Course has been deleted successfully`,
		);
	};

	const formatDate = useCallback((dateString: any) => {
		const date = moment(dateString);
		return date.format('DD MMM YYYY');
	}, []);

	// if (loading) {
	// 	return <PageLoader />;
	// }

	if (!user?.role?.admin_permissions?.Module?.read) {
		return <Unauthorised />;
	}

	return (
		<Fragment>
			{/* {loading ? (
				<PageLoader />
			) : ( */}
			<PageWrapper title={dashboardPagesMenu.curriculumManagement.text} isProtected={true}>
				<SubHeader className='mt-3'>
					<SubHeaderLeft>
						<label
							className='border-0 bg-transparent cursor-pointer me-0'
							htmlFor='searchInput'>
							<Icon icon='Search' size='2x' color='primary' />
						</label>
						<Input
							id='searchInput'
							type='search'
							className='border-0 shadow-none bg-transparent'
							placeholder='Search curriculum...'
							onChange={formik.handleChange}
							value={formik.values.searchInput}
						/>
					</SubHeaderLeft>
					<SubHeaderRight>
						{uploadings && uploadings.length < 1 ? null : (
							<Dropdown>
								<DropdownToggle hasIcon={false}>
									<Button
										icon='Upload'
										color='dark'
										isLight
										className='btn-only-icon position-relative'>
										{uploadings.length > 0 && (
											<Popovers desc='Uploading...' trigger='hover'>
												<span className='position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2'>
													<span className='visually-hidden'>
														there is Uploading
													</span>
												</span>
											</Popovers>
										)}
									</Button>
								</DropdownToggle>
								<DropdownMenu isAlignmentEnd size='lg'>
									<div className='container py-2'>
										<div className='row'>
											<div className='row g-3'>
												{uploadings?.map((u: any, idx: any) => {
													const module = avlModules.find(
														(mod: any) => mod._id === u?.uploadId,
													);
													return (
														<div key={idx} className='my-2 mx-1'>
															<div className='d-flex justify-content-between mt-3'>
																<div className='fw-bold'>
																	{module?.Name ||
																		'curriculum not found'}
																</div>
															</div>
															<div
																className='text-end mt-auto'
																style={{ marginBottom: '-2px' }}>
																<small>
																	{u?.progress === 100
																		? 'Completed'
																		: `${u?.progress}%`}
																</small>
															</div>
															<FormGroup className='text-center ms-auto col-12 vh-50'>
																<div className='align-items-center justify-content-between'>
																	<div className='flex-grow-1'>
																		<div
																			className='progress'
																			style={{
																				height: '5px',
																			}}>
																			<div
																				className='progress-bar'
																				role='progressbar'
																				style={{
																					width: `${u?.progress}%`,
																				}}
																				aria-valuenow={
																					u?.progress
																				}
																				aria-valuemin={0}
																				aria-valuemax={
																					100
																				}></div>
																		</div>
																	</div>
																</div>
															</FormGroup>
														</div>
													);
												})}
											</div>
										</div>
									</div>
								</DropdownMenu>
							</Dropdown>
						)}

						<Dropdown>
							<DropdownToggle hasIcon={false}>
								<Button
									icon='FilterAlt'
									color='dark'
									isLight
									className='btn-only-icon position-relative'>
									{resetFilters && (
										<Popovers desc='Filtering applied' trigger='hover'>
											<span className='position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2'>
												<span className='visually-hidden'>
													there is filtering
												</span>
											</span>
										</Popovers>
									)}
								</Button>
							</DropdownToggle>
							<DropdownMenu isAlignmentEnd size='lg'>
								<div className='container py-2'>
									<div className='row g-3'>
										<FormGroup label='Courses' className='col-12'>
											<ChecksGroup>
												{categories?.data?.map((cat: any) => (
													<Checks
														type='radio'
														key={cat?._id}
														id={cat?._id}
														label={cat?.Name}
														name='course'
														value={cat?._id}
														onChange={(e: any) => {
															setCourseId(e.target.value);
															setResetFilters(true);
														}}
														checked={
															courseId === cat?._id && resetFilters
																? cat._id
																: ''
														}
													/>
												))}
											</ChecksGroup>
										</FormGroup>
										<div className='col-12'>
											<Button
												color='primary'
												isOutline
												className='w-100'
												onClick={() => setResetFilters(false)}>
												Reset filter
											</Button>
										</div>
									</div>
								</div>
							</DropdownMenu>
						</Dropdown>
						<SubheaderSeparator />
						<Button icon='PersonAdd' color='primary' isLight onClick={openAddModal}>
							New Curriculum
						</Button>
					</SubHeaderRight>
				</SubHeader>
				<Page>
					<div className='row h-100'>
						<div className='col-12'>
							<Card stretch>
								<CardBody isScrollable className='table-responsive'>
									<table className='table table-modern table-hover'>
										<thead>
											<tr>
												<th
													onClick={() => requestSort('Name')}
													className='cursor-pointer text-decoration-underline'>
													Module{' '}
													<Icon
														size='lg'
														className={getClassNamesFor('Name')}
														icon='FilterList'
													/>
												</th>
												{/* <th>Description</th> */}
												<th>Created At</th>
												<th>Updated At</th>
												<th>Status</th>
												<th>Actions</th>
											</tr>
										</thead>
										<tbody>
											{dataPagination(items, currentPage, perPage).map(
												(i, idx) => (
													<tr key={i._id}>
														<td>
															<div className='d-flex align-items-center'>
																<div className='flex-shrink-0'>
																	<div
																		className='ratio ratio-1x1 me-3'
																		style={{ width: 48 }}>
																		{i?.avatar ? (
																			<div>
																				<img
																					className='bg-lo25 rounded-2 d-flex align-items-center justify-content-center'
																					style={{
																						width: 48,
																						height: 48,
																					}}
																					src={
																						i?.avatar &&
																						`https://e-learning-backend.cradle.services/${i?.avatar}`
																					}
																					loading='lazy'
																					alt=''
																					onClick={() =>
																						handleThumbnailClick(
																							i.avatar,
																						)
																					}
																				/>
																			</div>
																		) : (
																			<div
																				className={`bg-l${
																					darkModeStatus
																						? 'o25'
																						: '25'
																				}-${getColorNameWithIndex(
																					idx,
																				)} text-${getColorNameWithIndex(
																					idx,
																				)} rounded-2 d-flex align-items-center justify-content-center`}>
																				<span className='fw-bold'>
																					{getFirstLetter(
																						i?.Name,
																					)}
																				</span>
																			</div>
																		)}
																	</div>
																</div>
																<div className='flex-grow-1'>
																	<div className='fs-6 fw-bold'>
																		{i?.Name}
																	</div>
																	<div className='text-muted'>
																		<Icon icon='Label' />{' '}
																		<small>
																			{i?.course?.Name}
																		</small>
																	</div>
																</div>
															</div>
														</td>
														{/* <td>
														{i.description.map((desc: any) => (
															<div key={desc._id}>{desc}</div>
														))}
													</td> */}

														<td>
															<div>{formatDate(i?.created_at)}</div>
															<small>
																{moment(i?.created_at).fromNow()}
															</small>
														</td>
														<td>
															<div>{formatDate(i?.updated_at)}</div>
															<small>
																{moment(i?.updated_at).fromNow()}
															</small>
														</td>
														<td>
															<Dropdown>
																<DropdownToggle hasIcon={false}>
																	<Button
																		isLink
																		color={
																			i?.status === 'active'
																				? 'success'
																				: 'danger'
																		}
																		icon='Circle'
																		className='text-nowrap'>
																		{capitalize(i?.status)}
																	</Button>
																</DropdownToggle>
																<DropdownMenu>
																	<DropdownItem
																		onClick={() =>
																			handleUpdateStatus(
																				i?._id,
																				{
																					status: 'active',
																				},
																			)
																		}>
																		<div>
																			<Icon
																				icon='Circle'
																				color='success'
																			/>
																			Active
																		</div>
																	</DropdownItem>
																	<DropdownItem
																		onClick={() =>
																			handleUpdateStatus(
																				i?._id,
																				{
																					status: 'inactive',
																				},
																			)
																		}>
																		<div>
																			<Icon
																				icon='Circle'
																				color='danger'
																			/>
																			Inactive
																		</div>
																	</DropdownItem>
																</DropdownMenu>
															</Dropdown>
														</td>

														<td>
															<Dropdown>
																<DropdownToggle hasIcon={false}>
																	<Button
																		icon='MoreHoriz'
																		color='dark'
																		isLight
																		shadow='sm'
																	/>
																</DropdownToggle>
																<DropdownMenu isAlignmentEnd>
																	<DropdownItem>
																		<Button
																			icon='Visibility'
																			tag='a'
																			to={`${dashboardPagesMenu.curriculumManagement.path}/curriculum/${i?._id}`}>
																			View
																		</Button>
																	</DropdownItem>
																	<DropdownItem>
																		<Button
																			icon='Edit'
																			tag='button'
																			onClick={() =>
																				openEditModal(
																					i?._id,
																				)
																			}>
																			Edit
																		</Button>
																	</DropdownItem>
																	<DropdownItem>
																		<Button
																			icon='VideoCameraBack'
																			tag='button'
																			onClick={() =>
																				openEditModalVideo(
																					i?._id,
																				)
																			}>
																			Add Video Content
																		</Button>
																	</DropdownItem>
																	<DropdownItem>
																		<Button
																			icon='Delete'
																			tag='button'
																			onClick={() =>
																				handleRemoveModule(
																					i._id,
																				)
																			}>
																			Delete
																		</Button>
																	</DropdownItem>
																</DropdownMenu>
															</Dropdown>
														</td>
													</tr>
												),
											)}
										</tbody>
									</table>
								</CardBody>
								<PaginationButtons
									data={filteredData}
									label='curriculum'
									setCurrentPage={setCurrentPage}
									currentPage={currentPage}
									perPage={perPage}
									setPerPage={setPerPage}
								/>
							</Card>
						</div>
					</div>
				</Page>
				<Modal
					isOpen={deleteModal}
					id='example-modal'
					isAnimation={false}
					isCentered
					setIsOpen={function noRefCheck() {}}
					size='md'
					titleId='example-title'>
					<ModalBody className='p-5'>
						<h5 className='text-center'>
							Are you sure you want to delete the Category
						</h5>
					</ModalBody>
					<ModalFooter>
						<Button color='danger' onClick={confirmDelete}>
							Confirm
						</Button>
						<Button color='info' onClick={() => setDeleteModal(false)}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
				<ModuleEditModal
					setIsOpen={setEditModalStatus}
					isOpen={editModalStatus}
					id={currentEditId}
				/>
				<ModuleEditModalVideoContent
					setIsOpen={setEditModalVideoContentStatus}
					isOpen={editModalVideoContentStatus}
					id={videoCurrentEditId}
				/>
				<ChangeAuthorised isOpen={checkIsAuth} setIsOpen={setCheckIsAuth} />
				<ImageViewer
					isOpen={viewImage}
					setIsOpen={() => setViewImage(false)}
					image={imageSrc}
				/>
			</PageWrapper>
			{/* )} */}
		</Fragment>
	);
};

export default ModuleList;
