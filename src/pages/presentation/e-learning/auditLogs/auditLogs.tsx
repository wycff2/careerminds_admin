import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Calendar as DatePicker } from 'react-date-range';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../../layout/SubHeader/SubHeader';
import Icon from '../../../../components/icon/Icon';
import Button from '../../../../components/bootstrap/Button';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Popovers from '../../../../components/bootstrap/Popovers';
import { dashboardPagesMenu, demoPagesMenu } from '../../../../menu';
import useDarkMode from '../../../../hooks/useDarkMode';
import AuditLogsUpcomingEvents from './auditLogsUpcomingEvents';
import { useSelector } from 'react-redux';
import PageLoader from '../component/helper/PageLoader';
import Unauthorised from '../component/helper/unAuthorised';

const AuditLogsPage = () => {
	const { themeStatus } = useDarkMode();

	const [date, setDate] = useState<Date>(new Date());

	const { user, loading } = useSelector((state: any) => state?.users);

	if (loading) {
		return <PageLoader />;
	}

	if (!user?.role?.admin_permissions?.AuditLogs?.read) {
		return <Unauthorised />;
	}
	return (
		<PageWrapper
			// title={dashboardPagesMenu?.auditLogs?.text}
			className='mt-4'
			isProtected={true}>
			<SubHeader>
				<SubHeaderLeft>
					<Icon icon='Info' className='me-2' size='2x' />
					<span className='text-muted'>
						You have <Icon icon='TaskAlt' color='success' className='mx-1' size='lg' />{' '}
						3 updated logs and{' '}
						<Icon icon='Alarm' color='warning' className='mx-1' size='lg' /> 4 pending
						appointments for today.
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Popovers
						desc={
							<DatePicker
								onChange={(item) => setDate(item)}
								date={date}
								color={process.env.REACT_APP_PRIMARY_COLOR}
							/>
						}
						placement='bottom-end'
						className='mw-100'
						trigger='click'>
						<Button color={themeStatus}>
							{`${dayjs(date).startOf('weeks').format('MMM Do')} - ${dayjs(date)
								.endOf('weeks')
								.format('MMM Do')}`}
						</Button>
					</Popovers>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<AuditLogsUpcomingEvents isFluid />
			</Page>
		</PageWrapper>
	);
};

export default AuditLogsPage;
