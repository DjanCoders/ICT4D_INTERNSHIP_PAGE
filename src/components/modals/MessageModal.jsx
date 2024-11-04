import React from "react";
import "./MessageModal.scss"; 

const MessageModal = ({ message, onClose, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Notification</h2>
        <p>{message}</p>
        <button  className="msg-modal-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MessageModal;
