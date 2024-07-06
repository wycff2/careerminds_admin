import React, { FC, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import ReactCreditCards, { Focused } from 'react-credit-cards';
import Payment from 'payment';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../../components/bootstrap/Modal';
import showNotification from '../../../../../components/extras/showNotification';
import Icon from '../../../../../components/icon/Icon';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../../components/bootstrap/forms/Input';

import Button from '../../../../../components/bootstrap/Button';
import Textarea from '../../../../../components/bootstrap/forms/Textarea';
import Select from '../../../../../components/bootstrap/forms/Select';
import Option from '../../../../../components/bootstrap/Option';
import { enrollments } from './data';

import EnrollmentValidate from './validationEditForm';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../../components/bootstrap/Card';
import Avatar from '../../../../../components/Avatar';
import USERS from '../../../../../common/data/userDummyData';
import CommonDesc from '../../../../../common/other/CommonDesc';
import CommonMyWallet from '../../../../_common/CommonMyWallet';
import Popovers from '../../../../../components/bootstrap/Popovers';
import DatePicker from 'react-modern-calendar-datepicker';
import { getAllUserSlice } from '../../services/slice/users';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategorieSlice } from '../../services/slice/course';
import { createEnrolmentSlice } from '../../services/slice/enrolment';

interface IEnrollmentEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}

interface Enrollment {
	id: string;
	user: any[];
	studentId: string;
	status: string;
	course: string;
	description: string;
}

type TTabs = 'Affirm' | 'Klarna' | 'GPay';
interface ITabs {
	[key: string]: TTabs;
}

