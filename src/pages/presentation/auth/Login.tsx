import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';

import useDarkMode from '../../../hooks/useDarkMode';
import { useFormik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';
import { createLoginSlice } from '../e-learning/services/slice/auth';
import Modal, { ModalBody, ModalFooter } from '../../../components/bootstrap/Modal';

interface ILoginProps {
	isSignUp?: boolean;
}
const Login: FC<ILoginProps> = () => {
	const [activeMode, setActiveMode] = useState<boolean>(false);
	// const { setUser } = useContext(AuthContext);
	const { loading } = useSelector((state: any) => state.auth);

	const dispatch = useDispatch();

	const { darkModeStatus } = useDarkMode();

	const navigate = useNavigate();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			email: '',
			password: '',
		},
		validate: (values) => {
			const errors: { email?: string; password?: string } = {};

			if (!values.email) {
				errors.email = 'Required';
			}

			if (!values.password) {
				errors.password = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: async (values) => {
			try {
				const response = await dispatch(createLoginSlice(values) as any);
				console.log('response', response);

				const { statusCode, error, data } = response.payload;

				if (
					statusCode === 201 &&
					!loading &&
					data.role !== 'student' &&
					data?.role?.is_activated
				) {
					navigate('/');
				} else if (data && !data?.role?.is_activated) {
					setActiveMode(true);
				} else if (error) {
					if (error === 'Incorrect password') {
						formik.setErrors({ password: 'Invalid password' });
					} else if (error === 'User not found') {
						formik.setErrors({ email: 'Invalid email' });
					} else {
						formik.setErrors({ email: 'Invalid email' });
						formik.setErrors({ password: 'Invalid password' });
					}
				} else if (data.role === 'student') {
					alert('You are an unauthorized user');
				} else {
					formik.setErrors({ email: 'Invalid email' });
					formik.setErrors({ password: 'Invalid password' });
				}
			} catch (error) {
				alert('There are several issues.');
			}
		},
	});

	return (
		<PageWrapper isProtected={false} title={'Login'}>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to=''
										className={classNames(
											'text-decoration-none  fw-bold display-5',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}>
										{/* <Logo width={200} /> */}
										Career Minds
									</Link>
								</div>
								<div
									className={classNames('rounded-3', {
										'bg-l10-dark': !darkModeStatus,
										'bg-dark': darkModeStatus,
									})}></div>

								{/* <LoginHeader isNewUser={singUpStatus} /> */}

								<form className='row g-4'>
									<div className='col-12'>
										<FormGroup
											id='email'
											isFloating
											label='Your email'
											className='my-4'>
											<Input
												autoComplete='username'
												value={formik.values.email}
												isTouched={formik.touched.email}
												invalidFeedback={formik.errors.email}
												isValid={formik.isValid}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												onFocus={() => {
													formik.setErrors({});
												}}
											/>
										</FormGroup>
										<FormGroup
											id='password'
											isFloating
											label='Password'
											className='my-4'>
											<Input
												type='password'
												autoComplete='current-password'
												value={formik.values.password}
												isTouched={formik.touched.password}
												invalidFeedback={formik.errors.password}
												validFeedback=''
												isValid={formik.isValid}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</FormGroup>
									</div>
									<div className='col-12'>
										{loading ? (
											<Button
												color='warning'
												isDisable
												className='w-100 py-3'>
												Logging in...
											</Button>
										) : (
											<Button
												color='warning'
												className='w-100 py-3'
												type='submit'
												onClick={formik.handleSubmit}>
												Login
											</Button>
										)}
									</div>
								</form>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
			<Modal
				isOpen={activeMode}
				id='example-modal'
				isAnimation={false}
				isCentered
				setIsOpen={function noRefCheck() {}}
				size='md'
				titleId='example-title'>
				<ModalBody className='p-5'>
					<h5 className='text-center'>
						For the moment, you don't have access to this website!
					</h5>
				</ModalBody>
				<ModalFooter>
					<Button
						className='d-block mx-auto'
						color='dark'
						onClick={() => setActiveMode(false)}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};

export default Login;
