import React, { Fragment, useEffect, useState } from 'react';
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
import ModuleEditModal from './moduleEditModal';
import { getColorNameWithIndex } from '../../../../../common/data/enumColors';
import { useDispatch, useSelector } from 'react-redux';
import { getByIdCourseModuleSlice } from '../../services/slice/modules';
import moment from 'moment';
import PageLoader from '../../component/helper/PageLoader';
import Unauthorised from '../../component/helper/unAuthorised';
import ChangeAuthorised from '../../component/helper/changeAuthorised';
import VideoPlayer from '../../VideoPlayer/video';

const ModulePage = () => {
	const dispatch = useDispatch();

	const { id } = useParams();

	const { courseModule, loading } = useSelector((state: any) => state?.courseModule);

	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [checkIsAuth, setCheckIsAuth] = useState<boolean>(false);

	const { user } = useSelector((state: any) => state?.users);
	const checkAuthOrNot = user?.role?.admin_permissions?.Module;

	const handleClickEdit = () => {
		if (!checkAuthOrNot?.write) {
			setCheckIsAuth(true);
		} else {
			setEditModalStatus(true);
		}
	};

	useEffect(() => {
		dispatch(getByIdCourseModuleSlice(id) as any);
	}, [dispatch, id]);

	const item = courseModule;

	if (!user?.role?.admin_permissions?.Module?.read) {
		return <Unauthorised />;
	}
	return (
		<Fragment>
			{loading ? (
				<PageLoader />
			) : (
				<PageWrapper
					className='mt-3'
					title={dashboardPagesMenu.curriculumManagement.text}
					isProtected={true}>
					<SubHeader>
						<SubHeaderLeft>
							<Button
								color='primary'
								isLink
								icon='ArrowBack'
								tag='a'
								to={`${dashboardPagesMenu.curriculumManagement.path}`}>
								Back to List
							</Button>
							<SubheaderSeparator />
							<span className='text-muted fst-italic me-2'>Last update:</span>
							<span className='fw-bold'>{moment(item?.updated_at).fromNow()}</span>
						</SubHeaderLeft>
					</SubHeader>
					<Page>
						<div className='pt-3 pb-5 d-flex align-items-center'>
							<span className='display-4 fw-bold me-3'>{item?.Name}</span>
							<span className='border border-success border-2 text-success fw-bold px-3 py-2 rounded'>
								{'Curriculum'}
							</span>
						</div>
						<div className='row'>
							<div className='col-lg-4'>
								<Card className='shadow-3d-primary'>
									<CardBody>
										<div className='row g-5 py-3'>
											<div className='col-12 d-flex justify-content-center'>
												<img
													src={`https://e-learning-backend.cradle.services/${item?.avatar}`}
													style={{
														width: '100%',
													}}
													alt=''
												/>
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
										{Array.isArray(item?.description) &&
											item?.description.map((dec: string, idx: number) => (
												<div key={idx} className='my-3 ms-3'>
													<span>- {dec}</span>
												</div>
											))}
									</CardBody>
								</Card>
							</div>
						</div>

						<div className='row'>
							<div className='col-lg-6'>
								<Card>
									<CardHeader>
										<CardLabel icon='CameraAlt'>
											<CardTitle>Thumbnail</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<img
											src={`https://e-learning-backend.cradle.services/${item?.thumbnail}`}
											style={{ maxHeight: '290px' }}
											height='auto'
											width={'100%'}
										/>
									</CardBody>
								</Card>
							</div>
							<div className='col-lg-6'>
								<Card>
									<CardHeader>
										<CardLabel icon='OndemandVideo'>
											<CardTitle>Video</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<VideoPlayer
											url={`https://e-learning-backend.cradle.services/${item?.video}`}
											height='auto'
											width={'100%'}
											controls
										/>
									</CardBody>
								</Card>
							</div>
						</div>
					</Page>
					<ModuleEditModal
						setIsOpen={setEditModalStatus}
						isOpen={editModalStatus}
						id={id || 'loading'}
					/>
					<ChangeAuthorised isOpen={checkIsAuth} setIsOpen={setCheckIsAuth} />
				</PageWrapper>
			)}
		</Fragment>
	);
};

export default ModulePage;
