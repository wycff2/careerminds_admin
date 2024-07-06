import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
} from '../../../../../layout/SubHeader/SubHeader';
import Page from '../../../../../layout/Page/Page';
import { dashboardPagesMenu } from '../../../../../menu';
import Card, { CardBody } from '../../../../../components/bootstrap/Card';
import { getFirstLetter } from '../../../../../helpers/helpers';
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
import PAYMENTS from '../../../../../common/data/enumPaymentMethod';
import useSortableData from '../../../../../hooks/useSortableData';
import CategoryEditModal from './categoryEditModal';
import { getColorNameWithIndex } from '../../../../../common/data/enumColors';
import useDarkMode from '../../../../../hooks/useDarkMode';
import Modal, { ModalBody, ModalFooter } from '../../../../../components/bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategorieSlice, removeCategorieSlice, updateCategorieSlice } from '../../services/slice/course';
import { capitalize, formatDate } from '../../../../../utils/e-learning/common';
import moment from 'moment';
import showNotification from '../../../../../components/extras/showNotification';
import PageLoader from '../../component/helper/PageLoader';
import Unauthorised from '../../component/helper/unAuthorised';
import ChangeAuthorised from '../../component/helper/changeAuthorised';
import ImageViewer from '../../component/helper/ImageViewer';

