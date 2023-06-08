import autoBind from 'react-autobind';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {TextInput} from '../../forms/components';
import NonMOSTStepMoveControls from './NonMOSTStepMoveControls';
import NonMOSTStepHeaderEditorActions from './NonMOSTStepHeaderEditorActions';

export default class NonMOSTStepEditorHeader extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleKeyUp(event) {
    if (event.keyCode !== 13) return;

    this.props.onSave();
  }

  render() {
    const {
      nonMOSTStep, readOnly, disabled, validationErrors, canMove, onFieldChanged, onSave, onCancel, onDelete, onMove, onMoveToPosition,
    } = this.props;

    return (
      <div className="header">
        <span className="number">{nonMOSTStep.get('number')}</span>
        <TextInput id="description" formGroupClassName="description" maxLength={256}
          disabled={disabled} autoFocus onKeyUp={disabled ? null : this.handleKeyUp}
          value={nonMOSTStep.get('description')} onChange={onFieldChanged}
          formValidationErrors={validationErrors} />
        <NonMOSTStepHeaderEditorActions
          nonMOSTStepNumber={nonMOSTStep.get('number')} readOnly={readOnly} disabled={disabled}
          onSave={onSave} onCancel={onCancel} />
        <NonMOSTStepMoveControls
          nonMOSTStep={nonMOSTStep}
          disabled={disabled}
          canMove={canMove}
          onDelete={onDelete}
          onMove={onMove}
          onMoveToPosition={onMoveToPosition} />
      </div>
    );
  }
}

NonMOSTStepEditorHeader.propTypes = {
  nonMOSTStep: PropTypes.instanceOf(Map).isRequired,
  readOnly: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  canMove: PropTypes.bool.isRequired,
  onFieldChanged: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onMoveToPosition: PropTypes.func.isRequired,
};
