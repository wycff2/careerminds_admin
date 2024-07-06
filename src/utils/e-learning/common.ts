import moment from 'moment';

export const formatDate = (dateString: any) => {
	const date = moment(dateString);
	const formattedDate = date.format('DD MMM YYYY');
	return formattedDate;
};

export const capitalize = (str: any) => {
	if (typeof str !== 'string' || str.length === 0) {
		return str;
	}
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
