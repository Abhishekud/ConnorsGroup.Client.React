import numeral from 'numeral';
import {Map} from 'immutable';
import {Button} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';
import {formatTMUs} from '../../shared/services';
import NonMOSTStepMoveControls from './NonMOSTStepMoveControls';

export default function NonMOSTStep({nonMOSTStep, readOnly, disabled, disabledBulkEdit, timeFormat, canMove, addScrollNode, onEdit, onDelete, onMove, onMoveToPosition, onSimoToggle, isSelectedForBulkEdit, onSelectElementStep}) {
  return (
    <div id={`non-most-step-${nonMOSTStep.get('id')}`} className="non-most-step" ref={addScrollNode}>
      {disabledBulkEdit ? null
        : <div className="bulk-edit-checkbox">
          <i className={`fa ${isSelectedForBulkEdit ? 'fa-check-square-o' : 'fa-square-o'}`} onClick={onSelectElementStep} />
        </div>}
      <span className="number">{nonMOSTStep.get('number')}</span>
      <span className="description">
        <span title={nonMOSTStep.get('description')}>{nonMOSTStep.get('description')}</span>
        <Button bsStyle="default" onClick={onEdit} disabled={disabled && !readOnly}>{readOnly ? 'View' : 'Edit'}</Button>
      </span>
      <div className="simo-toggle">
        <span><strong>Simo</strong></span>
        <i className={`internal fa fa-toggle-${nonMOSTStep.get('simultaneous') ? 'on' : 'off'} ${disabled ? 'disabled' : 'clickable'}`} onClick={disabled ? null : onSimoToggle} />
      </div>
      <div className="frequency">
        <span><strong>Frequency</strong></span>
        <span className="value">{numeral(nonMOSTStep.get('frequency')).format('0,0.000')}</span>
      </div>
      <div className="tmus">
        <span><strong>Time</strong></span>
        <span className="value">
          {formatTMUs(nonMOSTStep.get('measuredTimeMeasurementUnits'), timeFormat)}
        </span>
      </div>
      <div className="time">
        <span><strong>Total Time</strong></span>
        <span className="value">
          {formatTMUs(nonMOSTStep.get('adjustedMeasuredTimeMeasurementUnits'), timeFormat)}
        </span>
      </div>
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

NonMOSTStep.propTypes = {
  nonMOSTStep: PropTypes.instanceOf(Map).isRequired,
  readOnly: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  disabledBulkEdit: PropTypes.bool,
  timeFormat: PropTypes.string.isRequired,
  canMove: PropTypes.bool.isRequired,
  addScrollNode: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onMoveToPosition: PropTypes.func.isRequired,
  onSimoToggle: PropTypes.func.isRequired,
  isSelectedForBulkEdit: PropTypes.bool.isRequired,
  onSelectElementStep: PropTypes.func.isRequired,
};
