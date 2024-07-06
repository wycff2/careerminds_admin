import React from 'react';
import Header, { HeaderLeft } from '../../../../../layout/Header/Header';
import Search from './Search';
import CommonHeaderRight from './CommonHeaderRight';
import CommonHeaderChat from './CommonHeaderChat';

const DashboardHeaderEL = () => {
	return (
		<Header>
			<HeaderLeft>
				<Search />
			</HeaderLeft>
			<CommonHeaderRight afterChildren={<CommonHeaderChat />} />
		</Header>
	);
};

export default DashboardHeaderEL;
