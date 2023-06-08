import {Map} from 'immutable';
import {FormControl} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';
import {
  sequenceModelTypes,
  equipmentTypes,
} from '../constants';
import {calculateTabIndex} from '../services';

const EQUIPMENT_TYPE_OPTIONS = equipmentTypes.ALL.map(
  et => ({value: et, label: et})).valueSeq().toArray();

export default function MOSTStepDetailsEquipmentTypeEditor({mostStep, disabled, onFieldChanged}) {
  if (mostStep.get('sequenceModelType') !== sequenceModelTypes.EQUIPMENT_USE) return null;

  return (
    <FormControl componentClass="select" className="equipment-type" disabled={disabled}
      name="equipmentType" onChange={onFieldChanged} value={mostStep.get('equipmentType')}
      tabIndex={calculateTabIndex(mostStep.get('number'), 6)}>
      {EQUIPMENT_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </FormControl>
  );
}

MOSTStepDetailsEquipmentTypeEditor.propTypes = {
  mostStep: PropTypes.instanceOf(Map).isRequired,
  disabled: PropTypes.bool.isRequired,
  onFieldChanged: PropTypes.func.isRequired,
};
