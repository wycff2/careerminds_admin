import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import PageWrapper from '../../../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../../../layout/SubHeader/SubHeader';
import Page from '../../../../../layout/Page/Page';
import { dashboardPagesMenu } from '../../../../../menu';
import Card, { CardBody } from '../../../../../components/bootstrap/Card';
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
import FeedbackEditModal from './feedbackEditModal';
import { Feedback } from './data'; // Ensure this import is correct
import Modal, { ModalBody, ModalFooter } from '../../../../../components/bootstrap/Modal';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
} from '../../../../../components/bootstrap/OffCanvas';
import Chat from '../../../../../components/Chat';
import Textarea from '../../../../../components/bootstrap/forms/Textarea';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFeedbackSlice } from '../../services/slice/feedBack';
import { formatDate } from '../../../../../utils/e-learning/common';
import PageLoader from '../../component/helper/PageLoader';
import Unauthorised from '../../component/helper/unAuthorised';
import ChangeAuthorised from '../../component/helper/changeAuthorised';

const FeedbackList = () => {
	const dispatch = useDispatch();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['5']);

	const { feedback, loading } = useSelector((state: any) => state?.feedback);
	console.warn('feedback', feedback);

	const formik = useFormik({
		initialValues: {
			searchInput: '',
			status: Feedback ? Feedback.map((s: any) => s.status) : [],
			feedbackBelongsTo: '',
			minPrice: '',
			maxPrice: '',
		},
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData = useMemo(() => {
		return feedback?.filter((f: any) => {
			return f?.description.toLowerCase().includes(formik.values.searchInput.toLowerCase());
		});
	}, [feedback, formik.values.searchInput]);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);
	const { user } = useSelector((state: any) => state?.users);
	const checkAuthOrNot = user?.role?.admin_permissions?.Feedback;

	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [reply, setReply] = useState<boolean>(false);
	const [currentEditId, setCurrentEditId] = useState<any>('0');
	const [feed, setFeed] = useState<any>('');
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

	const openReplyModal = (id: any) => {
		setFeed(id);
		setReply(true);
		// Fetch or set messages data here for the chat if needed
	};

	const pageSize = useMemo(
		() => ({
			pageNo: 1,
			page: 11,
		}),
		[],
	);

	useEffect(() => {
		dispatch(getAllFeedbackSlice(pageSize) as any);
	}, [dispatch, pageSize]);

	const [deleteModal, setDeleteModal] = useState<boolean>(false);

	if (loading) {
		return <PageLoader />;
	}

	if (!user?.role?.admin_permissions?.Feedback?.read) {
		return <Unauthorised />;
	}

	return (
		<Fragment>
			{loading ? (
				<PageLoader />
			) : (
				<PageWrapper title={dashboardPagesMenu.feedbackManagement.text} isProtected={true}>
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
										{/* {Feedback && data.length !== filteredData.length && (
					<Popovers desc='Filtering applied' trigger='hover'>
						<span className='position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2'>
							<span className='visually-hidden'>
								there is filtering
							</span>
						</span>
					</Popovers>
				)} */}
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
											{/* <FormGroup label='Payments' className='col-12'> */}
											{/* <ChecksGroup>
							{Feedback &&
								Feedback.map((feedback, index) => (
									<Checks
										key={index}
										label={feedback.feedbackBelongsTo}
										value={feedback.feedbackBelongsTo}
										onChange={formik.handleChange}
										checked={formik.values.feedbackBelongsTo.includes(
											feedback.feedbackBelongsTo,
										)}
									/>
								))}
						</ChecksGroup> */}
											{/* </FormGroup> */}
										</div>
									</div>
								</DropdownMenu>
							</Dropdown>
							<SubheaderSeparator />
							<Button icon='PersonAdd' color='primary' isLight onClick={openAddModal}>
								New Feedback
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
													<th></th>
													<th
														onClick={() => requestSort('name')}
														className='cursor-pointer text-decoration-underline'>
														Feedback{' '}
														<Icon
															size='lg'
															className={getClassNamesFor('name')}
															icon='FilterList'
														/>
													</th>
													<th>Rating</th>
													<th>Feedback by</th>
													<th>Timestamp</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{dataPagination(items, currentPage, perPage).map(
													(i, idx) => (
														<tr key={idx}>
															<td>
																<Button
																	isLight
																	color='primary'
																	icon='Reply'
																	onClick={() =>
																		openReplyModal(i)
																	}
																/>
															</td>
															<td
																className='col-lg-6'
																style={{
																	height: '30px',
																	textOverflow: 'ellipsis',
																}}>
																<Button
																	isLink
																	color='light'
																	tag='a'>
																	<div className='flex-grow-1 ms-0 d-flex'>
																		<Icon
																			icon='QuestionAnswer'
																			className='me-1'
																		/>{' '}
																		{i?.feedbackBelongsTo}
																	</div>
																	<div className='text-muted'>
																		<small className='fw-normal'>
																			{i?.description}
																		</small>
																	</div>
																</Button>
															</td>
															<td>
																<div>
																	<Icon
																		color='warning'
																		icon='Star'
																		className='me-1'
																	/>
																	{i?.rating}
																</div>
															</td>
															<td>
																<div className='d-flex'>
																	<div className='flex-shrink-0'>
																		<img
																			className='bg-lo50 rounded-circle d-flex align-items-center justify-content-center'
																			style={{
																				width: 38,
																				height: 38,
																			}}
																			src={
																				i?.user?.avatar &&
																				`https://e-learning-backend.cradle.services/${i?.user?.avatar}`
																			}
																			alt=''
																		/>
																	</div>
																	<div className=''>
																		<div className='flex-grow-1 ms-3 d-flex align-items-center'>
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
																<div className=''>
																	<div className='flex-grow-1 d-flex align-items-center'>
																		{formatDate(i?.created_at)}
																	</div>
																	<div className='text-muted'>
																		<Icon icon='AccessTime' />{' '}
																		<small>
																			{moment(
																				i?.created_at,
																			).fromNow()}
																		</small>
																	</div>
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
																		<DropdownItem>
																			<Button
																				icon='Delete'
																				tag='button'
																				onClick={() =>
																					setDeleteModal(
																						true,
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
					<OffCanvas
						id='chat'
						isOpen={reply}
						setOpen={setReply}
						placement='end'
						isModalStyle
						isBackdrop={false}
						isBodyScroll>
						<OffCanvasHeader setOpen={setReply} className='fs-5'>
							<h2>{feed?.name}</h2>
						</OffCanvasHeader>
						<OffCanvasBody>
							<Chat>
								{feed && (
									<div>
										<div className='col-10 me-auto'>
											<Card className='bg-primary-subtle text-primary-emphasis rounded-2'>
												<CardBody className='py-2'>
													<span>
														<Icon
															icon='QuestionAnswer'
															className='me-1 h3'
														/>{' '}
														<span className='h4'>
															{feed.feedbackBelongsTo}
														</span>
													</span>
													<CardBody>
														<p>
															<span className=''>{feed.comment}</span>
														</p>
													</CardBody>
												</CardBody>
											</Card>
											<div>
												<span>
													<img
														className='bg-lo50  rounded-circle'
														style={{
															width: 38,
															height: 38,
														}}
														src={feed?.thumb}
														alt=''
													/>
												</span>
											</div>
										</div>

										<div className='col-10 ms-auto mt-5'>
											<Card className='bg-light-subtle text-primary-emphasis rounded-2'>
												<CardBody className='py-2'>
													<span>
														<Icon
															icon='QuestionAnswer'
															className='me-1 h3'
														/>{' '}
														<span className='h4'>
															{feed.feedbackBelongsTo}
														</span>
													</span>
													<CardBody>
														<p>
															<span className=''>{feed.comment}</span>
														</p>
													</CardBody>
												</CardBody>
											</Card>
											<div>
												<span>
													<img
														className='bg-lo50 d-block ms-auto rounded-circle '
														style={{
															width: 38,
															height: 38,
														}}
														src={feed?.thumb}
														alt=''
													/>
												</span>
											</div>
										</div>
									</div>
								)}
							</Chat>
						</OffCanvasBody>
						<div className='chat-send-message p-3'>
							<InputGroup>
								<Textarea />
								<Button color='info' icon='Send'>
									SEND
								</Button>
							</InputGroup>
						</div>
					</OffCanvas>
					<Modal
						isOpen={deleteModal}
						id='example-modal'
						isAnimation={false}
						isCentered
						setIsOpen={setDeleteModal}
						size='md'
						titleId='example-title'>
						<ModalBody className='p-5'>
							<h5 className='text-center'>
								Are you sure you want to delete the Feedback
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
					<FeedbackEditModal
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

export default FeedbackList;
