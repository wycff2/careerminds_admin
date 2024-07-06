import React from 'react';

import Card, { CardBody } from '../../../../../../components/bootstrap/Card';
import Chart from '../../../../../../components/extras/Chart';

const NumberOFSession = () => {
	return (
		<Card stretch>
			<CardBody>
				<Chart
					height={250}
					options={{
						chart: {
							height: 250,
							type: 'line',
							toolbar: {
								show: true, // Show toolbar
								tools: {
									zoom: true,
									zoomin: true,
									zoomout: true,
									pan: true,
									reset: true,
								},
							},
						},
						colors: ['#FFB236'], // Yellow color for bounce rate
						dataLabels: {
							enabled: false,
						},
						grid: {
							row: {
								colors: ['#f3f3f3', 'transparent'],
								opacity: 0.5,
							},
						},
						stroke: {
							curve: 'smooth',
						},
						title: {
							align: 'left',
							text: 'Bounce Rate',
						},
						xaxis: {
							categories: [
								'Jan',
								'Feb',
								'Mar',
								'Apr',
								'May',
								'Jun',
								'Jul',
								'Aug',
								'Sept',
								'Oct',
								'Nov',
								'Dec',
							],
						},
					}}
					series={[
						{
							data: [30, 25, 20, 15, 10, 5, 0, 0, 0, 0, 0, 0],
							name: 'Bounce Rate (%)',
						},
					]}
					type='line'
				/>
			</CardBody>
		</Card>
	);
};

export default NumberOFSession;
