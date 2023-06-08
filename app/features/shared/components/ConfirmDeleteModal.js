import ConfirmModal from './ConfirmModal';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function ConfirmDeleteModal({
  show, message, onCancel, onConfirm, deleting,
}) {
  return (
    <ConfirmModal
      className="confirm-delete"
      show={show}
      message={message}
      messageStyle="danger"
      confirmButtonStyle="danger"
      onCancel={onCancel}
      onConfirm={onConfirm}
      processing={deleting}
      processingButtonText="Deleting..." />
  );
}

ConfirmDeleteModal.propTypes = {
  message: PropTypes.element.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  deleting: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
};
