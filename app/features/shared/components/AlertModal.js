import {Button, Modal} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function AlertModal({
  show, message, okButtonStyle,
  onOk, className,
}) {
  return (
    <Modal show={show} backdrop="static" className={className} animation={false}>
      <Modal.Body>
        {message}
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle={okButtonStyle || 'primary'} onClick={onOk} autoFocus>OK</Button>
      </Modal.Footer>
    </Modal>
  );
}

AlertModal.propTypes = {
  okButtonStyle: PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warning', 'danger']),
  message: PropTypes.element.isRequired,
  onOk: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  className: PropTypes.string,
};
