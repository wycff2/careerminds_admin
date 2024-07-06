const CategoryValidate = (values: any) => {
	const errors: { [key: string]: string } = {};
	if (!values.Name) {
		errors.Name = 'Required';
	} else if (values.Name.length > 50) {
		errors.Name = 'Must be 50 characters or less';
	}
	if (!values.status) {
		errors.status = 'Required';
	}
	if (!values.language) {
		errors.language = 'Required';
	}
	if (!values.description) {
		errors.description = 'Required';
	} else if (values.description.length > 1000) {
		errors.description = 'Must be 1000 characters or less';
	}
	if (!values.price) {
		errors.price = 'Required';
	} else if (isNaN(values.price)) {
		errors.price = 'Must be a number';
	}
	if (!values.discount) {
		errors.discount = 'Required';
	} else if (isNaN(values.discount)) {
		errors.discount = 'Discount be a number';
	}
	return errors;
};

export default CategoryValidate;
