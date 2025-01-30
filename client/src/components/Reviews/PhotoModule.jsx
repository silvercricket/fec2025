import React from 'react';
import Modal from './PhotoModal.jsx';

const ModalComponent = ({url, handleSize}) => {
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const [selectedImage, setSelectedImage] = React.useState(url);
  function closeModal() {
    handleSize();
    setIsOpen(false);
  }

  return (
  <div >
    <Modal
      isOpen={modalIsOpen}
      onClose={closeModal}
      imageSrc={selectedImage}
    ><img
    style={{
      maxWidth: '100%',
      maxHeight: '80vh',
      objectFit: 'contain',  // Ensures the image maintains its aspect ratio
  }}
    src={url}
    />
    </Modal>
  </div>
  );
}

export default ModalComponent;