import React, { Fragment, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageWrapper from '../../../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../../../layout/SubHeader/SubHeader';
import Page from '../../../../../layout/Page/Page';
import { dashboardPagesMenu } from '../../../../../menu';
import data from '../../../../../common/data/dummyCustomerData';
import Button from '../../../../../components/bootstrap/Button';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../../components/bootstrap/Card';
import Avatar from '../../../../../components/Avatar';
import Icon from '../../../../../components/icon/Icon';
import { getColorNameWithIndex } from '../../../../../common/data/enumColors';
import { clearUserSlice, getByIdUserSlice } from '../../services/slice/users';
import { useDispatch, useSelector } from 'react-redux';
import { capitalize } from '../../../../../utils/e-learning/common';
import Alert from '../../../../../components/bootstrap/Alert';
import RecentActivities from './Common/userActivities';
import Progress from '../../../../../components/bootstrap/Progress';
import moment from 'moment';
import PageLoader from '../../component/helper/PageLoader';
import Unauthorised from '../../component/helper/unAuthorised';

const UsersPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, loading } = useSelector((state: any) => state?.users);
	const checkAuthOrNot = user?.role?.admin_permissions?.Users;

	useEffect(() => {
		dispatch(getByIdUserSlice(id) as any);
	}, [dispatch, id]);

	const item = user;

	const handleBackToList = () => {
		dispatch(clearUserSlice());
		navigate(-1);
	};


	if (loading) {
		return <PageLoader />;
	}

	// if (!user?.role?.admin_permissions?.Users?.read) {
	// 	return <Unauthorised />;
	// }

	return (
		<Fragment>
			{loading ? (
				<PageLoader />
			) : (
				<PageWrapper
					className='mt-3'
					title={dashboardPagesMenu.usersManagement.text}
					isProtected={true}>
					<SubHeader>
						<SubHeaderLeft>
							<Button
								color='primary'
								isLink
								icon='ArrowBack'
								tag='a'
								onClick={handleBackToList}>
								Back to List
							</Button>
							<SubheaderSeparator />
						</SubHeaderLeft>
						<SubHeaderRight>
							<span className='text-muted fst-italic me-2'>Last update:</span>
							<span className='fw-bold'>{moment(item?.updated_at).fromNow()}</span>
						</SubHeaderRight>
					</SubHeader>
					<Page>
						<div className='pt-3 pb-5 d-flex align-items-center'>
							<span className='display-4 fw-bold me-3'>{item?.Name}</span>
							<span className='border border-success border-2 text-success fw-bold px-3 py-2 rounded'>
								{item?.uniqueId}
							</span>
						</div>
						-
						<div className='row'>
							<div className='col-lg-4'>
								<Card className='shadow-3d-primary'>
									<CardBody>
										<div className='row g-5 py-3'>
											<div className='col-12 d-flex justify-content-center'>
												{item?.avatar ? (
													<Avatar
														src={
															item?.avatar &&
															`https://e-learning-backend.cradle.services/${item?.avatar}`
														}
													/>
												) : (
													<Avatar
														src={data[0].src}
														srcSet={data[0].srcSet}
														color={getColorNameWithIndex(data[0].id)}
														isOnline={data[0].isOnline}
													/>
												)}
											</div>
											<div className='col-12'>
												<div className='row g-3'>
													<div className='col-12'>
														<div className='d-flex align-items-center'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='Block'
																	size='3x'
																	color='primary'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-5 mb-0'>
																	{capitalize(item?.status)}
																</div>
																<div className='text-muted'>
																	Account Status
																</div>
															</div>
														</div>
													</div>
													<div className='col-12'>
														<div className='d-flex align-items-center'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='Email'
																	size='3x'
																	color='primary'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-5 mb-0'>
																	{item?.email}
																</div>
																<div className='text-muted'>
																	Email
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</CardBody>
								</Card>

								<Card>
									<CardBody>
										<div className='fw-bold mb-2'>Bio</div>
										<div className='fs-6'>Cybersecurity enthusiast</div>
									</CardBody>
								</Card>

								<Card>
									<CardHeader>
										<CardLabel icon='ContactPage'>
											<CardTitle>Contact Information</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<div className='row g-5 py-3'>
											<div className='col-12'>
												<div className='row g-3'>
													<div className='col-12'>
														<div className='d-flex align-items-center'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='PhoneAndroid'
																	size='3x'
																	color='primary'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-5 mb-0'>
																	+1234567890
																</div>
																<div className='text-muted'>
																	Phone Number
																</div>
															</div>
														</div>
													</div>
													<div className='col-12'>
														<div className='d-flex align-items-center'>
															<div className='flex-shrink-0'>
																<Icon
																	icon='Home'
																	size='3x'
																	color='primary'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-5 mb-0'>
																	123 Main St, New York, NY, USA
																</div>
																<div className='text-muted'>
																	Address
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</CardBody>
								</Card>
							</div>
							<div className='col-lg-8'>
								<Card>
									<CardBody>
										<div className='d-flex justify-content-between'>
											<p>Profile Completed</p>
											<p className='fw-bold'>60%</p>
										</div>
										<Progress value={60} />
									</CardBody>
								</Card>

								<Card>
									<CardHeader>
										<CardLabel icon='MenuBook'>
											<CardTitle>Course Information</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<div className='col-12'>
											<div className='align-items-center'>
												<div className='flex-grow-1 ms-3'>
													<div className='fs-5 mb-2'>
														<span className=' fw-bold'>
															Course Name :{' '}
														</span>
														Intro to Cybersecurity
													</div>
												</div>
												<div className='flex-grow-1 ms-3'>
													<div className='fs-5 mb-2'>
														<span className=' fw-bold'>
															Progress :{' '}
														</span>
														70%
													</div>
												</div>
												<div className='flex-grow-1 ms-3'>
													<div
														className='fs-5 mb-2 text-info'
														style={styles.certificate}
														onMouseEnter={(e) =>
															(e.currentTarget.style.textDecoration =
																styles.certificateHover.textDecoration)
														}
														onMouseLeave={(e) =>
															(e.currentTarget.style.textDecoration =
																styles.certificate.textDecoration)
														}>
														Completion Certificate
													</div>
												</div>
											</div>
										</div>
										{!item?.course && (
											<Alert
												color='warning'
												isLight
												icon='Report'
												className='mt-3'>
												The student has not purchased any courses. The data
												shown is static.
											</Alert>
										)}
									</CardBody>
								</Card>

								<div className='col-12'>
									<RecentActivities />
								</div>
							</div>
						</div>
					</Page>
				</PageWrapper>
			)}
		</Fragment>
	);
};

const styles = {
	certificate: {
		cursor: 'pointer',
		textDecoration: 'none',
	},
	certificateHover: {
		textDecoration: 'underline',
	},
};

export default UsersPage;
