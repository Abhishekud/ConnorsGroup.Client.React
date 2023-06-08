import React from 'react';
import {PropTypes} from 'prop-types';
import {Button} from 'react-bootstrap';

export default function NonMOSTStepHeaderEditorActions({readOnly, disabled, onSave, onCancel}) {
  if (readOnly) {
    return (
      <div className="header-actions">
        <Button bsStyle="default" onClick={onCancel}>Close</Button>
      </div>
    );
  }

  return (
    <div className="header-actions">
      <Button bsStyle="primary" disabled={disabled} onClick={onSave}>Save</Button>
      <Button bsStyle="default" disabled={disabled} onClick={onCancel}>Cancel</Button>
    </div>
  );
}

NonMOSTStepHeaderEditorActions.propTypes = {
  readOnly: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
