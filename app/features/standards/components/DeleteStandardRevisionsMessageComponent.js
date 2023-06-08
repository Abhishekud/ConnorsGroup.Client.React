import React from 'react';
import {
  ConfirmDeleteModal,
  AlertDeleteFailedModal,
} from './../../shared/components';
import {ValidationSummary, ValidationNote} from '../../forms/components';

export default function DeleteStandardRevisionsMessageComponent({validationErrors, handleCancel, onConfirm, show, deleting}) {
  let message = (
    <ValidationSummary
      dismissable={false}
      message={<span>The selected Standard Revisions could not be deleted for the following reasons:</span>}
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
        Please confirm that you want to delete the selected Standard(s) Revisions. This will not delete the current revisions.
        <br /><br />
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
