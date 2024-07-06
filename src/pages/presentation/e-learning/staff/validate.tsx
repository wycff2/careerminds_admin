const ChangePasswordValidation = (values: any) => {
	const errors: { [key: string]: string } = {};

	if (values.oldPassword) {
		if (!values.newPassword) {
			errors.newPassword = 'Please provide a valid password.';
		} else {
			if (values.newPassword.length < 8 || values.newPassword.length > 32) {
				errors.newPassword =
					'The password must be at least 8 characters long, but no more than 32. ';
			} else if (!/[0-9]/g.test(values.newPassword)) {
				errors.newPassword =
					'Require that at least one digit appear anywhere in the string. ';
			} else if (!/[a-z]/g.test(values.newPassword)) {
				errors.newPassword =
					'Require that at least one lowercase letter appear anywhere in the string. ';
			} else if (!/[A-Z]/g.test(values.newPassword)) {
				errors.newPassword =
					'Require that at least one uppercase letter appear anywhere in the string. ';
			} else if (!/[!@#$%^&*)(+=._-]+$/g.test(values.newPassword)) {
				errors.newPassword =
					'Require that at least one special character appear anywhere in the string. ';
			} else {
				errors.newPassword = '';
			}
		}

		if (!values.confirmPassword) {
			errors.confirmPassword = 'Please provide a valid password.';
		} else if (values.newPassword !== values.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match.';
		} else {
			errors.confirmPassword = '';
		}
	}

	return errors;
};

export default ChangePasswordValidation;
