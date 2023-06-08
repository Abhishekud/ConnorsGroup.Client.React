import React from 'react';
import {PropTypes} from 'prop-types';
import {Map} from 'immutable';
import {HiddenSubmitButton, Select} from '../../forms/components';

export default function SelectStandardElementGroupToMoveToForm({
  saving, model, validationErrors, onSubmit, onFieldChange, standardElementGroupOptions,
}) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset disabled={saving}>
        <Select id="standardElementGroupId" autoFocus value={model.get('standardElementGroupId')}
          onChange={onFieldChange} formValidationErrors={validationErrors}>
          {standardElementGroupOptions.map(
            option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </Select>
        <HiddenSubmitButton />
      </fieldset>
    </form>
  );
}

SelectStandardElementGroupToMoveToForm.propTypes = {
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  standardElementGroupOptions: PropTypes.array.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
};
