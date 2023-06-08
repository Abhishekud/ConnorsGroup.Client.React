import React from 'react';
import {
  ConfirmDeleteModal,
  AlertDeleteFailedModal,
} from '.';
import {ValidationSummary, ValidationNote} from '../../forms/components';

export default function DeleteValidationMessageComponent({validationErrors, model, handleCancel, onConfirm, show, deleting}) {
  let message = (
    <ValidationSummary
      dismissable={false}
      message={<span><strong>{model.get('name')}</strong> could not be deleted for the following reasons:</span>}
      errors={validationErrors} />);

  if (validationErrors.size === 1) {
    message = (<ValidationNote
      dismissable={false}
      errors={validationErrors} />);
  }

  let jsx = (<AlertDeleteFailedModal
    show={show}
    message={message}
    okButtonStyle="default"
    onOk={handleCancel} />);

  if (validationErrors.size === 0) {
    message = (
      <span>
        Please confirm that you want to delete <strong>{model.get('name')}</strong>.<br />
        <br />
        This action cannot be undone.
      </span>);

    jsx = (<ConfirmDeleteModal
      show={show}
      message={message}
      deleting={deleting}
      onCancel={handleCancel}
      onConfirm={onConfirm} />);
  }

  return jsx;
}