const CategoryList = () => {
	const { darkModeStatus } = useDarkMode();
	const dispatch = useDispatch();

	const { category } = useSelector((state: any) => state);
	const categoryFromStore = category?.categories?.data;

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['5']);
	const [avlCategory, setAvlCategory] = useState<any[]>([]);
	const [checkIsAuth, setCheckIsAuth] = useState<boolean>(false);
	const [viewImage, setViewImage] = useState<boolean>(false);
	const [imageSrc, setImageSrc] = useState<any>(null);

	const formik = useFormik({
		initialValues: {
			searchInput: '',
			payment: Object.keys(PAYMENTS).map((i) => PAYMENTS[i].name),
			minPrice: '',
			maxPrice: '',
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData = useMemo(() => {
		return avlCategory?.filter((f: any) => {
			return f.Name.toLowerCase().includes(formik.values.searchInput.toLowerCase());
		});
	}, [avlCategory, formik.values.searchInput]);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [currentEditId, setCurrentEditId] = useState<any>('0');
	const [currentRemoveId, setCurrentRemoveId] = useState<any>('0');
	const [deleteModal, setDeleteModal] = useState<boolean>(false);

	const { user, loading } = useSelector((state: any) => state?.users);
	const checkAuthOrNot = user?.role?.admin_permissions?.Category;

	const openEditModal = (id: any) => {
		if (!checkAuthOrNot?.write) {
			setCheckIsAuth(true);
		} else {
			setCurrentEditId(id as any);
			setEditModalStatus(true);
		}
	};

	const openAddModal = () => {
		if (!checkAuthOrNot?.write) {
			setCheckIsAuth(true);
		} else {
			setCurrentEditId('0');
			setEditModalStatus(true);
		}
	};

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
		if (Array.isArray(categoryFromStore)) {
			setAvlCategory(categoryFromStore);
		}
	}, [categoryFromStore, deleteModal]);

	const handleRemoveModule = useCallback(
		(removeModuleId: any) => {
			if (!checkAuthOrNot?.delete) {
				setCheckIsAuth(true);
			} else {
				setCurrentRemoveId(removeModuleId);
				setDeleteModal(true);
			}
		},
		[checkAuthOrNot],
	);

	const handleThumbnailClick = (src: any) => {
		setImageSrc(src);
		setViewImage(true);
	};

	const handleUpdateStatus = useCallback(
		async (moduleId: any, updatedStatus: { status: string }) => {
			const statusUpdateData = {
				id: moduleId.toString(),
				values: updatedStatus,
			};
			try {
				const response = await dispatch(updateCategorieSlice(statusUpdateData) as any);
				if (response.payload.isSuccess) {
					dispatch(getAllCategorieSlice(pageSize) as any);
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='check' size='lg' className='me-1' />
							<span>Update successful</span>
						</span>,
						'Course status has been successfully updated.',
					);
				}
			} catch (error) {
				console.error('Error updating status:', error);
			}
		},
		[dispatch, pageSize],
	);

	if (loading) {
		return <PageLoader />;
	}

	if (!user?.role?.admin_permissions?.Category?.read) {
		return <Unauthorised />;
	}

	return (
		<PageWrapper title={dashboardPagesMenu.courseManagement.text} isProtected={true}>
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
						placeholder='Search Course...'
						onChange={formik.handleChange}
						value={formik.values.searchInput}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					{/* <Dropdown>
						<DropdownToggle hasIcon={false}>
							<Button
								icon='FilterAlt'
								color='dark'
								isLight
								className='btn-only-icon position-relative'>
								{data.length !== filteredData.length && (
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
									<FormGroup label='Balance' className='col-12'>
										<InputGroup>
											<Input
												id='minPrice'
												ariaLabel='Minimum price'
												placeholder='Min.'
												onChange={formik.handleChange}
												value={formik.values.minPrice}
											/>
											<InputGroupText>to</InputGroupText>
											<Input
												id='maxPrice'
												ariaLabel='Maximum price'
												placeholder='Max.'
												onChange={formik.handleChange}
												value={formik.values.maxPrice}
											/>
										</InputGroup>
									</FormGroup>
									<FormGroup label='Payments' className='col-12'>
										<ChecksGroup>
											{Object.keys(PAYMENTS).map((payment) => (
												<Checks
													key={PAYMENTS[payment].name}
													id={PAYMENTS[payment].name}
													label={PAYMENTS[payment].name}
													name='payment'
													value={PAYMENTS[payment].name}
													onChange={formik.handleChange}
													checked={formik.values.payment.includes(
														PAYMENTS[payment].name,
													)}
												/>
											))}
										</ChecksGroup>
									</FormGroup>
								</div>
							</div>
						</DropdownMenu>
					</Dropdown> */}
					{/* <SubheaderSeparator /> */}
					<Button icon='PersonAdd' color='primary' isLight onClick={openAddModal}>
						New Course
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
												onClick={() => requestSort('name')}
												className='cursor-pointer text-decoration-underline'>
												Course{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('name')}
													icon='FilterList'
												/>
											</th>
											{/* <th>Parent Category</th> */}
											<th>Created At</th>
											<th>Updated At</th>
											<th>Price</th>
											<th>Status</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{dataPagination(items, currentPage, perPage).map(
											(i, idx) => (
												<tr key={idx}>
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
																	{i.Name}
																</div>
															</div>
														</div>
													</td>
													{/* <td>
													<div>{i.description.slice(0, 25)}</div>
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
														<div>
															<strong>{`$${i?.offerPrice}`}</strong>
														</div>
														<small>
															{`$${i?.price} | ${i?.discount}% Off`}
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
																		handleUpdateStatus(i?._id, {
																			status: 'active',
																		})
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
																		handleUpdateStatus(i?._id, {
																			status: 'inactive',
																		})
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
																{/* <DropdownItem>
																	<Button
																		isDisable
																		icon='Visibility'
																		tag='a'
																		to={`${dashboardPagesMenu.categoryManagement.path}/category/${i.id}`}>
																		View
																	</Button>
																</DropdownItem> */}
																<DropdownItem>
																	<Button
																		icon='Edit'
																		tag='button'
																		onClick={() =>
																			openEditModal(i?._id)
																		}>
																		Edit
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
								label='Courses'
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
					<h5 className='text-center'>Are you sure you want to delete the Category</h5>
				</ModalBody>
				<ModalFooter>
					<Button
						color='danger'
						onClick={async () => {
							await dispatch(removeCategorieSlice(currentRemoveId) as any);
							await dispatch(getAllCategorieSlice(pageSize) as any);
							setDeleteModal(false);
							showNotification(
								<span className='d-flex align-items-center'>
									<Icon icon='DeleteDelete' size='lg' className='me-1' />
									<span>Delete Successfully</span>
								</span>,
								`Course has been delete successfully`,
							);
						}}>
						Confirm
					</Button>
					<Button color='info' onClick={() => setDeleteModal(false)}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
			<CategoryEditModal
				setIsOpen={setEditModalStatus}
				isOpen={editModalStatus}
				id={currentEditId}
			/>
			<ChangeAuthorised isOpen={checkIsAuth} setIsOpen={setCheckIsAuth} />
			<ImageViewer
				isOpen={viewImage}
				setIsOpen={() => setViewImage(false)}
				image={imageSrc}
			/>
		</PageWrapper>
	);
};

export default CategoryList;
