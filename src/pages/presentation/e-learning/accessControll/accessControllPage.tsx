import React from 'react';
import { useMeasure } from 'react-use';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import RolesList from './roles/rolesList';
import RolePermision from './rolePermision/rolePermision';
import { dashboardPagesMenu } from '../../../../menu';
import { useSelector } from 'react-redux';
import PageLoader from '../component/helper/PageLoader';
import Unauthorised from '../component/helper/unAuthorised';

const AccessControllPage = () => {
	const [ref] = useMeasure<HTMLDivElement>();

	const { user, loading } = useSelector((state: any) => state?.users);

	if (loading) {
		return <PageLoader />;
	}

	if (!user?.role?.admin_permissions?.AccessControl?.read) {
		return <Unauthorised />;
	}

	return (
		<PageWrapper ref={ref} title={dashboardPagesMenu.accessControl.text} isProtected={true}>
			<Page>
				<div id='roles' className='row h-fluid-min-lg-100 scroll-margin'>
					<div className='col-12'>
						<Card stretch>
							<CardBody className='h-100'>
								<RolesList />
							</CardBody>
						</Card>
					</div>
				</div>
				<div id='rolePermision' className='row h-fluid-min-lg-100 scroll-margin'>
					<div className='col-12'>
						<Card stretch>
							<CardBody className='h-100'>
								<RolePermision />
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default AccessControllPage;
