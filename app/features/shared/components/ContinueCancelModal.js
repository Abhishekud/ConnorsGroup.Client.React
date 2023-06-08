import CancelButton from './CancelButton';
import {Alert, Button, Modal} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function ContinueCancelModal({
  show, message, messageStyle, continueButtonStyle,
  onCancel, onContinue, className,
}) {
  return (
    <Modal show={show} backdrop="static" className={className} animation={false}>
      <Modal.Body>
        <Alert bsStyle={messageStyle || 'warning'}>
          {message}
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <CancelButton onClick={onCancel} />
        <Button bsStyle={continueButtonStyle || 'primary'} autoFocus
          onClick={onContinue}>Continue</Button>
      </Modal.Footer>
    </Modal>
  );
}

ContinueCancelModal.propTypes = {
  continueButtonStyle: PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger']),
  message: PropTypes.element.isRequired,
  messageStyle: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  className: PropTypes.string,
};
