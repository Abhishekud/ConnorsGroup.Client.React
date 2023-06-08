import React from 'react';
import {Map, List} from 'immutable';
import {PropTypes} from 'prop-types';
import {Checkbox} from 'react-bootstrap';
import {Switch} from '@progress/kendo-react-inputs';
import {Select, SelectDropdownWithFilter, TextInput} from '../../../forms/components';

export default function LaborStandardsListBulkEditForm({
  model, saving, onCheckboxChange, onFieldChange, onSwitchChange, onSubmit, laborPeriods, laborDrivers, validationErrors, tasks, isWfd, disabled,
}) {
  return (
    <form onSubmit={onSubmit} id="kronos-labor-standard-bulk-edit-form">
      <fieldset disabled={disabled || saving}>
        <Checkbox id="updateLaborDriver" checked={model.get('updateLaborDriver')} onChange={onCheckboxChange}>
          Update Labor Driver
        </Checkbox>
        <Select id="laborDriver" onChange={onFieldChange} value={model.get('laborDriver')} options={laborDrivers.toJS()} disabled={!model.get('updateLaborDriver')} formValidationErrors={validationErrors} />
        <Checkbox id="updateLaborPeriod" checked={model.get('updateLaborPeriod')} onChange={onCheckboxChange}>
          Update Labor Period
        </Checkbox>
        <Select id="laborPeriod" onChange={onFieldChange} value={model.get('laborPeriod')} options={laborPeriods.toJS()} disabled={!model.get('updateLaborPeriod')} formValidationErrors={validationErrors} />
        <Checkbox id="updateGenericDepartment" checked={model.get('updateGenericDepartment')} onChange={onCheckboxChange}>
          Update Generic Department
        </Checkbox>
        <TextInput id="genericDepartment" onChange={onFieldChange} value={model.get('genericDepartment')} disabled={!model.get('updateGenericDepartment')} formValidationErrors={validationErrors} />
        <Checkbox id="updateTask" checked={model.get('updateTask')} onChange={onCheckboxChange}>
          Update Task
        </Checkbox>
        <SelectDropdownWithFilter id="task" onChange={onFieldChange} value={model.get('task')} options={tasks.toJS()} disabled={!model.get('updateTask')} formValidationErrors={validationErrors} scrollable />
        <Checkbox id="updateCombinedDistribution" checked={model.get('updateCombinedDistribution')} onChange={onCheckboxChange}>
          Update Combined Distribution
        </Checkbox>
        <Switch id="combinedDistribution"
          onChange={onSwitchChange} value={model.get('combinedDistribution')}
          disabled={!model.get('updateCombinedDistribution')} formValidationErrors={validationErrors}
          onLabel={'Yes'} offLabel={'No'} width={200} />
        {isWfd && <div className="wfd-warning">WFD Integrations do not currently support Combined Distribution, however the value will be stored.</div>}
      </fieldset>
    </form>
  );
}

LaborStandardsListBulkEditForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
  saving: PropTypes.bool.isRequired,
  laborPeriods: PropTypes.instanceOf(List).isRequired,
  laborDrivers: PropTypes.instanceOf(List).isRequired,
  tasks: PropTypes.instanceOf(List).isRequired,

  onCheckboxChange: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
