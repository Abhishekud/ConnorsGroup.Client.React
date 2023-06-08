import {Map} from 'immutable';
import React from 'react';
import {PropTypes} from 'prop-types';
import {TextInput, NumericInput, Select, HiddenSubmitButton} from '../../forms/components';

export default function ElementsListFiltersForm({
  model, applying, onFieldChange, onSubmit, unitsOfMeasure, activities, statuses, elementTypes,
}) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset disabled={applying}>
        <NumericInput id="id" label="Element ID" value={model.get('id')} onChange={onFieldChange} />
        <Select id="elementType" label="Type"
          value={model.get('elementType')} options={elementTypes}
          onChange={onFieldChange} />
        <TextInput id="name" label="Name" value={model.get('name')} autoFocus onChange={onFieldChange} />
        <Select id="elementUnitOfMeasureId" label="Unit of Measure"
          value={model.get('elementUnitOfMeasureId')} options={unitsOfMeasure}
          onChange={onFieldChange} />
        <Select id="elementActivityId" label="Activity"
          value={model.get('elementActivityId')} options={activities}
          onChange={onFieldChange} />
        <Select id="status" label="Status"
          value={model.get('status')} options={statuses}
          onChange={onFieldChange} />
        <div className="tmu-container">
          <div className="tmu-label">TMUs:</div>
          <NumericInput id="tmuMin" label="Minimum" value={model.get('tmuMin')} onChange={onFieldChange} />
          <NumericInput id="tmuMax" label="Maximum" value={model.get('tmuMax')} onChange={onFieldChange} />
        </div>
        <HiddenSubmitButton />
      </fieldset>
    </form>
  );
}

ElementsListFiltersForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
  applying: PropTypes.bool.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  unitsOfMeasure: PropTypes.array.isRequired,
  activities: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
  elementTypes: PropTypes.array.isRequired,
};
