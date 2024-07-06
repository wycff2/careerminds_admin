import React, { useEffect, useMemo, useState } from 'react';
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
import Checks, { ChecksGroup } from '../../../../../components/bootstrap/forms/Checks';
import useSortableData from '../../../../../hooks/useSortableData';
import InputGroup, { InputGroupText } from '../../../../../components/bootstrap/forms/InputGroup';
import Popovers from '../../../../../components/bootstrap/Popovers';
import ParticipantsEditModal from './participantsEditModal';
import { getColorNameWithIndex } from '../../../../../common/data/enumColors';
import useDarkMode from '../../../../../hooks/useDarkMode';
import { participants } from './data';
import Modal, { ModalBody, ModalFooter } from '../../../../../components/bootstrap/Modal';
import { getAllUserSlice } from '../../services/slice/users';
import { useDispatch, useSelector } from 'react-redux';
import PageLoader from '../../component/helper/PageLoader';
import Unauthorised from '../../component/helper/unAuthorised';
import ChangeAuthorised from '../../component/helper/changeAuthorised';

const ParticipantsList = () => {
	const { darkModeStatus } = useDarkMode();
	const dispatch = useDispatch();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['5']);

	const formik = useFormik({
		initialValues: {
			searchInput: '',
			status: participants ? participants.map((s: any) => s.status) : [],
			moduleBelongsTo: '',
			minPrice: '',
			maxPrice: '',
		},

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const { user, users } = useSelector((state: any) => state?.users);
	const checkAuthOrNot = user?.role?.admin_permissions?.Participant;

	const filteredData = useMemo(() => {
		return users?.filter((f: any) => {
			return f?.Name?.toLowerCase().includes(formik.values.searchInput.toLowerCase());
		});
	}, [users, formik.values.searchInput]);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [deleteModal, setDeleteModal] = useState<boolean>(false);
	const [currentEditId, setCurrentEditId] = useState<any>('0');
	const [checkIsAuth, setCheckIsAuth] = useState<boolean>(false);

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

	// if (loading) {
	// 	return <PageLoader />;
	// }

	if (!user?.role?.admin_permissions?.Participant?.read) {
		return <Unauthorised />;
	}
	return (
		<PageWrapper title={dashboardPagesMenu.participantManagement.text} isProtected={true}>
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
									<FormGroup label='Payments' className='col-12'>
										<ChecksGroup>
											{participants.map((participant, index) => (
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
									</FormGroup>
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
					<div className='col-12'>
						<Card stretch>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th
												onClick={() => requestSort('name')}
												className='cursor-pointer text-decoration-underline'>
												Participants{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('name')}
													icon='FilterList'
												/>
											</th>
											{/* <th>Belongs To</th> */}
											<th>Email</th>
											<th>Contact</th>
											<th>Created At</th>
											<th>Status</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{dataPagination(items, currentPage, perPage).map(
											(i, idx) => (
												<tr key={i?._id}>
													<td>
														<div className='d-flex align-items-center'>
															<div className='flex-shrink-0'>
																<div
																	className='ratio ratio-1x1 me-3'
																	style={{
																		width: 48,
																		height: 48,
																	}}>
																	{!i?.thumb ? (
																		<div>
																			<img
																				className='bg-lo25 rounded-2 d-flex align-items-center justify-content-center'
																				style={{
																					width: 48,
																					height: 48,
																				}}
																				src={i?.thumb}
																				alt=''
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
																	{/* {i?.Name} */}
																</div>
																<div className='text-muted'>
																	<Icon icon='Label' />{' '}
																	<small>
																		{/* {i?.moduleBelongsTo} */}
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
															// href={`mailto:${i.email}`}
															>
															{/* {i.email} */}
														</Button>
													</td>
													<td>
														{/* <div>{i?.contactNumber}</div> */}
													</td>
													<td>
														{/* <div>{i?.createdAt}</div> */}
													</td>
													{/* <td>
													<div>{i.updatedAt}</div>
												</td> */}
													<td className='h5'>
														{/* <div
															className={`badge bg-${
																i.status === 'Active'
																	? 'success'
																	: 'danger'
															}`}>
															{i?.status}
														</div> */}
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
																		to={`${dashboardPagesMenu.usersManagement.path}/participant/${i._id}`}>
																		View
																	</Button>
																</DropdownItem>
																<DropdownItem>
																	<Button
																		icon='Edit'
																		tag='button'
																		onClick={() =>
																			openEditModal(i._id)
																		}>
																		Edit
																	</Button>
																</DropdownItem>
																{/* <DropdownItem>
																<Button
																	icon='Delete'
																	tag='button'
																	onClick={() =>
																		setDeleteModal(true)
																	}>
																	Delete
																</Button>
															</DropdownItem> */}
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
								label='customers'
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
						Are you sure you want to delete the Participants
					</h5>
				</ModalBody>
				<ModalFooter>
					<Button color='danger' onClick={() => setDeleteModal(false)}>
						Confirm
					</Button>
					<Button color='info' onClick={() => setDeleteModal(false)}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
			<ParticipantsEditModal
				setIsOpen={setEditModalStatus}
				isOpen={editModalStatus}
				id={currentEditId}
			/>
			<ChangeAuthorised isOpen={checkIsAuth} setIsOpen={setCheckIsAuth} />
		</PageWrapper>
	);
};

export default ParticipantsList;
