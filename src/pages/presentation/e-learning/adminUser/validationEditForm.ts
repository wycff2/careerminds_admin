const UserAdminValidate = (values: any) => {
	const errors: { [key: string]: string } = {};
	if (!values.name) {
		errors.name = 'Required';
	}
	if (!values.status) {
		errors.status = 'Required';
	}
	if (!values.description) {
		errors.description = 'Required';
	} else if (values.description.length > 100) {
		errors.description = 'Must be 100 characters or less';
	}
	return errors;
};

export default UserAdminValidate;
