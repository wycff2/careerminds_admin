import React from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../../../components/bootstrap/Card';
import Timeline, { TimelineItem } from '../../../../../../components/extras/Timeline';
import dayjs from 'dayjs';
import Icon from '../../../../../../components/icon/Icon';
import Popovers from '../../../../../../components/bootstrap/Popovers';

const activities = [
	{
		type: 'Recent Logins',
		description: 'User JohnDoe logged in.',
		time: dayjs().subtract(0.25, 'hours'),
	},
	{
		type: 'Recent Course Completions',
		description: 'User JaneSmith completed Cybersecurity Basics.',
		time: dayjs().subtract(4.54, 'hours'),
	},
	{
		type: 'Recent Registrations',
		description: 'User Alice registered.',
		time: dayjs().subtract(1, 'day'),
	},
	{
		type: 'Recent Feedback/Reviews',
		description: 'User Bob left a 5-star review.',
		time: dayjs().subtract(2, 'day'),
	},
];

const getActivityColor = (type: any) => {
	switch (type) {
		case 'Recent Logins':
			return 'primary';
		case 'Recent Course Completions':
			return 'success';
		case 'Recent Registrations':
			return 'info';
		case 'Recent Feedback/Reviews':
			return 'warning';
		default:
			return 'secondary';
	}
};

const RecentActivities = () => {
	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='NotificationsActive' iconColor='warning'>
					<CardTitle tag='h4' className='h5'>
						Recent Activities
					</CardTitle>
					<CardSubTitle>last 2 weeks</CardSubTitle>
				</CardLabel>
			</CardHeader>
			<CardBody isScrollable>
				<Timeline>
					{activities.map((activity, index) => (
						<TimelineItem
							key={index}
							label={activity.time.format('LT')}
							color={getActivityColor(activity.type)}>
							{activity.type === 'Recent Feedback/Reviews' ? (
								<Popovers content={activity.description} trigger='hover'>
									<span>
										<Icon icon='Star' color='warning' />
										<Icon icon='Star' color='warning' />
										<Icon icon='Star' color='warning' />
										<Icon icon='Star' color='warning' />
										<Icon icon='Star' color='warning' />
									</span>
								</Popovers>
							) : (
								activity.description
							)}
						</TimelineItem>
					))}
				</Timeline>
			</CardBody>
		</Card>
	);
};

export default RecentActivities;
