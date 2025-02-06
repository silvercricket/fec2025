import React from 'react';
import Modal from './PhotoModal.jsx';
import PropTypes from 'prop-types';

const ModalComponent = ({url, handleSize}) => {
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const selectedImage = url;
  function closeModal() {
    handleSize();
    setIsOpen(false);
  }

  return (
  <div data-testid='photomodule-view' >
    <Modal
      isOpen={modalIsOpen}
      onClose={closeModal}
      imageSrc={selectedImage}
    ><img
    style={{
      maxWidth: '100%',
      maxHeight: '80vh',
      objectFit: 'contain',
  }}
    src={url}
    />
    </Modal>
  </div>
  );
}

ModalComponent.propTypes = {
  url:PropTypes.string.isRequired,
  handleSize:PropTypes.func.isRequired,
};

export default ModalComponent;