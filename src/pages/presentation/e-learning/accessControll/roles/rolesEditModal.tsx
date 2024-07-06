import React, { FC, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
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
import { roles } from './data';
import USERS from '../../../../../common/data/userDummyData';
import Avatar from '../../../../../components/Avatar';
import UserAdminValidate from './validationEditForm';
import Alert from '../../../../../components/bootstrap/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { createRoleSlice } from '../../services/slice/accessControl';
import { color } from 'framer-motion';

interface IRolesEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}
const RolesEditModal: FC<IRolesEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	const itemData = id ? roles.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};

	const [thumbnail, setThumbnail] = useState<any>(null);
	const thumbInputRef = useRef<HTMLInputElement>(null);

	const dispatch = useDispatch();

	const { loading, error, role } = useSelector((state: any) => state?.role);

	const formik = useFormik({
		initialValues: {
			name: '',
			display_name: '',
			description: 'This role has administrative privileges.',
			note: 'Please ensure that you handle this with care as it grants full access to the system.',
			admin_note: 'This role should only be assigned to trusted personnel',
			admin_permissions: {
				Dashboard: { read: false, write: false, delete: false },
				Category: { read: false, write: false, delete: false },
				Module: { read: false, write: false, delete: false },
				Users: { read: false, write: false, delete: false },
				Enrollment: { read: false, write: false, delete: false },
				Participant: { read: false, write: false, delete: false },
				Feedback: { read: false, write: false, delete: false },
				AccessControl: { read: false, write: false, delete: false },
			},
		},
		validate: UserAdminValidate,
		enableReinitialize: true,
		onSubmit: async (values, { setFieldError, resetForm }) => {
			await dispatch(createRoleSlice(values) as any);

			if (!loading) {
				if (role !== null && error === null) {
					setIsOpen(false);
					resetForm();
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Updated Successfully</span>
						</span>,
						'Role has been updated successfully',
					);
				}
				if (error?.statusCode === 409) {
					setIsOpen(false);
					resetForm();
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Creation Rejected</span>
						</span>,
						'Role already exists.',
					);
				}
				if (error?.statusCode === 400) {
					setFieldError('name', 'Enter a valid field');
					setFieldError('display_name', 'Enter a valid field');
				}
			}
		},
	});

	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='md' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{'New roles'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<FormGroup id='name' label='Role for' className='col-md-12'>
							<Select
								placeholder='Please select...'
								onChange={formik.handleChange}
								ariaLabel='For role select'
								value={formik.values.name}
								onBlur={formik.handleBlur}
								isValid={formik.isValid}
								isTouched={Boolean(formik.touched.name)}
								invalidFeedback={formik.errors.name as string}>
								<Option value='admin' selected={formik.values.name === 'admin'}>
									Admin Role
								</Option>
								<Option value='teacher' selected={formik.values.name === 'teacher'}>
									Teacher Role
								</Option>
							</Select>
						</FormGroup>

						<FormGroup id='display_name' label='Name' className='col-md-12'>
							<Input
								onChange={formik.handleChange}
								value={formik.values.display_name}
								onBlur={formik.handleBlur}
								isValid={formik.isValid}
								isTouched={Boolean(formik.touched.display_name)}
								invalidFeedback={formik.errors.display_name as string}
							/>
						</FormGroup>

						<FormGroup id='note' label='Note' className='col-md-12'>
							<Textarea
								id='note'
								onChange={formik.handleChange}
								placeholder='Ex : Handle with care, full access to the system.'
								value={formik.values.note}
								onBlur={formik.handleBlur}
								isValid={formik.isValid}
								isTouched={Boolean(formik.touched.note)}
								invalidFeedback={formik.errors.note as string}
							/>
						</FormGroup>
					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					{loading ? (
						<Button color='info' isDisable>
							Saving...
						</Button>
					) : (
						<Button
							color='info'
							isDisable={!formik.isValid}
							onClick={formik.handleSubmit}>
							Save
						</Button>
					)}
				</ModalFooter>
			</Modal>
		);
	}
	return null;
};
RolesEditModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default RolesEditModal;
