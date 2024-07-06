import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../../../layout/SubHeader/SubHeader';
import Page from '../../../../../layout/Page/Page';
import { dashboardPagesMenu, demoPagesMenu } from '../../../../../menu';
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
import PAYMENTS from '../../../../../common/data/enumPaymentMethod';
import useSortableData from '../../../../../hooks/useSortableData';
import InputGroup, { InputGroupText } from '../../../../../components/bootstrap/forms/InputGroup';
import Popovers from '../../../../../components/bootstrap/Popovers';
import EnrollmentEditModal from './enrollmentEditModal';
import { getColorNameWithIndex } from '../../../../../common/data/enumColors';
import useDarkMode from '../../../../../hooks/useDarkMode';
import { enrollments } from './data';
import Modal, { ModalBody, ModalFooter } from '../../../../../components/bootstrap/Modal';
import { getAllEnrolmentSlice } from '../../services/slice/enrolment';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../../../../utils/e-learning/common';
import moment from 'moment';
import PageLoader from '../../component/helper/PageLoader';
import Unauthorised from '../../component/helper/unAuthorised';
import ChangeAuthorised from '../../component/helper/changeAuthorised';

const Klarna = 'https://asset.brandfetch.io/id-Xkz2G4L/idH0urNvKu.png?updated=1716845775558';
const Affirm =
	'https://www.apkmirror.com/wp-content/themes/APKMirror/ap_resize/ap_resize.php?src=https%3A%2F%2Fdownloadr2.apkmirror.com%2Fwp-content%2Fuploads%2F2022%2F01%2F10%2F61eb5529a7734.png&w=96&h=96&q=100';
const GPay = 'https://www.computerhope.com/jargon/g/google-pay.png';

const EnrollmentList = () => {
	const { darkModeStatus } = useDarkMode();
	const dispatch = useDispatch();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['5']);
	const [checkIsAuth, setCheckIsAuth] = useState<boolean>(false);

	const { enrolments, loading } = useSelector((state: any) => state?.enrolment);


	const formik = useFormik({
		initialValues: {
			searchInput: '',
			payment: Object(enrollments.map((item) => item?.payment?.method)),
			minPrice: '',
			maxPrice: '',
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});
	// console.log('payment', formik.values.payment);

	const filteredData = useMemo(() => {
		return enrolments?.filter((f: any) => {
			return f?.user?.Name?.toLowerCase().includes(formik.values.searchInput.toLowerCase());
		});
	}, [enrolments, formik.values.searchInput]);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [currentEditId, setCurrentEditId] = useState<any>('0');

	const { user } = useSelector((state: any) => state?.users);
	const checkAuthOrNot = user?.role?.admin_permissions?.Enrollment;

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
		dispatch(getAllEnrolmentSlice(pageSize) as any);
	}, [dispatch, pageSize]);

	const [deleteModal, setDeleteModal] = useState<boolean>(false);

	if (loading) {
		return <PageLoader />;
	}

	if (!user?.role?.admin_permissions?.Enrollment?.read) {
		return <Unauthorised />;
	}
	return (
		<Fragment>
			{loading ? (
				<PageLoader />
			) : (
				<PageWrapper
					title={dashboardPagesMenu.enrollmentManagement.text}
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
							</Dropdown>
							<SubheaderSeparator />
							<Button icon='PersonAdd' color='primary' isLight onClick={openAddModal}>
								New Enrollment
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
														Name{' '}
														<Icon
															size='lg'
															className={getClassNamesFor('name')}
															icon='FilterList'
														/>
													</th>
													<th>Course</th>
													<th>Enrollment Date</th>
													<th
														onClick={() => requestSort('payout')}
														className='cursor-pointer text-decoration-underline'>
														Payout{' '}
														<Icon
															size='lg'
															className={getClassNamesFor('payout')}
															icon='FilterList'
														/>
													</th>
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
																			{i?.user?.avatar ? (
																				<div>
																					<img
																						className='bg-lo25 rounded-2 d-flex align-items-center justify-content-center'
																						style={{
																							width: 48,
																							height: 48,
																						}}
																						src={`https://e-learning-backend.cradle.services/${i?.user?.avatar}`}
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
																							i?.user
																								?.Name,
																						)}
																					</span>
																				</div>
																			)}
																		</div>
																	</div>
																	<div className='flex-grow-1'>
																		<div className='fs-6 fw-bold'>
																			{i?.user?.Name}
																		</div>
																		<div className='text-muted'>
																			<Icon icon='Label' />{' '}
																			<small>
																				{i?.user?.uniqueId}
																			</small>
																		</div>
																	</div>
																</div>
															</td>

															<td>
																<div className='flex-grow-1'>
																	<div className='fs-6'>
																		{i?.course?.Name}
																	</div>
																</div>
															</td>
															<td>
																<div>
																	{formatDate(i?.created_at)}
																</div>
																<div className='text-muted'>
																	<small>
																		{moment(
																			i?.created_at,
																		).fromNow()}
																	</small>
																</div>
															</td>

															<td className=''>
																<div>
																	{i?.paymentMethod !== null ? (
																		<>
																			<div className='flex-grow-1'>
																				<div className=''>
																					<img
																						src={
																							i?.paymentMethod ===
																							'Klarna'
																								? Klarna
																								: i?.paymentMethod ===
																								  'Affirm'
																								? Affirm
																								: GPay
																						}
																						alt=''
																						className='rounded-circle'
																						style={{
																							width: '15px',
																							height: '15px',
																						}}
																					/>{' '}
																					{
																						i?.paymentMethod
																					}
																				</div>
																				{/* <div className='text-muted'>
																			<Icon icon='Payment' />{' '}
																			<small>
																				$
																				{
																					i?.payment
																						?.payment
																				}
																			</small>
																		</div> */}
																			</div>
																		</>
																	) : (
																		<div
																			className={`badge rounded-pill bg-warning  fs-6 px-3`}>
																			Pending
																		</div>
																	)}
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
																				to={`${dashboardPagesMenu.usersManagement.path}/users/${i?.user?._id}`}>
																				View
																			</Button>
																		</DropdownItem>
																		<DropdownItem>
																			<Button
																				icon='Edit'
																				tag='button'
																				onClick={() =>
																					openEditModal(
																						i.id,
																					)
																				}>
																				Edit
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
								Are you sure you want to delete the Enrollment
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
					<EnrollmentEditModal
						setIsOpen={setEditModalStatus}
						isOpen={editModalStatus}
						id={currentEditId}
					/>
					<ChangeAuthorised isOpen={checkIsAuth} setIsOpen={setCheckIsAuth} />
				</PageWrapper>
			)}
		</Fragment>
	);
};

export default EnrollmentList;
