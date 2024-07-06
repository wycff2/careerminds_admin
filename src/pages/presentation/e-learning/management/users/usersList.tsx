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
import { getColorNameWithIndex } from '../../../../../common/data/enumColors';
import useDarkMode from '../../../../../hooks/useDarkMode';
import Modal, { ModalBody, ModalFooter } from '../../../../../components/bootstrap/Modal';
import UsersEditModal from './usersEditModal';
import { getAllUserSlice, removeUserSlice } from '../../services/slice/users';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../../../../utils/e-learning/common';
import moment from 'moment';
import showNotification from '../../../../../components/extras/showNotification';
import Checks from '../../../../../components/bootstrap/forms/Checks';
import NoContentYet from '../../component/helper/ContentNotYet';
import PageLoader from '../../component/helper/PageLoader';
import Unauthorised from '../../component/helper/unAuthorised';
import ChangeAuthorised from '../../component/helper/changeAuthorised';

const UsersList = () => {
	const { darkModeStatus } = useDarkMode();
	const dispatch = useDispatch();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['5']);

	const { users, loading, user } = useSelector((state: any) => state?.users);
	const usersFromStore = users;
	const checkAuthOrNot = user?.role?.admin_permissions?.Users;

	const formik = useFormik({
		initialValues: {
			searchInput: '',
			moduleBelongsTo: '',
			minPrice: '',
			maxPrice: '',
		},

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const [avlUsers, setAvlUsers] = useState<any[]>([]);

	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [deleteModal, setDeleteModal] = useState<boolean>(false);
	const [currentEditId, setCurrentEditId] = useState<any>('0');
	const [currentRemoveId, setCurrentRemoveId] = useState<any>('0');
	const [showConfirmDelete, setShowConfirmDelete] = useState<any>(false);
	const [checkIsAuth, setCheckIsAuth] = useState<boolean>(false);

	const filteredData = useMemo(() => {
		return avlUsers?.filter((f: any) => {
			return (
				f?.Name?.toLowerCase().includes(formik.values.searchInput.toLowerCase()) &&
				f?.role !== 'admin'
			);
		});
	}, [avlUsers, formik.values.searchInput]);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

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
		dispatch(getAllUserSlice(pageSize) as any);
	}, [dispatch, pageSize]);

	useEffect(() => {
		if (Array.isArray(usersFromStore)) {
			setAvlUsers(usersFromStore);
		}
	}, [usersFromStore]);

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

	const handleShowConfirmDeleteChange = (e: any) => {
		if (e.target.checked) {
			setShowConfirmDelete(true);
		} else setShowConfirmDelete(false);
	};

	if (loading) {
		return <PageLoader />;
	}

	if (!user?.role?.admin_permissions?.Users?.read) {
		return <Unauthorised />;
	}

	return (
		<Fragment>
			{loading ? (
				<PageLoader />
			) : (
				<PageWrapper
					title={dashboardPagesMenu.participantManagement.text}
					isProtected={true}>
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
								placeholder='Search customer...'
								onChange={formik.handleChange}
								value={formik.values.searchInput}
							/>
						</SubHeaderLeft>
						<SubHeaderRight>
							<Dropdown>
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
											<FormGroup label='Status' className='col-12'>
												<InputGroup>
													<Button color='primary' isLink>
														Active
													</Button>
													<InputGroupText>or</InputGroupText>
													<Button color='danger' isLink>
														Inactive
													</Button>
												</InputGroup>
											</FormGroup>
											{/* <FormGroup label='Payments' className='col-12'>
												<ChecksGroup>
													{users.map((participant, index) => (
														<Checks
															key={index}
															label={participant.moduleBelongsTo}
															value={participant.moduleBelongsTo}
															onChange={formik.handleChange}
															checked={formik.values.moduleBelongsTo.includes(
																participant.moduleBelongsTo,
															)}
														/>
													))}
												</ChecksGroup>
											</FormGroup> */}
										</div>
									</div>
								</DropdownMenu>
							</Dropdown>
							<SubheaderSeparator />
							<Button icon='PersonAdd' color='primary' isLight onClick={openAddModal}>
								New Participant
							</Button>
						</SubHeaderRight>
					</SubHeader>
					<Page>
						<div className='row h-100'>
							{filteredData ? (
								<div className='col-12'>
									<Card stretch>
										<CardBody isScrollable className='table-responsive'>
											<table className='table table-modern table-hover'>
												<thead>
													<tr>
														<th
															onClick={() => requestSort('Name')}
															className='cursor-pointer text-decoration-underline'>
															users{' '}
															<Icon
																size='lg'
																className={getClassNamesFor('Name')}
																icon='FilterList'
															/>
														</th>
														{/* <th>Belongs To</th> */}
														<th>Email</th>
														<th>Created At</th>
														<th>Updated At</th>
														<th>Status</th>
														<th>Actions</th>
													</tr>
												</thead>
												<tbody>
													{dataPagination(
														items,
														currentPage,
														perPage,
													).map((i, idx) => (
														<tr key={idx}>
															<td>
																<div className='d-flex align-items-center'>
																	<div className='flex-shrink-0'>
																		<div
																			className='ratio ratio-1x1 me-3'
																			style={{
																				width: 48,
																				height: 48,
																			}}>
																			{i?.avatar ? (
																				<div>
																					<img
																						className='bg-lo25 rounded-2 d-flex align-items-center justify-content-center'
																						style={{
																							width: 48,
																							height: 48,
																						}}
																						src={`https://e-learning-backend.cradle.services/${i?.avatar}`}
																						alt=''
																						loading='lazy'
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
																		<div className='text-muted'>
																			<Icon icon='Label' />{' '}
																			<small className=''>
																				{i?.uniqueId}
																			</small>
																		</div>
																	</div>
																</div>
															</td>
															{/* <td> */}
															{/* <div>{i.categoryBelongsTo}</div> */}
															{/* </td> */}
															<td>
																<Button
																	isLink
																	color='light'
																	icon='Email'
																	className='text-lowercase'
																	tag='a'
																	href={`mailto:${i.email}`}>
																	{i.email}
																</Button>
															</td>
															{/* <td>
															<div>{i.contactNumber}</div>
														</td> */}
															<td>
																<div>
																	{formatDate(i?.created_at)}
																</div>
																<small>
																	{moment(
																		i?.created_at,
																	).fromNow()}
																</small>
															</td>
															<td>
																<div>
																	{formatDate(i?.updated_at)}
																</div>
																<small>
																	{moment(
																		i?.updated_at,
																	).fromNow()}
																</small>
															</td>
															<td className='h5'>
																<div
																	className={`badge bg-${
																		!i.is_deleted
																			? 'success'
																			: 'danger'
																	}`}>
																	{!i.is_deleted
																		? 'Active'
																		: 'Inactive'}
																</div>
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
																				to={`${dashboardPagesMenu.usersManagement.path}/users/${i._id}`}>
																				View
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
													))}
												</tbody>
											</table>
										</CardBody>
										<PaginationButtons
											data={filteredData}
											label='customers'
											setCurrentPage={setCurrentPage}
											currentPage={currentPage}
											perPage={perPage}
											setPerPage={setPerPage}
										/>
									</Card>
								</div>
							) : (
								<NoContentYet content={'No users have created an account yet'} />
							)}
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
								Are you sure you want to delete the User?
							</h5>
							<p className='text-center text-danger'>
								This action cannot be undone. You are deleting the user permanently.
							</p>
							<div className='d-flex justify-content-center'>
								<label
									className='form-check-label me-2'
									htmlFor='confirmDeleteSwitch'>
									Confirm Remove User
								</label>
								<Checks
									checked={showConfirmDelete}
									id='example'
									name='example'
									onChange={handleShowConfirmDeleteChange}
									type='switch'
								/>
							</div>
						</ModalBody>
						{showConfirmDelete && (
							<ModalFooter>
								<Button
									color='danger'
									onClick={async () => {
										await dispatch(removeUserSlice(currentRemoveId) as any);
										await dispatch(getAllUserSlice(pageSize) as any);
										setDeleteModal(false);
										showNotification(
											<span className='d-flex align-items-center'>
												<Icon
													icon='DeleteDelete'
													size='lg'
													className='me-1'
												/>
												<span>Remove Successfully</span>
											</span>,
											`User has been permanently remove successfully`,
										);
									}}>
									Remove
								</Button>
								<Button color='info' onClick={() => setDeleteModal(false)}>
									Cancel
								</Button>
							</ModalFooter>
						)}
					</Modal>

					<UsersEditModal
						setIsOpen={setEditModalStatus}
						isOpen={editModalStatus}
						id={currentEditId}
					/>
				</PageWrapper>
			)}
			<ChangeAuthorised isOpen={checkIsAuth} setIsOpen={setCheckIsAuth} />
		</Fragment>
	);
};

export default UsersList;
