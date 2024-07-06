const UserAdminValidate = (values: any) => {
	const errors: { [key: string]: string } = {};
	if (!values.name) {
		errors.name = 'Required';
	}
	if (!values.display_name) {
		errors.display_name = 'Required';
	}
	if (!values.note) {
		errors.note = 'Required';
	} else if (values.note.length > 100) {
		errors.note = 'Must be 100 characters or less';
	}
	return errors;
};

export default UserAdminValidate;
