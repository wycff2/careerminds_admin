const ModuleValidate = (values: any) => {
	const errors: { [key: string]: string } = {};
	if (!values.Name) {
		errors.Name = 'Required';
	}
	// else if (values.Name.length > 30) {
	// 	errors.Name = 'Must be 30 characters or less';
	// }
	if (!values.status) {
		errors.status = 'Required';
	}
	if (!values.description) {
		errors.description = 'Required';
	} else if (values.description.length > 500) {
		errors.description = 'Must be 500 characters or less';
	}
	return errors;
};

export default ModuleValidate;
