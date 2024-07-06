const CategoryValidate = (values: any) => {
	const errors: { [key: string]: string } = {};
	if (!values.user) {
		errors.user = 'Required';
	}
	if (!values.course) {
		errors.course = 'Required';
	}
	// if (values.status) {
	// 	errors.status = 'Required';
	// }
	// if (values.parentCat) {
	// 	errors.parentCat = 'Required';
	// }
	// if (values.description) {
	// 	errors.description = 'Required';
	// } else if (values.description.length > 100) {
	// 	errors.description = 'Must be 100 characters or less';
	// }
	return errors;
}

export default CategoryValidate;