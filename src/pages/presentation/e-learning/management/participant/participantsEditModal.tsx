import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
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
import { participants } from './data';
import USERS from '../../../../../common/data/userDummyData';
import Avatar from '../../../../../components/Avatar';
import { getAllUserSlice } from '../../services/slice/users';
import { useDispatch, useSelector } from 'react-redux';

interface IParticipantsEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}
const ParticipantsEditModal: FC<IParticipantsEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	const dispatch = useDispatch();
	const itemData = id ? participants.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};

	const [thumbnail, setThumbnail] = useState<any>(null);
	const thumbInputRef = useRef<HTMLInputElement>(null);

	const { users } = useSelector((state: any) => state?.users);

	const filterUser = users.filter((u: any) => u.role === 'student');

	const formik = useFormik({
		initialValues: {
			thumb: item?.thumb,
			Name: item?.Name || '',
			status: item?.status || '',
			belongsTo: item?.categoryBelongsTo || '',
			description: item?.description || '',
		},
		enableReinitialize: true,
		onSubmit: (values) => {
			setIsOpen(false);
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Successfully</span>
				</span>,
				'Participants has been updated successfully',
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

	const pageSize = useMemo(
		() => ({
			pageNo: 1,
			page: 11,
		}),
		[],
	);

	useEffect(() => {
		dispatch(getAllUserSlice(pageSize) as any);
	}, [dispatch, pageSize]);

	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='md' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{'New Participants'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<FormGroup id='parentCat' label='Student' className='col-md-12'>
							<input
								list='userIdList'
								placeholder='Search by name or userId...'
								onChange={formik.handleChange}
								aria-label='Search by name or userId'
								name='Name'
								value={formik.values.Name}
								className='form-control'
							/>
							<datalist id='userIdList'>
								{filterUser.map((u: any, i: any) => (
									<option key={i} value={`${u?.Name}`}>
										<small>{u?.uniqueId}</small>
									</option>
								))}
							</datalist>
						</FormGroup>

						<FormGroup id='status' label='Status' className='col-md-12'>
							<Select
								placeholder='Please select...'
								onChange={formik.handleChange}
								ariaLabel='Status select'
								value={formik.values.status}>
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
							/>
						</FormGroup>
					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button color='info' onClick={formik.handleSubmit}>
						Save
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
	return null;
};
ParticipantsEditModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default ParticipantsEditModal;
