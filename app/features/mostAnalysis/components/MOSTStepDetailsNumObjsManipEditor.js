import {Map} from 'immutable';
import {TextInput} from '../../forms/components';
import React from 'react';
import {PropTypes} from 'prop-types';
import {sequenceModelTypes} from '../constants';
import {calculateTabIndex} from '../services';

export default function MOSTStepDetailsNumObjsManipEditor({mostStep, disabled, validationErrors, onFieldChanged}) {
  if (mostStep.get('sequenceModelType') !== sequenceModelTypes.EQUIPMENT_USE &&
    mostStep.get('sequenceModelType') !== sequenceModelTypes.TOOL_USE) return null;

  return (
    <TextInput id="numberOfObjectsManipulated" label={<span># of Objects<br />Manipulated</span>}
      formGroupClassName="num-objs-manip"
      disabled={disabled}
      value={mostStep.get('numberOfObjectsManipulated')} onChange={onFieldChanged}
      formValidationErrors={validationErrors}
      tabIndex={calculateTabIndex(mostStep.get('number'), 7)} />
  );
}

MOSTStepDetailsNumObjsManipEditor.propTypes = {
  mostStep: PropTypes.instanceOf(Map).isRequired,
  disabled: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  onFieldChanged: PropTypes.func.isRequired,
};
