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
import { Feedback } from './data';
import USERS from '../../../../../common/data/userDummyData';
import Avatar from '../../../../../components/Avatar';

interface IFeedbackEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}
const FeedbackEditModal: FC<IFeedbackEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	const itemData = id ? Feedback.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};

	const [thumbnail, setThumbnail] = useState<any>(null);
	const thumbInputRef = useRef<HTMLInputElement>(null);

	const formik = useFormik({
		initialValues: {
			thumb: item?.thumb,
			name: item?.name || '',
			status: item?.status || '',
			belongsTo: item?.categoryBelongsTo || '',
			ratingOption: item?.ratingOption || '',
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
				'Feedback has been updated successfully',
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
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='md' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{'New Feedback'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<FormGroup id='name' label='Thumbnail' className='col-md-12'>
							<div className='col-12'>
								<div className='row g-4 align-items-center'>
									<div className='col-lg-auto'>
										<Avatar
											srcSet={
												formik.values.thumb ||
												thumbnail ||
												USERS.JOHN.srcSet
											}
											src={formik.values.thumb || thumbnail || USERS.JOHN.src}
											color={USERS.JOHN.color}
											rounded={3}
										/>
									</div>
									<div className='col-lg'>
										<div className='row g-4'>
											<div className='col-auto'>
												<input
													type='file'
													onChange={handleAddThumbnail}
													ref={thumbInputRef}
													style={{ display: 'none' }}
													accept='image/*'
												/>
												{!thumbnail ? (
													<Button
														color='info'
														isLight
														icon='Add'
														onClick={handleAddThumbnail}>
														Add User Thumbnail
													</Button>
												) : (
													<Button
														color='danger'
														isLight
														icon='Delete'
														onClick={handleDeleteThumbnail}>
														Delete User Thumbnail
													</Button>
												)}
											</div>
											<div className='col-12'>
												<p className='lead text-muted'>
													Avatar helps your teammates get to know you.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</FormGroup>
						<FormGroup id='name' label='Name' className='col-md-12'>
							<Input onChange={formik.handleChange} value={formik.values.name} />
						</FormGroup>
						<FormGroup id='parentCat' label='Select Feedback' className='col-md-12'>
							<Select
								placeholder='Please select...'
								onChange={formik.handleChange}
								ariaLabel='Parent Feedback select'>
								{Feedback.map((Participant, i) => (
									<Option
										key={i}
										value={Participant?.feedbackBelongsTo}
										selected={
											formik.values.belongsTo ===
											Participant?.feedbackBelongsTo
										}>
										{Participant?.feedbackBelongsTo}
									</Option>
								))}
							</Select>
						</FormGroup>
						<FormGroup id='parentCat' label='Ratings' className='col-md-12'>
							<Select
								placeholder='Please select...'
								onChange={formik.handleChange}
								ariaLabel='Parent Feedback select'>
								<option value='1'>1</option>
								<option value='2'>2</option>
								<option value='3'>3</option>
								<option value='4'>4</option>
								<option value='5' selected>
									5
								</option>
							</Select>
						</FormGroup>
						<FormGroup id='description' label='Comment' className='col-md-12'>
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
FeedbackEditModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default FeedbackEditModal;
