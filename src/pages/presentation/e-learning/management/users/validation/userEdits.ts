const userCreateValidate = (values: any) => {
	const errors: { [key: string]: string } = {};

	if (!values.Name) {
		errors.Name = 'Name is required';
	}

	if (!values.email) {
		errors.email = 'Email is required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}

	if (!values.password) {
		errors.password = 'Password is required';
	} else if (values.password.length < 6) {
		errors.password = 'Password must be at least 6 characters';
	}

	if (!values.confirmPassword) {
		errors.confirmPassword = 'Confirm Password is required';
	} else if (values.confirmPassword !== values.password) {
		errors.confirmPassword = 'Passwords must match';
	}

	if (!values.status) {
		errors.status = 'Status is required';
	}

	return errors;
};

export default userCreateValidate;
