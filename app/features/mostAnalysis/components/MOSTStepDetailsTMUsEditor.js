import {Map} from 'immutable';
import {NumericInput} from '../../forms/components';
import React from 'react';
import {PropTypes} from 'prop-types';
import {sequenceModelTypes} from '../constants';
import {formatTMUs} from '../../shared/services';
import {timeFormats} from '../../shared/constants';
import {calculateTabIndex} from '../services';

export default function MOSTStepDetailsTMUsEditor({mostStep, disabled, validationErrors, onFieldChanged}) {
  if (mostStep.get('sequenceModelType') === sequenceModelTypes.PROCESS_TIME) {
    return (
      <NumericInput id="measuredTimeMeasurementUnits" label="TMUs" formGroupClassName="tmus"
        disabled={disabled}
        min="0" value={mostStep.get('measuredTimeMeasurementUnits')} onChange={onFieldChanged}
        formValidationErrors={validationErrors}
        tabIndex={calculateTabIndex(mostStep.get('number'), 9)} />
    );
  }

  return (
    <div className="tmus">
      <span><strong>TMUs</strong></span>
      <span className="value">
        {formatTMUs(mostStep.get('measuredTimeMeasurementUnits'), timeFormats.TMUs)}
      </span>
    </div>
  );
}

MOSTStepDetailsTMUsEditor.propTypes = {
  mostStep: PropTypes.instanceOf(Map).isRequired,
  disabled: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  onFieldChanged: PropTypes.func.isRequired,
};
