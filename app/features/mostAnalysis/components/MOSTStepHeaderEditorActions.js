import React from 'react';
import {PropTypes} from 'prop-types';
import {Button} from 'react-bootstrap';
import {calculateTabIndex} from '../services';

export default function MOSTStepHeaderEditorActions({mostStepNumber, readOnly, disabled, onSave, onCancel}) {
  if (readOnly) {
    return (
      <div className="header-actions">
        <Button bsStyle="default" onClick={onCancel}
          tabIndex={calculateTabIndex(mostStepNumber, 3)}>Close</Button>
      </div>
    );
  }

  return (
    <div className="header-actions">
      <Button bsStyle="primary" disabled={disabled} onClick={onSave}
        tabIndex={calculateTabIndex(mostStepNumber, 2)}>Save</Button>
      <Button bsStyle="default" disabled={disabled} onClick={onCancel}
        tabIndex={calculateTabIndex(mostStepNumber, 3)}>Cancel</Button>
    </div>
  );
}

MOSTStepHeaderEditorActions.propTypes = {
  mostStepNumber: PropTypes.number.isRequired,
  readOnly: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
