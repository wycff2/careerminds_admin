import React, { FC } from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../../components/bootstrap/Card';
import useDarkMode from '../../../../../hooks/useDarkMode';
import Icon from '../../../../../components/icon/Icon';

interface KeyMetricsProps {
	totalUsers: any;
}

const KeyMetrics: FC<KeyMetricsProps> = ({ totalUsers }) => {
	console.log(totalUsers);
	const { darkModeStatus } = useDarkMode();

	const activeUser = totalUsers.filter((f: any) => f.status === 'active');
	console.log('activeUser', activeUser)
	return (
		<div>
			<CardBody>
				<div className='row'>
					<div className='col-lg-4'>
						<Card
							stretch
							shadow='sm'
							className={`bg-l${darkModeStatus ? 'o25' : '25'}-primary rounded-2`}>
							<CardHeader className='bg-transparent'>
								<CardLabel>
									<CardTitle className='mx-auto'>
										<Icon icon='PeopleOutline' size='2x' color='primary' />{' '}
										Total Users
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='d-flex justify-content-center align-items-center pb-3'>
									<div className='text-center'>
										<div className='fw-bold fs-2 mb-0'>
											{totalUsers?.length}
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-lg-4'>
						<Card
							stretch
							shadow='sm'
							className={`bg-l${darkModeStatus ? 'o25' : '25'}-secondary rounded-2`}>
							<CardHeader className='bg-transparent'>
								<CardLabel>
									<CardTitle className='mx-auto'>
										<Icon icon='PersonPin' size='2x' color='secondary' /> Active
										Users
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='d-flex justify-content-center align-items-center pb-3'>
									<div className='text-center'>
										<div className='fw-bold fs-2 mb-0'>{activeUser.length}</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-lg-4'>
						<Card
							stretch
							shadow='sm'
							className={`bg-l${darkModeStatus ? 'o25' : '25'}-success rounded-2`}>
							<CardHeader className='bg-transparent'>
								<CardLabel>
									<CardTitle className='mx-auto'>
										<Icon icon='NewLabel' size='2x' color='success' /> New
										Registrations
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='d-flex justify-content-center align-items-center pb-3'>
									<div className='text-center'>
										<div className='fw-bold fs-2 mb-0'>50</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-lg-4'>
						<Card
							stretch
							shadow='sm'
							className={`bg-l${darkModeStatus ? 'o25' : '25'}-warning rounded-2`}>
							<CardHeader className='bg-transparent'>
								<CardLabel>
									<CardTitle className='mx-auto'>
										<Icon icon='MenuBook' size='2x' color='warning' /> Courses
										Completed
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='d-flex justify-content-center align-items-center pb-3'>
									<div className='text-center'>
										<div className='fw-bold fs-2 mb-0'>1200</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-lg-4'>
						<Card
							stretch
							shadow='sm'
							className={`bg-l${darkModeStatus ? 'o25' : '25'}-info rounded-2`}>
							<CardHeader className='bg-transparent'>
								<CardLabel>
									<CardTitle className='mx-auto'>
										<Icon icon='Book' size='2x' color='info' /> Modules
										Completed
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='d-flex justify-content-center align-items-center pb-3'>
									<div className='text-center'>
										<div className='fw-bold fs-2 mb-0'>4500</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-lg-4'>
						<Card
							stretch
							shadow='sm'
							className={`bg-l${darkModeStatus ? 'o25' : '25'}-danger rounded-2`}>
							<CardHeader className='bg-transparent'>
								<CardLabel>
									<CardTitle className='mx-auto'>
										<Icon icon='AccessTimeFilled' size='2x' color='danger' />{' '}
										Avg. Course Completion Time
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='d-flex justify-content-center align-items-center pb-3'>
									<div className='text-center'>
										<div className='fw-bold fs-2 mb-0'>3 Weeks</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</CardBody>
		</div>
	);
};

export default KeyMetrics;
