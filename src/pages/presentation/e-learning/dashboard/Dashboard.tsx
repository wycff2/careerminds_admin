import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTour } from '@reactour/tour';
import useDarkMode from '../../../../hooks/useDarkMode';
import { dashboardPagesMenu, demoPagesMenu } from '../../../../menu';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../../layout/SubHeader/SubHeader';
import Page from '../../../../layout/Page/Page';

import ThemeContext from '../../../../contexts/themeContext';
import CommonDashboardAlert from './common/CommonDashboardAlert';
import { TABS, TTabs } from './common/helper';
import KeyMetrics from './common/KeyMetrics';
import UserBehavior from './common/UserBehavior';
import CommonDashboardRecentActivities from './common/CommonDashboardRecentActivities';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserSlice } from '../services/slice/users';
import UserActivity from '../thirdPartyIntigration/intigrationContent/UserActivity';
import TraficSource from '../thirdPartyIntigration/intigrationContent/TraficSource';
import PageLoader from '../component/helper/PageLoader';
import Unauthorised from '../component/helper/unAuthorised';

const DashboardPage = () => {
	const dispatch = useDispatch();

	const pageSize = useMemo(
		() => ({
			pageNo: 1,
			page: 11,
		}),
		[],
	);

	useEffect(() => {
		dispatch(getAllUserSlice(pageSize));
	}, [dispatch, pageSize]);

	const { user, loading, users } = useSelector((state: any) => state?.users);

	if (loading) {
		return <PageLoader />;
	}


	if (!user?.role?.admin_permissions?.Dashboard?.read) {
		return <Unauthorised />;
	}

	const totalUsers = users;

	return (
		<PageWrapper title={dashboardPagesMenu.dashboard.text} isProtected={true}>
			{/* <SubHeader>
				<SubHeaderLeft>
					<span className='h4 mb-0 fw-bold'>Overview</span>
					<SubheaderSeparator />
					<ButtonGroup>
						{Object.keys(TABS).map((key) => (
							<Button
								key={key}
								color={activeTab === TABS[key] ? 'success' : themeStatus}
								onClick={() => setActiveTab(TABS[key])}>
								{TABS[key]}
							</Button>
						))}
					</ButtonGroup>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonAvatarTeam>
						<strong>Marketing</strong> Team
					</CommonAvatarTeam>
				</SubHeaderRight>
			</SubHeader> */}
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>{/* <CommonDashboardAlert /> */}</div>

					<div className='col-xl-12'>
						<KeyMetrics totalUsers={totalUsers} />
					</div>

					<div className='col-12'>
						<CommonDashboardRecentActivities />
					</div>
					<div className='col-xl-12'>
						<UserBehavior />
					</div>
					<div className='col-xl-8'>
						<UserActivity />
					</div>
					<div className='col-xl-4'>
						<TraficSource />
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;
