import {Map} from 'immutable';
import {FormControl} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';
import {
  sequenceModelTypes,
  toolTypes,
} from '../constants';
import {calculateTabIndex} from '../services';

const TOOL_TYPE_OPTIONS = toolTypes.ALL.map(
  tt => ({value: tt, label: toolTypes.displayName(tt)})).valueSeq().toArray();

export default function MOSTStepDetailsToolTypeEditor({mostStep, disabled, onFieldChanged}) {
  if (mostStep.get('sequenceModelType') !== sequenceModelTypes.TOOL_USE) return null;

  return (
    <FormControl componentClass="select" className="tool-type" disabled={disabled}
      name="toolType" onChange={onFieldChanged} value={mostStep.get('toolType')}
      tabIndex={calculateTabIndex(mostStep.get('number'), 5)}>
      {TOOL_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </FormControl>
  );
}

MOSTStepDetailsToolTypeEditor.propTypes = {
  mostStep: PropTypes.instanceOf(Map).isRequired,
  disabled: PropTypes.bool.isRequired,
  onFieldChanged: PropTypes.func.isRequired,
};
