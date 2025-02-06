import React from "react";
import PropTypes from 'prop-types';

const Modal = ({ isOpen, children }) => {
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
                overflow: "hidden"
            }}
        >

            <div
                id='mainDisplayExpandedContainer'
                style={{
                    position: "relative",
                    background: "grey",
                    height: 800,
                    width: 800,
                    margin: "auto",

                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                    overflow: "hidden"
                }}
            >
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired
};

export default Modal;