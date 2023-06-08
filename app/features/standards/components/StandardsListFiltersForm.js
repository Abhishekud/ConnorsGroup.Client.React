import {Map} from 'immutable';
import React from 'react';
import {PropTypes} from 'prop-types';
import {Select, NumericInput, TextInput, HiddenSubmitButton} from '../../forms/components';

export default function StandardsListFiltersForm({
  model, applying,
  onFieldChange, onSubmit, departmentName, filingFields, filingFieldValues, onFilingFieldChange,
  allowances, applicators, classifications, attributes, laborCategories, departments, statuses, jobClasses,
}) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset disabled={applying}>
        <NumericInput id="id" label="Standard ID" value={model.get('id') || ''} onChange={onFieldChange} />
        <TextInput id="name" label="Name" onChange={onFieldChange} value={model.get('name') || ''} autoFocus />
        <Select id="departmentId" label={departmentName} value={model.get('departmentId')}
          options={departments} onChange={onFieldChange} />
        <Select id="jobClassId" label="Job Class" value={model.get('jobClassId')}
          options={jobClasses} onChange={onFieldChange} />
        <Select id="laborCategoryId" label="Labor Category" value={model.get('laborCategoryId')}
          options={laborCategories} onChange={onFieldChange} />
        <Select id="classificationId" label="Classification" value={model.get('classificationId')}
          options={classifications} onChange={onFieldChange} />
        <Select id="allowanceId" label="Allowance" value={model.get('allowanceId')}
          options={allowances} onChange={onFieldChange} />
        <Select id="attributeId" label="Attribute" value={model.get('attributeId')}
          options={attributes} onChange={onFieldChange} />
        <Select id="applicatorId" label="Applicator" value={model.get('applicatorId')}
          options={applicators} onChange={onFieldChange} />
        <Select id="fixed" label="Fixed/Variable" value={model.get('fixed')} onChange={onFieldChange}
          options={[{value: '', label: ''}, {value: 'true', label: 'Fixed'}, {value: 'false', label: 'Variable'}]} />
        <Select id="status" label="Status" value={model.get('status')}
          options={statuses} onChange={onFieldChange} />
        {filingFields.valueSeq().map(x => {
          const item = filingFieldValues.find(y => y.get('standardFilingFieldId') === x.get('id'));
          const value = item ? item.get('standardFilingFieldOptionId') : null;
          return (
            <Select key={x.get('id')} name={`filingField-${x.get('id')}`} id={x.get('id').toString()} label={x.get('name')} disabled={applying} onChange={onFilingFieldChange}
              value={value} options={x.get('options')} />
          );
        })}
        <HiddenSubmitButton />
      </fieldset>
    </form>
  );
}

StandardsListFiltersForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
  applying: PropTypes.bool.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  allowances: PropTypes.array.isRequired,
  applicators: PropTypes.array.isRequired,
  classifications: PropTypes.array.isRequired,
  attributes: PropTypes.array.isRequired,
  departments: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
  laborCategories: PropTypes.array.isRequired,
  onFilingFieldChange: PropTypes.func.isRequired,
  jobClasses: PropTypes.array,
};
