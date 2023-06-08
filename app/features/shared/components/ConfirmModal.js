import CancelButton from './CancelButton';
import {Alert, Button, Modal} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function ConfirmModal({
  show, message, processingMessage, messageStyle, confirmButtonStyle,
  onCancel, onConfirm,
  processing, buttonText, processingButtonText,
  className,
}) {
  return (
    <Modal show={show} backdrop="static" className={className} animation={false}>
      <Modal.Body>
        <Alert bsStyle={messageStyle || 'warning'}>
          {message}
        </Alert>
      </Modal.Body>
      {processing && processingMessage && <div className="modal-processing">
        <i className="fa fa-spinner fa-spin" title="Processing" />&nbsp;{processingMessage}
      </div>}
      <Modal.Footer>
        <CancelButton disabled={processing} onClick={onCancel} />
        <Button bsStyle={confirmButtonStyle || 'primary'} disabled={processing} autoFocus
          onClick={onConfirm}>{processing ? processingButtonText || 'Processing...' : buttonText || 'Confirm'}</Button>
      </Modal.Footer>
    </Modal>
  );
}

ConfirmModal.propTypes = {
  confirmButtonStyle: PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger']),
  message: PropTypes.element.isRequired,
  messageStyle: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  processing: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  buttonText: PropTypes.string,
  processingButtonText: PropTypes.string,
  className: PropTypes.string,
  processingMessage: PropTypes.string,
};
