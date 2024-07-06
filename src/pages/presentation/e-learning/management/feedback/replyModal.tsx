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

interface IReplyModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}
const ReplyModal: FC<IReplyModalProps> = ({ id, isOpen, setIsOpen }) => {
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
					<ModalTitle id={id}>{'Feedback Info'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
					
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
ReplyModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default ReplyModal;
