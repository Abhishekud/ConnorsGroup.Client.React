import AlertModal from './AlertModal';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function AlertDeleteFailedModal({
  show, message, onOk,
}) {
  return (
    <AlertModal
      className="alert-delete-failed"
      okButtonStyle="default"
      message={message}
      onOk={onOk}
      show={show} />
  );
}

AlertDeleteFailedModal.propTypes = {
  message: PropTypes.element.isRequired,
  onOk: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
