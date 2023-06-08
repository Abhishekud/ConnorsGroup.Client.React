import {Button} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function SaveButton({loading, saving, onClick, disabled}) {
  let saveButtonText;
  if (loading) saveButtonText = 'Loading...';
  else if (saving) saveButtonText = 'Saving...';
  else saveButtonText = 'Save';

  return <Button bsStyle="primary" disabled={disabled || loading || saving} onClick={onClick}>{saveButtonText}</Button>;
}

SaveButton.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  disabled: PropTypes.bool,
};
