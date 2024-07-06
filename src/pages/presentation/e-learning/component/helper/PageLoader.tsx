import React, { Fragment } from 'react';
import PageWrapper from '../../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../../layout/Page/Page';
import Card, { CardBody } from '../../../../../components/bootstrap/Card';
import Spinner from '../../../../../components/bootstrap/Spinner';

const PageLoader = () => {
	return (
		<PageWrapper>
			<Page>
				<Card>
					<CardBody>
						<div className='' style={{ height: '82vh', position: 'relative' }}>
							<Spinner
								inButton='onlyIcon'
								style={{
									position: 'absolute',
									top: '48%',
									left: '48%',
								}}></Spinner>
						</div>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default PageLoader;
