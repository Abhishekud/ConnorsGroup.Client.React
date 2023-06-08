import React from 'react';
import {Map, List} from 'immutable';
import {PropTypes} from 'prop-types';
import {Switch} from '@progress/kendo-react-inputs';
import {Select, SelectDropdownWithFilter, TextInput} from '../../../forms/components';

export default function EditLaborStandardForm({
  model, saving, onFieldChange, onSwitchChange, onSubmit, laborPeriods, laborDrivers, validationErrors, tasks, isWfd, disabled,
}) {
  return (
    <form onSubmit={onSubmit} id="kronos-labor-standard-edit-form">
      <fieldset disabled={disabled || saving}>
        <Select id="laborDriverId" label="Labor Driver" onChange={onFieldChange} value={model.get('laborDriverId')} options={laborDrivers.toJS()} formValidationErrors={validationErrors} />
        <Select id="laborPeriodId" label="Labor Period" onChange={onFieldChange} value={model.get('laborPeriodId')} options={laborPeriods.toJS()} formValidationErrors={validationErrors} />
        <TextInput id="genericDepartment" label="Generic Department" onChange={onFieldChange} value={model.get('genericDepartment')} formValidationErrors={validationErrors} />
        <SelectDropdownWithFilter id="taskId" label="Task" onChange={onFieldChange} value={model.get('taskId')} options={tasks.toJS()} formValidationErrors={validationErrors} scrollable />
        <label htmlFor="combinedDistribution" className="control-label">Combined Distribution</label>
        <Switch id="combinedDistribution"
          onChange={onSwitchChange} value={model.get('combinedDistribution')}
          checked={model.get('combinedDistribution')}
          formValidationErrors={validationErrors}
          onLabel={'Yes'} offLabel={'No'} width={200} />
        {isWfd && <div className="wfd-warning">WFD Integrations do not currently support Combined Distribution, however the value will be stored.</div>}
      </fieldset>
    </form>
  );
}

EditLaborStandardForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
  saving: PropTypes.bool.isRequired,
  laborPeriods: PropTypes.instanceOf(List).isRequired,
  laborDrivers: PropTypes.instanceOf(List).isRequired,
  tasks: PropTypes.instanceOf(List).isRequired,

  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
