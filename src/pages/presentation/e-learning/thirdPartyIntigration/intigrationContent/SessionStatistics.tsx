import React from 'react';

import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../../components/bootstrap/Card';
import NumberOFSession from './sessionCharts/NumberofSessions';
import AverageSessionDuration from './sessionCharts/AverageSessionDuration';
import BounceRate from './sessionCharts/BounceRate';

const UserActivity = () => {
	return (
		<div>
			<CardHeader>
				<CardLabel>
					<CardTitle className='ms-2 display-6'>Session Statistics</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody>
				<div className='row'>
					<div className='col-lg-4'>
						<NumberOFSession />
					</div>
					<div className='col-lg-4'>
						<AverageSessionDuration />
					</div>
					<div className='col-lg-4'>
						<BounceRate />
					</div>
				</div>
			</CardBody>
		</div>
	);
};

export default UserActivity;
