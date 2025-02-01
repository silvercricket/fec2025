import React from "react";
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "white",
                    maxHeight: "90%", // Restrict maximum height to 90% of the screen height
                    maxWidth: "90%",  // Restrict maximum width to 90% of the screen width
                    margin: "auto",
                    padding: "2%",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {/* Ensure the image is responsive */}
                <div style={{ maxWidth: "100%", maxHeight: "80vh", overflow: "hidden" }}>
                    {children}
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired
};

export default Modal;
