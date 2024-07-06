import React, { FC, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
import showNotification from '../../../../components/extras/showNotification';
import Icon from '../../../../components/icon/Icon';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';

import Button from '../../../../components/bootstrap/Button';
import Textarea from '../../../../components/bootstrap/forms/Textarea';
import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';
import { adminUser } from './data';
import USERS from '../../../../common/data/userDummyData';
import Avatar from '../../../../components/Avatar';
import UserAdminValidate from './validationEditForm';

interface IadminUserEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}
const AdminUserEditModal: FC<IadminUserEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	const itemData = id ? adminUser.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};

	const [thumbnail, setThumbnail] = useState<any>(null);
	const thumbInputRef = useRef<HTMLInputElement>(null);

	const formik = useFormik({
		initialValues: {
			thumb: item?.thumb,
			name: item?.name || '',
			status: item?.status || '',
			belongsTo: item?.categoryBelongsTo || '',
			description: item?.description || '',
		},
		validate: UserAdminValidate,
		enableReinitialize: true,
		onSubmit: (values) => {
			setIsOpen(false);
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Successfully</span>
				</span>,
				'adminUser has been updated successfully',
			);
		},
	});

	const handleAddThumbnail = (e: any) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setThumbnail(reader.result);
			};
			reader.readAsDataURL(file);
		}
		if (thumbInputRef.current) {
			thumbInputRef.current.click();
		}
	};

	const handleDeleteThumbnail = () => {
		setThumbnail(null);
	};

	if (id || id === '0') {
		return (
			<Modal
				noValidate
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				size='md'
				titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{'New adminUser'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<FormGroup id='name' label='Select user' className='col-md-12'>
							<Select
								placeholder='Please select...'
								onChange={formik.handleChange}
								ariaLabel='Select user '
								onBlur={formik.handleBlur}
								value={formik.values.name}
								isValid={formik.isValid}
								isTouched={Boolean(formik.touched.name)}
								invalidFeedback={formik.errors.name as string}>
								{adminUser.map((Participant, i) => (
									<Option
										key={i}
										value={Participant?.name}
										selected={formik.values.name === Participant?.name}>
										{Participant?.name}
									</Option>
								))}
							</Select>
						</FormGroup>
						<FormGroup id='status' label='Status' className='col-md-12'>
							<Select
								placeholder='Please select...'
								onChange={formik.handleChange}
								ariaLabel='Status select'
								value={formik.values.status}
								onBlur={formik.handleBlur}
								isValid={formik.isValid}
								isTouched={Boolean(formik.touched.status)}
								invalidFeedback={formik.errors.status as string}>
								{/* Provide different values for each option */}
								<Option value='Active' selected={formik.values.status === 'Active'}>
									Active
								</Option>
								<Option
									value='Inactive'
									selected={formik.values.status === 'Inactive'}>
									Inactive
								</Option>
							</Select>
						</FormGroup>

						<FormGroup id='description' label='Description' className='col-md-12'>
							<Textarea
								id='description'
								onChange={formik.handleChange}
								value={formik.values.description}
								onBlur={formik.handleBlur}
								isValid={formik.isValid}
								isTouched={Boolean(formik.touched.description)}
								invalidFeedback={formik.errors.description as string}
							/>
						</FormGroup>
					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button color='info' isDisable={!formik.isValid} onClick={formik.handleSubmit}>
						Save
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
	return null;
};
AdminUserEditModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default AdminUserEditModal;