const EnrollmentEditModal: FC<IEnrollmentEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	const dispatch = useDispatch();

	const itemData = id ? enrollments.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};


	const { users } = useSelector((state: any) => state?.users);
	const { categories } = useSelector((state: any) => state?.category);
	const { enrolment, loading, error } = useSelector((state: any) => state?.enrolment);


	const filterUser = users.filter((u: any) => u.role === 'student');
	const courseToAdd = categories?.data;

	const formik = useFormik({
		initialValues: {
			user: item?.user || '',
			course: item?.course || '',
			status: item?.status || 'active',
			paymentMethod: item?.paymentMethod || 'GPay',
			description: item?.description || 'null',
		},
		validate: EnrollmentValidate,
		enableReinitialize: true,
		onSubmit: async (values) => {
			await dispatch(createEnrolmentSlice(values) as any);

			if (!loading && enrolment !== null) {
				setIsOpen(false);
				showNotification(
					<span className='d-flex align-items-center'>
						<Icon icon='Info' size='lg' className='me-1' />
						<span>Updated Successfully</span>
					</span>,
					'Enrollment has been updated successfully',
				);
			}
		},
	});


	const pageSize = useMemo(
		() => ({
			pageNo: 1,
			page: 11,
		}),
		[],
	);

	useEffect(() => {
		dispatch(getAllUserSlice(pageSize) as any);
		dispatch(getAllCategorieSlice(pageSize) as any);
	}, [dispatch, pageSize]);

	const TABS: ITabs = {
		Affirm: 'Affirm',
		Klarna: 'Klarna',
		GPay: 'GPay',
	};
	const [activeTab, setActiveTab] = useState<TTabs>(TABS.Affirm);

	const Klarna = 'https://asset.brandfetch.io/id-Xkz2G4L/idH0urNvKu.png?updated=1716845775558';
	const Affirm =
		'https://www.apkmirror.com/wp-content/themes/APKMirror/ap_resize/ap_resize.php?src=https%3A%2F%2Fdownloadr2.apkmirror.com%2Fwp-content%2Fuploads%2F2022%2F01%2F10%2F61eb5529a7734.png&w=96&h=96&q=100';
	const GPay = 'https://www.computerhope.com/jargon/g/google-pay.png';

	if (id || id === '0') {
		return (
			<form noValidate>
				<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' titleId={id.toString()}>
					<ModalHeader setIsOpen={setIsOpen} className='p-4'>
						<ModalTitle id={id}>{'New Enrollment'}</ModalTitle>
					</ModalHeader>
					<ModalBody className='px-4'>
						<div className='row g-4'>
							<div className='row'>
								<FormGroup id='user' label='Student' className='col-xl-6'>
									<input
										list='userIdList'
										placeholder='Search by name or userId...'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										aria-label='Search by name or userId'
										name='user'
										value={
											filterUser.find(
												(f: any) => f._id === formik.values.user,
											)?.Name || formik.values.user
										}
										className={`form-control ${
											formik.touched.user && formik.errors.user
												? 'is-invalid'
												: ''
										}`}
									/>
									<datalist id='userIdList'>
										{filterUser.map((u: any, i: any) => (
											<option key={i} value={u?._id}>
												<small>{u?.uniqueId}</small>
											</option>
										))}
									</datalist>
									{/* {formik.touched.user && formik.errors.user ? (
										<div className='invalid-feedback'>{formik.errors.user}</div>
									) : undefined} */}
								</FormGroup>

								<FormGroup id='course' label='Course' className='col-xl-6'>
									<Select
										placeholder='Please select...'
										onChange={formik.handleChange}
										ariaLabel='Parent Enrollment select'
										onBlur={formik.handleBlur}
										value={formik.values.course}
										isValid={formik.isValid}
										isTouched={Boolean(formik.touched.course)}
										invalidFeedback={formik.errors.course as string}
										name='course'>
										{courseToAdd &&
											courseToAdd.map((c: any, i: any) => (
												<option key={i} value={c?._id}>
													{c?.Name}
												</option>
											))}
									</Select>
								</FormGroup>
							</div>

							<FormGroup id='' label='Payment' className='col-md-12 mx-auto'>
								<div className='row'>
									<div className='col-xl-4 col-lg-5 col-md-6'>
										<Card stretch>
											<CardHeader>
												<CardLabel icon='Person' iconColor='info'>
													<CardTitle>Account Settings</CardTitle>
													<CardSubTitle>
														Personal Information
													</CardSubTitle>
												</CardLabel>
											</CardHeader>
											<CardBody isScrollable>
												<div className='row g-3'>
													<div className='col-12'>
														<Button
															color='info'
															className='w-100 p-3'
															isLight={TABS.Affirm !== activeTab}
															onClick={() =>
																setActiveTab(TABS.Affirm)
															}>
															<img
																src={Affirm}
																alt=''
																className='rounded-circle me-2'
																style={{
																	width: '20px',
																	height: '20px',
																}}
															/>
															Affirm Pay
														</Button>
													</div>
													<div className='col-12'>
														<Button
															color='info'
															className='w-100 p-3'
															isLight={TABS.Klarna !== activeTab}
															onClick={() =>
																setActiveTab(TABS.Klarna)
															}>
															<img
																src={Klarna}
																alt=''
																className='rounded-circle me-2'
																style={{
																	width: '20px',
																	height: '20px',
																}}
															/>
															Klarna Pays
														</Button>
													</div>
													<div className='col-12'>
														<Button
															color='info'
															className='w-100 p-3'
															isLight={TABS.GPay !== activeTab}
															onClick={() => setActiveTab(TABS.GPay)}>
															<img
																src={GPay}
																alt=''
																className='rounded-circle me-2'
																style={{
																	width: '20px',
																	height: '20px',
																}}
															/>
															GPay
														</Button>
													</div>
												</div>
											</CardBody>
										</Card>
									</div>
									<div className='col-xl-8 col-lg-7 col-md-6'>
										{TABS.Affirm === activeTab && (
											<Card
												stretch
												tag='form'
												noValidate
												onSubmit={formik.handleSubmit}>
												<CardHeader>
													<CardLabel iconColor='info'>
														<CardTitle>
															{' '}
															<img
																src={Affirm}
																alt=''
																className='rounded-circle me-2'
																style={{
																	width: '30px',
																	height: '30px',
																}}
															/>{' '}
															Affirm Pay
														</CardTitle>
													</CardLabel>
												</CardHeader>
												<CardBody className='pb-0'>
													<div className='row'>
														<div className='col-md-12'>
															<form
																className='row g-4'
																noValidate
																onSubmit={formik.handleSubmit}>
																<FormGroup
																	className='col-12'
																	id='name'
																	label='Name'>
																	<Input
																		placeholder='Full Name'
																		autoComplete='ccName'
																		onChange={
																			formik.handleChange
																		}
																		// value={formik.values.name}
																		// onFocus={handleInputFocus}
																		onBlur={formik.handleBlur}
																		isValid={formik.isValid}
																		// isTouched={
																		// 	formik.touched.name
																		// }
																		// invalidFeedback={
																		// 	formik.errors.name
																		// }
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
																<FormGroup
																	className='col-6'
																	id='number'
																	label='Credit Card Number'>
																	<Input
																		type='text'
																		// mask={
																		// 	Payment.fns.cardType(
																		// 		formik.values
																		// 			// .number,
																		// 	) === 'amex'
																		// 		? '9999 999999 99999'
																		// 		: '9999 9999 9999 9999'
																		// }
																		maskChar='_'
																		autoComplete='cc-number'
																		placeholder='Digit Numbers'
																		required
																		onChange={
																			formik.handleChange
																		}
																		// value={formik.values.number}
																		// onFocus={handleInputFocus}
																		onBlur={formik.handleBlur}
																		isValid={formik.isValid}
																		// isTouched={
																		// 	formik.touched.number
																		// }
																		// invalidFeedback={
																		// 	formik.errors.number
																		// }
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
																<FormGroup
																	className='col-3'
																	id='cvc'
																	label='CVC Number'>
																	<Input
																		type='number'
																		autoComplete='cc-csc'
																		placeholder='CVC Number'
																		required
																		onChange={
																			formik.handleChange
																		}
																		// value={formik.values.cvc}
																		// onFocus={handleInputFocus}
																		// onBlur={formik.handleBlur}
																		// isValid={formik.isValid}
																		// isTouched={
																		// 	formik.touched.cvc
																		// }
																		// invalidFeedback={
																		// 	formik.errors.cvc
																		// }
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
																<FormGroup
																	className='col-3'
																	id='expiry'
																	label='Expiry'>
																	<Input
																		type='text'
																		autoComplete='cc-exp'
																		placeholder='MM/YY'
																		mask='99/99'
																		required
																		onChange={
																			formik.handleChange
																		}
																		// value={formik.values.expiry}
																		// onFocus={handleInputFocus}
																		// onBlur={formik.handleBlur}
																		// isValid={formik.isValid}
																		// isTouched={
																		// 	formik.touched.expiry
																		// }
																		// invalidFeedback={
																		// 	formik.errors.expiry
																		// }
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</form>
														</div>
													</div>
												</CardBody>
												<CardFooter>
													<CardFooterLeft>
														<Button
															color='info'
															isLink
															type='reset'
															onClick={formik.resetForm}>
															Reset
														</Button>
													</CardFooterLeft>
													<CardFooterRight>
														<Button
															type='submit'
															icon='Save'
															color='info'
															isOutline
															isDisable={
																!formik.isValid &&
																!!formik.submitCount
															}>
															Pay Now
														</Button>
													</CardFooterRight>
												</CardFooter>
											</Card>
										)}
										{TABS.Klarna === activeTab && (
											<Card
												stretch
												tag='form'
												noValidate
												onSubmit={formik.handleSubmit}>
												<CardHeader>
													<CardLabel iconColor='info'>
														<CardTitle>
															{' '}
															<img
																src={Klarna}
																alt=''
																className='rounded-circle me-2'
																style={{
																	width: '30px',
																	height: '30px',
																}}
															/>{' '}
															Klarna Pay
														</CardTitle>
													</CardLabel>
												</CardHeader>
												<CardBody className='pb-0'>
													<div className='row'>
														<div className='col-md-12'>
															<form
																className='row g-4'
																noValidate
																onSubmit={formik.handleSubmit}>
																<FormGroup
																	className='col-12'
																	id='name'
																	label='Name'>
																	<Input
																		placeholder='Full Name'
																		autoComplete='ccName'
																		onChange={
																			formik.handleChange
																		}
																		// value={formik.values.name}
																		// onFocus={handleInputFocus}
																		onBlur={formik.handleBlur}
																		isValid={formik.isValid}
																		// isTouched={
																		// 	formik.touched.name
																		// }
																		// invalidFeedback={
																		// 	formik.errors.name
																		// }
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
																<FormGroup
																	className='col-6'
																	id='number'
																	label='Credit Card Number'>
																	<Input
																		type='text'
																		// mask={
																		// 	Payment.fns.cardType(
																		// 		formik.values
																		// 			// .number,
																		// 	) === 'amex'
																		// 		? '9999 999999 99999'
																		// 		: '9999 9999 9999 9999'
																		// }
																		maskChar='_'
																		autoComplete='cc-number'
																		placeholder='Digit Numbers'
																		required
																		onChange={
																			formik.handleChange
																		}
																		// value={formik.values.number}
																		// onFocus={handleInputFocus}
																		onBlur={formik.handleBlur}
																		isValid={formik.isValid}
																		// isTouched={
																		// 	formik.touched.number
																		// }
																		// invalidFeedback={
																		// 	formik.errors.number
																		// }
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
																<FormGroup
																	className='col-3'
																	id='cvc'
																	label='CVC Number'>
																	<Input
																		type='number'
																		autoComplete='cc-csc'
																		placeholder='CVC Number'
																		required
																		onChange={
																			formik.handleChange
																		}
																		// value={formik.values.cvc}
																		// onFocus={handleInputFocus}
																		// onBlur={formik.handleBlur}
																		// isValid={formik.isValid}
																		// isTouched={
																		// 	formik.touched.cvc
																		// }
																		// invalidFeedback={
																		// 	formik.errors.cvc
																		// }
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
																<FormGroup
																	className='col-3'
																	id='expiry'
																	label='Expiry'>
																	<Input
																		type='text'
																		autoComplete='cc-exp'
																		placeholder='MM/YY'
																		mask='99/99'
																		required
																		onChange={
																			formik.handleChange
																		}
																		// value={formik.values.expiry}
																		// onFocus={handleInputFocus}
																		// onBlur={formik.handleBlur}
																		// isValid={formik.isValid}
																		// isTouched={
																		// 	formik.touched.expiry
																		// }
																		// invalidFeedback={
																		// 	formik.errors.expiry
																		// }
																		// validFeedback='Looks good!'
																	/>
																</FormGroup>
															</form>
														</div>
													</div>
												</CardBody>
												<CardFooter>
													<CardFooterLeft>
														<Button
															color='info'
															isLink
															type='reset'
															onClick={formik.resetForm}>
															Reset
														</Button>
													</CardFooterLeft>
													<CardFooterRight>
														<Button
															type='submit'
															icon='Save'
															color='info'
															isOutline
															isDisable={
																!formik.isValid &&
																!!formik.submitCount
															}>
															Pay Now
														</Button>
													</CardFooterRight>
												</CardFooter>
											</Card>
										)}
										{TABS.GPay === activeTab && <CommonMyWallet />}
									</div>
								</div>
							</FormGroup>
						</div>
					</ModalBody>
					<ModalFooter className='px-4 pb-4'>
						<Button
							color='info'
							type='submit'
							isDisable={!formik.isValid}
							onClick={formik.handleSubmit}>
							{loading ? 'Saving...' : 'Save'}
						</Button>
					</ModalFooter>
				</Modal>
			</form>
		);
	}
	return null;
};
EnrollmentEditModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default EnrollmentEditModal;
