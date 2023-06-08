import autoBind from 'react-autobind';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import NonMOSTStepHeaderEditor from './NonMOSTStepHeaderEditor';
import NonMOSTStepDetailsEditor from './NonMOSTStepDetailsEditor';

export default class NonMOSTStepEditor extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      nonMOSTStep,
      timeFormat,
      readOnly,
      disabled,
      stepValidationErrors,
      canMove,
      addScrollNode,
      onNonMOSTStepFieldChanged,
      onSave,
      onCancel,
      onDelete,
      onMove,
      onMoveToPosition,
    } = this.props;

    return (
      <div id={`non-most-step-${nonMOSTStep.get('id')}`} className="non-most-step-editor" ref={addScrollNode}>
        <NonMOSTStepHeaderEditor
          nonMOSTStep={nonMOSTStep} readOnly={readOnly} disabled={disabled} validationErrors={stepValidationErrors}
          canMove={canMove}
          onFieldChanged={onNonMOSTStepFieldChanged} onSave={onSave} onCancel={onCancel}
          onDelete={onDelete} onMove={onMove} onMoveToPosition={onMoveToPosition} />
        <NonMOSTStepDetailsEditor
          nonMOSTStep={nonMOSTStep} timeFormat={timeFormat} disabled={disabled} validationErrors={stepValidationErrors}
          onFieldChanged={onNonMOSTStepFieldChanged} />
      </div>
    );
  }
}

NonMOSTStepEditor.propTypes = {
  nonMOSTStep: PropTypes.instanceOf(Map).isRequired,
  timeFormat: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  stepValidationErrors: PropTypes.instanceOf(Map).isRequired,
  addScrollNode: PropTypes.func.isRequired,
  canMove: PropTypes.bool.isRequired,
  onNonMOSTStepFieldChanged: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onMoveToPosition: PropTypes.func.isRequired,
};
