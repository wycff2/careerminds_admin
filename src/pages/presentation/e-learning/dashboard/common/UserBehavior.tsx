import React from 'react';

import AverageSessionDuration from './AverageSessionDuration';
import LoginTrends from './LoginTrends';

const UserBehavior = () => {
	return (
		<div>
			<div className='row'>
				<div className='col-lg-6'>
					<LoginTrends />
				</div>
				<div className='col-lg-6'>
					<AverageSessionDuration />
				</div>
			</div>
		</div>
	);
};

export default UserBehavior;
