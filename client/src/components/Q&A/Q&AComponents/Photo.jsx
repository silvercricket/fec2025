/*global */
/*eslint no-undef: "error"*/
import React from 'react';
import Modal from '../../Reviews/PhotoModal.jsx';
import PropTypes from 'prop-types';

const Photo = ({photo}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
    <img onClick={handleOpen} style={{height: '50px', width: 'auto'}} src={photo} alt="Preview Image"></img>
    <Modal isOpen={open} onClose={handleClose}>
      <img style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain'}}src={photo}/>
    </Modal>
    </>
  )
}

Photo.PropTypes = {
  photo: PropTypes.string.isRequired
}

export default Photo;