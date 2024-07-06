import React, { useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../../layout/SubHeader/SubHeader';
import Page from '../../../../layout/Page/Page';
import { dashboardPagesMenu, demoPagesMenu } from '../../../../menu';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import { getFirstLetter } from '../../../../helpers/helpers';
import data from '../../../../common/data/dummyCustomerData';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../components/PaginationButtons';
import Button from '../../../../components/bootstrap/Button';
import Icon from '../../../../components/icon/Icon';
import Input from '../../../../components/bootstrap/forms/Input';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../components/bootstrap/Dropdown';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Checks, { ChecksGroup } from '../../../../components/bootstrap/forms/Checks';
import PAYMENTS from '../../../../common/data/enumPaymentMethod';
import useSortableData from '../../../../hooks/useSortableData';
import InputGroup, { InputGroupText } from '../../../../components/bootstrap/forms/InputGroup';
import Popovers from '../../../../components/bootstrap/Popovers';
import AdminUserEditModal from './adminUserEditModal';
import { getColorNameWithIndex } from '../../../../common/data/enumColors';
import useDarkMode from '../../../../hooks/useDarkMode';
import { adminUser } from './data';
import Modal, { ModalBody, ModalFooter } from '../../../../components/bootstrap/Modal';
import Alert from '../../../../components/bootstrap/Alert';
import { Badge } from '../../../../components/icon/material-icons';

const AdminUserList = () => {
	const { darkModeStatus } = useDarkMode();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['5']);
	const [showStatus, setShowStatus] = useState<boolean>();

	const formik = useFormik({
		initialValues: {
			searchInput: '',
			status: adminUser ? adminUser.map((s: any) => s.status) : [],
			adminBelongsTo: '',
			minPrice: '',
			maxPrice: '',
		},

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData = adminUser.filter((f) =>
		// Name
		f.name.toLowerCase().includes(formik.values.searchInput.toLowerCase()),
	);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [currentEditId, setCurrentEditId] = useState<any>('0');

	const openEditModal = (id: any) => {
		setCurrentEditId(id as any);
		setEditModalStatus(true);
	};

	const openAddModal = () => {
		setCurrentEditId('0');
		setEditModalStatus(true);
	};

	const [deleteModal, setDeleteModal] = useState<boolean>(false);
	return (
		<PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text} isProtected={true}>
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
											{adminUser.map((participant, index) => (
												<Checks
													key={index}
													label={participant.adminBelongsTo}
													value={participant.adminBelongsTo}
													onChange={formik.handleChange}
													checked={formik.values.adminBelongsTo.includes(
														participant.adminBelongsTo,
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
												Admin{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('name')}
													icon='FilterList'
												/>
											</th>
											{/* <th>Belongs To</th> */}
											<th>Email</th>
											<th>Contact</th>
											<th>Joined Co.</th>
											<th>As Admin</th>
											<th>Status</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{dataPagination(items, currentPage, perPage).map((i) => (
											<tr key={i.id}>
												<td>
													<div className='d-flex align-items-center'>
														<div className='flex-shrink-0'>
															<div
																className='ratio ratio-1x1 me-3'
																style={{ width: 48, height: 48 }}>
																{i.thumb ? (
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
																			i.id,
																		)} text-${getColorNameWithIndex(
																			i.id,
																		)} rounded-2 d-flex align-items-center justify-content-center`}>
																		<span className='fw-bold'>
																			{getFirstLetter(i.name)}
																		</span>
																	</div>
																)}
															</div>
														</div>
														<div className='flex-grow-1'>
															<div className='fs-6 fw-bold'>
																{i.name}
															</div>
															<div className='text-muted'>
																<Icon icon='Label' />{' '}
																<small>{i?.id}</small>
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
												<td>
													<div>{i.contactNumber}</div>
												</td>
												<td>
													<div>{i.createdAt}</div>
												</td>
												<td>
													<div>{i.updatedAt}</div>
												</td>
												<td className='h5'>
													<div
														className={`badge bg-${
															i.status === 'Active'
																? 'success'
																: i.status === 'Restricted'
																? 'dark'
																: 'danger'
														}`}>
														{i.status}
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
																	to={`${dashboardPagesMenu.participantManagement.path}/participant/${i.id}`}>
																	View
																</Button>
															</DropdownItem>
															<DropdownItem>
																<Button
																	icon='Edit'
																	tag='button'
																	onClick={() =>
																		openEditModal(i.id)
																	}>
																	Edit
																</Button>
															</DropdownItem>
															<DropdownItem>
																<Button
																	icon='NotInterested'
																	tag='button'>
																	Restrict Admin
																</Button>
															</DropdownItem>
															<DropdownItem>
																<Button
																	icon='Delete'
																	tag='button'
																	onClick={() =>
																		setDeleteModal(true)
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
					<h5 className='text-center'>Are you sure you want to delete the adminUser</h5>
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
			<AdminUserEditModal
				setIsOpen={setEditModalStatus}
				isOpen={editModalStatus}
				id={currentEditId}
			/>
		</PageWrapper>
	);
};

export default AdminUserList;
