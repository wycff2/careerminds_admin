import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
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
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../../components/bootstrap/Card';
import Avatar from '../../../../../components/Avatar';
import Icon from '../../../../../components/icon/Icon';
import { priceFormat } from '../../../../../helpers/helpers';
import latestSalesData from '../../../../../common/data/dummySalesData';
import useSortableData from '../../../../../hooks/useSortableData';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../../components/PaginationButtons';
import RolesEditModal from './rolesEditModal';
import { getColorNameWithIndex } from '../../../../../common/data/enumColors';
// import useDarkMode from '../../../../../hooks/useDarkMode';
import { roles } from './data';

const RolesPage = () => {
	const { id } = useParams();
	const itemData = roles.filter((item) => item.id.toString() === id?.toString());
	const item = itemData[0];

	// const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['3']);

	// const { items, requestSort, getClassNamesFor } = useSortableData(latestSalesData);

	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const handleClickEdit = () => {
		setEditModalStatus(true);
	};

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
						{'roles'}
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
								<span>'</span>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
			<RolesEditModal
				setIsOpen={setEditModalStatus}
				isOpen={editModalStatus}
				id={id || 'loading'}
			/>
		</PageWrapper>
	);
};

export default RolesPage;
