import React, { useState } from 'react';
import dayjs from 'dayjs';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../../components/bootstrap/Card';
import Button from '../../../../../components/bootstrap/Button';
import Chart, { IChartOptions } from '../../../../../components/extras/Chart';
import { ApexOptions } from 'apexcharts';

interface ISalePerTab {
	[key: string]: 'Day' | 'Week' | 'Month' | 'Year';
}

const LoginTrends = () => {
	const chartOptions: ApexOptions = {
		chart: {
			height: 300,
			type: 'area',
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
		colors: [process.env.REACT_APP_WARNING_COLOR, process.env.REACT_APP_INFO_COLOR],
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'smooth',
		},
		tooltip: {
			x: {
				format: 'dd/MM/yy HH:mm',
			},
			theme: 'dark',
		},
		fill: {
			type: 'gradient',
			gradient: {
				shadeIntensity: 1,
				opacityFrom: 0.5,
				opacityTo: 0,
				stops: [0, 100],
			},
		},
	};

	function getDate(day: number) {
		const arr = [];
		for (let i = 0; i < day; i += 1) {
			arr.push(
				dayjs()
					.add(-1 * i, 'day')
					.format('ll'),
			);
		}
		return arr.reverse();
	}

	function getMonths(month: number) {
		const arr = [];
		for (let i = 0; i < month; i += 1) {
			arr.push(
				dayjs()
					.add(-1 * i, 'month')
					.format('MMM YYYY'),
			);
		}
		return arr.reverse();
	}

	function getHours(day: number) {
		const arr = [];
		for (let i = 0; i < day; i += 1) {
			arr.push(i);
		}
		return arr;
	}

	const DUMMY_DATA: { [key: string]: IChartOptions } = {
		WEEK: {
			series: [
				{
					name: 'Last Week',
					data: [31, 40, 28, 51, 42, 109, 100],
				},
				{
					name: 'This Week',
					data: [11, 32, 45, 32, 34, 52, 41],
				},
			],
			options: {
				...chartOptions,
				xaxis: {
					categories: getDate(7),
				},
			},
		},
		MONTH: {
			series: [
				{
					name: 'Last Month',
					data: [
						31, 40, 28, 51, 42, 109, 100, 70, 30, 56, 21, 43, 12, 45, 67, 32, 46, 21,
						56, 87, 64, 42, 56, 108, 76, 41, 54,
					],
				},
				{
					name: 'This Month',
					data: [
						11, 32, 45, 32, 34, 52, 41, 24, 32, 45, 32, 43, 52, 41, 28, 32, 45, 67, 34,
						52, 41, 11, 32, 89, 32, 34, 52, 41,
					],
				},
			],
			options: {
				...chartOptions,
				xaxis: {
					categories: getDate(28),
				},
			},
		},
		YEAR: {
			series: [
				{
					name: 'Last Year',
					data: [310, 400, 280, 510, 420, 1090, 1000, 700, 300, 560, 210, 430],
				},
				{
					name: 'This Year',
					data: [110, 320, 450, 320, 340, 520, 410, 240, 320, 450, 320, 430],
				},
			],
			options: {
				...chartOptions,
				xaxis: {
					categories: getMonths(12),
				},
			},
		},
	};

	const [state, setState] = useState<IChartOptions>({
		series: DUMMY_DATA.MONTH.series,
		options: DUMMY_DATA.MONTH.options,
	});

	const SALE_PER_TAB: { [key: string]: ISalePerTab['key'] } = {
		DAY: 'Day',
		WEEK: 'Week',
		MONTH: 'Month',
		YEAR: 'Year',
	};

	const [activeSalePerTab, setActiveSalePerTab] = useState<ISalePerTab['key']>(
		SALE_PER_TAB.MONTH,
	);

	return (
		<Card stretch>
			<CardHeader>
				<CardLabel>
					<CardTitle className='ms-2'>Login Trends</CardTitle>
				</CardLabel>
				<CardActions>
					<Button
						color='info'
						onClick={() => {
							setActiveSalePerTab(SALE_PER_TAB.WEEK);
							setState({
								series: DUMMY_DATA.WEEK.series,
								options: DUMMY_DATA.WEEK.options,
							});
						}}
						isLink={activeSalePerTab !== SALE_PER_TAB.WEEK}
						isLight={activeSalePerTab === SALE_PER_TAB.WEEK}>
						Week
					</Button>
					<Button
						color='info'
						onClick={() => {
							setActiveSalePerTab(SALE_PER_TAB.MONTH);
							setState({
								series: DUMMY_DATA.MONTH.series,
								options: DUMMY_DATA.MONTH.options,
							});
						}}
						isLink={activeSalePerTab !== SALE_PER_TAB.MONTH}
						isLight={activeSalePerTab === SALE_PER_TAB.MONTH}>
						Month
					</Button>
					<Button
						color='info'
						onClick={() => {
							setActiveSalePerTab(SALE_PER_TAB.YEAR);
							setState({
								series: DUMMY_DATA.YEAR.series,
								options: DUMMY_DATA.YEAR.options,
							});
						}}
						isLink={activeSalePerTab !== SALE_PER_TAB.YEAR}
						isLight={activeSalePerTab === SALE_PER_TAB.YEAR}>
						Year
					</Button>
				</CardActions>
			</CardHeader>
			<CardBody>
				<Chart
					series={state.series}
					options={state.options}
					type={state.options.chart?.type}
					height={state.options.chart?.height}
				/>
			</CardBody>
		</Card>
	);
};

export default LoginTrends;
