import React from 'react';
import {PropTypes} from 'prop-types';
import {Select, ToggleSwitch} from '../../forms/components';

export default function IndustryStandardsListFilter({
  model,
  onFieldChange,
  departments,
  loading,
  label,
}) {
  return (
    <fieldset disabled={loading}>
      <Select
        id="intoDepartmentId"
        label={label}
        onChange={onFieldChange}
        value={model.get('intoDepartmentId')}
        options={departments} />
      <ToggleSwitch
        id="forceUseOfStandardId"
        label="Force use of Standard Id"
        tooltip="Import standards will have the same standard Id. Cases where the standard Id is already used will result in an error."
        checked={model.get('forceUseOfStandardId')}
        onChange={onFieldChange} />
    </fieldset>
  );
}

IndustryStandardsListFilter.propTypes = {
  model: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  departments: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  label: PropTypes.string,
};
