import React, { FC } from 'react';
import PropTypes from 'prop-types';
import Modal, {
	ModalBody,
	ModalHeader,
	ModalTitle,
} from '../../../../../components/bootstrap/Modal';

interface IImageViewerProps {
	image: any;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}

const ImageViewer: FC<IImageViewerProps> = ({ image, isOpen, setIsOpen }) => {
	return (
		<Modal setIsOpen={setIsOpen} size='lg' isOpen={isOpen} isCentered isAnimation={false}>
			<ModalHeader setIsOpen={setIsOpen}>
				<ModalTitle id='preview'>Preview</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<img
					src={`https://e-learning-backend.cradle.services/${image}`}
					alt='eneme'
					className='rounded-2'
					style={{ width: '100%' }}
				/>
			</ModalBody>
		</Modal>
	);
};
ImageViewer.propTypes = {
	image: PropTypes.any.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default ImageViewer;
