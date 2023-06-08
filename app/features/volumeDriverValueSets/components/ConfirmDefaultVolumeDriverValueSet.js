import ConfirmModal from '../../shared/components/ConfirmModal';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function ConfirmDefaultVolumeDriverValueSet({
  show, message, onCancel, onConfirm, saving,
}) {
  return (
    <ConfirmModal
      className="confirm-default"
      show={show}
      message={message}
      messageStyle="warning"
      onCancel={onCancel}
      onConfirm={onConfirm}
      processing={saving}
      processingButtonText="Saving..." />
  );
}

ConfirmDefaultVolumeDriverValueSet.propTypes = {
  message: PropTypes.element.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
};
