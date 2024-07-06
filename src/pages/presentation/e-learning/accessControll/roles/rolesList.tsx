import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import Page from '../../../../../layout/Page/Page';
import Card, { CardBody } from '../../../../../components/bootstrap/Card';
import { getFirstLetter } from '../../../../../helpers/helpers';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../../components/PaginationButtons';
import Button from '../../../../../components/bootstrap/Button';
import Icon from '../../../../../components/icon/Icon';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../../components/bootstrap/Dropdown';
import Checks from '../../../../../components/bootstrap/forms/Checks';
import useSortableData from '../../../../../hooks/useSortableData';
import RolesEditModal from './rolesEditModal';
import { getColorNameWithIndex } from '../../../../../common/data/enumColors';
import useDarkMode from '../../../../../hooks/useDarkMode';
import Modal, { ModalBody, ModalFooter } from '../../../../../components/bootstrap/Modal';
import showNotification from '../../../../../components/extras/showNotification';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteRoleSlice,
	getAllRoleSlice,
	updateRoleSlice,
} from '../../services/slice/accessControl';
import PageLoader from '../../component/helper/PageLoader';
import { updateRoleApi } from '../../services/api/accessControl';

const RolesList = () => {
	const { darkModeStatus } = useDarkMode();
	const dispatch = useDispatch();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['5']);
	const [currentRemoveId, setCurrentRemoveId] = useState<any>('0');

	const { role, roles, loading, error } = useSelector((s: any) => s?.role);

	const formik = useFormik({
		initialValues: {
			searchInput: '',
			adminBelongsTo: '',
			minPrice: '',
			maxPrice: '',
		},

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData = useMemo(() => {
		return roles?.filter((f: any) => {
			return f?.name !== 'superAdmin';
		});
	}, [roles]);

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

	const toggleStatus = async (id: any, currentStatus: boolean) => {
		let updateRequest = {
			id: id,
			data: { is_activated: !currentStatus },
		};
		try {
			await dispatch(updateRoleSlice(updateRequest) as any);

			if (role !== null && error === null) {
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='md' className='me-1' />
						<span>Updated Successfully</span>
					</span>,
					`Role has been ${!currentStatus ? 'activated' : 'deactivated'} successfully`,
				);
				dispatch(getAllRoleSlice(pageSize) as any);
			}
		} catch (errors) {
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Error' size='md' className='me-1' />
					<span>Update Failed</span>
				</span>,
				`Failed to ${!currentStatus ? 'activate' : 'deactivate'} the role`,
			);
		}
	};

	// delete role functionality
	const handleRemoveModule = useCallback((removeModuleId: any) => {
		setCurrentRemoveId(removeModuleId);
		setDeleteModal(true);
	}, []);

	const pageSize = useMemo(
		() => ({
			pageNo: 1,
			page: 11,
		}),
		[],
	);

	useEffect(() => {
		dispatch(getAllRoleSlice(pageSize) as any);
	}, [dispatch, pageSize]);

	return (
		<Fragment>
			{loading ? (
				<PageLoader />
			) : (
				<div className=''>
					<Page>
						<Button
							icon='PersonAdd'
							className='mb-3'
							color='primary'
							isLight
							onClick={openAddModal}>
							New Role
						</Button>
						<div className='row h-100'>
							<div className='col-12'>
								<Card stretch>
									<CardBody className='table-responsive'>
										<table className='table table-modern table-hover'>
											<thead>
												<tr>
													<th
														onClick={() => requestSort('name')}
														className='cursor-pointer text-decoration-underline'>
														Role{' '}
														<Icon
															size='lg'
															className={getClassNamesFor('name')}
															icon='FilterList'
														/>
													</th>
													<th>Note</th>
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
																			style={{
																				width: 48,
																				height: 48,
																			}}>
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
																						i?.display_name,
																					)}
																				</span>
																			</div>
																		</div>
																	</div>
																	<div className='flex-grow-1'>
																		<div className='fs-6 fw-bold'>
																			{i.display_name}
																		</div>
																	</div>
																</div>
															</td>

															<td>
																<div>{i?.note}</div>
															</td>
															<td className='h5'>
																<Checks
																	type='switch'
																	id={`flexSwitchCheckDefault-${i?._id}`}
																	label=''
																	name='defaultCheck'
																	onChange={() =>
																		toggleStatus(
																			i._id,
																			i.is_activated,
																		)
																	}
																	checked={i.is_activated}
																	style={{ cursor: 'pointer' }}
																/>
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
																				icon='Edit'
																				tag='button'
																				onClick={() =>
																					openEditModal(
																						i._id,
																					)
																				}>
																				Edit
																			</Button>
																		</DropdownItem> */}

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
							<Button
								color='danger'
								onClick={async () => {
									await dispatch(deleteRoleSlice(currentRemoveId) as any);
									await dispatch(getAllRoleSlice(pageSize) as any);
									setDeleteModal(false);
									showNotification(
										<span className='d-flex align-items-center'>
											<Icon icon='DeleteDelete' size='lg' className='me-1' />
											<span>Delete Successfully</span>
										</span>,
										`Category has been delete successfully`,
									);
								}}>
								Confirm
							</Button>
							<Button color='info' onClick={() => setDeleteModal(false)}>
								Cancel
							</Button>
						</ModalFooter>
					</Modal>
					<RolesEditModal
						setIsOpen={setEditModalStatus}
						isOpen={editModalStatus}
						id={currentEditId}
					/>
				</div>
			)}
		</Fragment>
	);
};

export default RolesList;
