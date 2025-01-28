import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root')

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
      onRequestClose={closeModal}
      imageSrc={selectedImage}
    ><img
    style={{ height: '99%'}}
    src={url}
    />
    </Modal>
  </div>
  );
}

export default ModalComponent;