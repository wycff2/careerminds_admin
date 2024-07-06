import React, { useState } from 'react';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../../components/bootstrap/Card';
import Button from '../../../../../components/bootstrap/Button';
import Chart, { IChartOptions } from '../../../../../components/extras/Chart';

const TraficSource = () => {
	return (
		<Card stretch>
			<CardHeader>
				<CardLabel>
					<CardTitle className='display-6'>Trafic Source</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody>
				<Chart
					height={380}
					options={{
						chart: {
							type: 'pie',
							width: 380,
						},
						labels: [
							'Organic Search',
							'Paid Search',
							'Social Media',
							'Referral',
							'Direct',
						],
						legend: {
							position: 'bottom',
						},
					}}
					series={[44, 55, 13, 43, 22]}
					type='pie'
				/>
			</CardBody>
		</Card>
	);
};

export default TraficSource;
