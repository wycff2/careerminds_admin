import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../../../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../../../layout/SubHeader/SubHeader';
import Page from '../../../../../layout/Page/Page';
import { dashboardPagesMenu, demoPagesMenu } from '../../../../../menu';
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
import ParticipantsEditModal from './participantsEditModal';
import { getColorNameWithIndex } from '../../../../../common/data/enumColors';
import { participants } from './data';
import PageLoader from '../../component/helper/PageLoader';
import Unauthorised from '../../component/helper/unAuthorised';
import { useSelector } from 'react-redux';

const ParticipantsPage = () => {
	const { id } = useParams();
	const itemData = participants.filter((item) => item.id.toString() === id?.toString());
	const item = itemData[0];

	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const handleClickEdit = () => {
		setEditModalStatus(true);
	};

	const { user, loading } = useSelector((state: any) => state?.users);

	if (loading) {
		return <PageLoader />;
	}

	if (!user?.role?.admin_permissions?.Participant?.read) {
		return <Unauthorised />;
	}

	return (
		<PageWrapper
			className='mt-3'
			title={demoPagesMenu.crm.subMenu.customer.text}
			isProtected={true}>
			<SubHeader>
				<SubHeaderLeft>
					<Button
						color='primary'
						isLink
						icon='ArrowBack'
						tag='a'
						to={`${dashboardPagesMenu.participantManagement.path}`}>
						Back to List
					</Button>
					<SubheaderSeparator />
					<span className='text-muted fst-italic me-2'>Last update:</span>
					<span className='fw-bold'>13 hours ago</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button icon='Edit' color='primary' isLight onClick={handleClickEdit}>
						Edit
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='pt-3 pb-5 d-flex align-items-center'>
					<span className='display-4 fw-bold me-3'>{item.name}</span>
					<span className='border border-success border-2 text-success fw-bold px-3 py-2 rounded'>
						{'Participants'}
					</span>
				</div>
				<div className='row'>
					<div className='col-lg-4'>
						<Card className='shadow-3d-primary'>
							<CardBody>
								<div className='row g-5 py-3'>
									<div className='col-12 d-flex justify-content-center'>
										<Avatar
											src={data[0].src}
											srcSet={data[0].srcSet}
											color={getColorNameWithIndex(data[0].id)}
											isOnline={data[0].isOnline}
										/>
									</div>
									<div className='col-12'>
										<div className='row g-3'>
											<div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<Icon
															icon='Block'
															size='3x'
															color={
																item.status === 'Active'
																	? 'success'
																	: 'danger'
															}
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{item.status}
														</div>
														<div className='text-muted'>Status</div>
													</div>
												</div>
											</div>
											<div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<Icon
															icon='Savings'
															size='3x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{data[0].payout}
														</div>
														<div className='text-muted'>
															Payout Option
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
							<CardHeader>
								<CardLabel icon='Receipt'>
									<CardTitle>Description</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<span>{item.description}</span>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
			<ParticipantsEditModal
				setIsOpen={setEditModalStatus}
				isOpen={editModalStatus}
				id={id || 'loading'}
			/>
		</PageWrapper>
	);
};

export default ParticipantsPage;
