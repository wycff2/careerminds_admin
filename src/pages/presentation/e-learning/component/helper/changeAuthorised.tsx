import React, { FC } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../../../components/bootstrap/Modal';
import Button from '../../../../../components/bootstrap/Button';

interface ChangeAuthorisedProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const ChangeAuthorised: FC<ChangeAuthorisedProps> = ({ isOpen, setIsOpen }) => {
	return (
		<Modal
			isOpen={isOpen}
			id='example-modal'
			isAnimation={false}
			isCentered
			setIsOpen={setIsOpen}
			size='md'
			titleId='example-title'>
			<ModalBody className='p-5'>
				<h5 className='text-center'>
					For that moment, you don't have access to any Change or Update!
				</h5>
			</ModalBody>
			<ModalFooter>
				<Button className='d-block mx-auto' color='dark' onClick={() => setIsOpen(false)}>
					Close
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default ChangeAuthorised;
