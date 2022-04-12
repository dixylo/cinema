import React from 'react';
import './Modal.css';

const Modal = ({ visibility, header, body, onOk, onCancel }) => (
  <div className="modal" style={{ display: visibility ? 'block' : 'none' }}>
    <div className="modal-content">
      <div className="modal-header">
        <span
          className="close"
          style={{ display: onCancel ? 'inline-block' : 'none' }}
          onClick={() => onCancel && onCancel()}
        >
          &times;
        </span>
        <h3>{header}</h3>
      </div>
      <hr />
      <div className="modal-body">
        <p>{body}</p>
      </div>
      <hr />
      <div className="modal-footer">
        <button
          className='modal-button'
          style={{ display: onCancel ? 'inline-block' : 'none' }}
          onClick={() => onCancel && onCancel()}
        >
          Cancel
        </button>
        <button className='modal-button' onClick={() => onOk && onOk()}>Ok</button>
      </div>
    </div>
  </div>
);

export default Modal;
