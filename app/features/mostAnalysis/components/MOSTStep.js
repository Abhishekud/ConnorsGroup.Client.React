import numeral from 'numeral';
import {Map} from 'immutable';
import {Button} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';
import {formatTMUs} from '../../shared/services';
import {timeFormats} from '../../shared/constants';
import MOSTStepMoveControls from './MOSTStepMoveControls';

export default function MOSTStep({
  mostStep, readOnly, disabled, disabledBulkEdit, timeFormat, canMove, addScrollNode, onEdit, onDelete, onMove, onMoveToPosition, onSimoToggle, isSelectedForBulkEdit, onSelectElementStep,
}) {
  return (
    <div id={`most-step-${mostStep.get('id')}`} className="most-step" ref={addScrollNode}>
      {disabledBulkEdit ? null
        : <div className="bulk-edit-checkbox">
          <i className={`fa ${isSelectedForBulkEdit ? 'fa-check-square-o' : 'fa-square-o'}`} onClick={onSelectElementStep} />
        </div>}
      <span className="number">{mostStep.get('number')}</span>
      <span className="description">
        <span title={mostStep.get('description')}>{mostStep.get('description')}</span>
        <Button bsStyle="default" onClick={onEdit} disabled={disabled && !readOnly}>{readOnly ? 'View' : 'Edit'}</Button>
      </span>
      <span className="sequence-model">{mostStep.get('sequenceModel')}</span>
      <div className="simo-toggle">
        <span><strong>Simo</strong></span>
        <i className={`internal fa fa-toggle-${mostStep.get('simultaneous') ? 'on' : 'off'} ${disabled ? 'disabled' : 'clickable'}`} onClick={disabled ? null : onSimoToggle} />
      </div>
      <div className="frequency">
        <span><strong>Frequency</strong></span>
        <span className="value">{numeral(mostStep.get('frequency')).format('0.000')}</span>
      </div>
      <div className="tmus">
        <span><strong>TMUs</strong></span>
        <span className="value">
          {formatTMUs(mostStep.get('measuredTimeMeasurementUnits'), timeFormats.TMUs)}
        </span>
      </div>
      <div className="time">
        <span><strong>Total Time</strong></span>
        <span className="value">
          {formatTMUs(mostStep.get('adjustedMeasuredTimeMeasurementUnits'), timeFormat)}
        </span>
      </div>
      <MOSTStepMoveControls
        mostStep={mostStep}
        disabled={disabled}
        canMove={canMove}
        onDelete={onDelete}
        onMove={onMove}
        onMoveToPosition={onMoveToPosition} />
    </div>
  );
}

MOSTStep.propTypes = {
  mostStep: PropTypes.instanceOf(Map).isRequired,
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
