import autoBind from 'react-autobind';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import MOSTStepHeaderEditor from './MOSTStepHeaderEditor';
import MOSTStepDetailsEditor from './MOSTStepDetailsEditor';
import MOSTPhasesEditor from './MOSTPhasesEditor';

export default class MOSTStepEditor extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      mostType,
      mostStep,
      timeFormat,
      readOnly,
      disabled,
      stepValidationErrors,
      parametersValidationErrors,
      canMove,
      addScrollNode,
      onMOSTStepFieldChanged,
      onMOSTStepPhaseParameterFieldChanged,
      onMOSTStepPhaseParameterClicked,
      onSave,
      onCancel,
      onDelete,
      onMove,
      onMoveToPosition,
    } = this.props;

    return (
      <div id={`most-step-${mostStep.get('id')}`} className="most-step-editor" ref={addScrollNode}>
        <MOSTStepHeaderEditor
          mostStep={mostStep} readOnly={readOnly} disabled={disabled} validationErrors={stepValidationErrors}
          canMove={canMove}
          onFieldChanged={onMOSTStepFieldChanged} onSave={onSave} onCancel={onCancel}
          onDelete={onDelete} onMove={onMove} onMoveToPosition={onMoveToPosition} />
        <MOSTStepDetailsEditor
          mostType={mostType}
          mostStep={mostStep} timeFormat={timeFormat} disabled={disabled} validationErrors={stepValidationErrors}
          onFieldChanged={onMOSTStepFieldChanged} />
        <MOSTPhasesEditor
          mostType={mostType}
          mostStepNumber={mostStep.get('number')}
          mostPhases={mostStep.get('mostPhases')} disabled={disabled}
          parametersValidationErrors={parametersValidationErrors}
          onMOSTPhaseParameterFieldChanged={onMOSTStepPhaseParameterFieldChanged}
          onMOSTPhaseParameterClicked={onMOSTStepPhaseParameterClicked} />
      </div>
    );
  }
}

MOSTStepEditor.propTypes = {
  mostType: PropTypes.string.isRequired,
  mostStep: PropTypes.instanceOf(Map).isRequired,
  timeFormat: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  stepValidationErrors: PropTypes.instanceOf(Map).isRequired,
  parametersValidationErrors: PropTypes.instanceOf(Map).isRequired,
  canMove: PropTypes.bool.isRequired,
  addScrollNode: PropTypes.func.isRequired,
  onMOSTStepFieldChanged: PropTypes.func.isRequired,
  onMOSTStepPhaseParameterFieldChanged: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onMoveToPosition: PropTypes.func.isRequired,
  onMOSTStepPhaseParameterClicked: PropTypes.func.isRequired,
};
