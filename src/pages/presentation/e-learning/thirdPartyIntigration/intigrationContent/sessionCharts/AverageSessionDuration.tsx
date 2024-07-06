import React from 'react';

import Card, { CardBody } from '../../../../../../components/bootstrap/Card';
import Chart from '../../../../../../components/extras/Chart';

const AverageSessionDuration = () => {
	return (
		<Card stretch>
			<CardBody>
				<Chart
					height={250}
					options={{
						chart: {
							height: 250,
							type: 'bar',
							toolbar: {
								show: true,
								tools: {
									zoom: true,
									zoomin: true,
									zoomout: true,
									pan: true,
									reset: true,
								},
							},
						},
						colors: ['#F7418F'],
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
							curve: 'straight',
						},
						title: {
							align: 'left',
							text: 'Average Session Duration',
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
							data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 130, 90, 75],
							name: 'Duration(mins)',
						},
					]}
					type='bar'
				/>
			</CardBody>
		</Card>
	);
};

export default AverageSessionDuration;
