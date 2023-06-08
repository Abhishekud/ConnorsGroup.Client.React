import React from 'react';
import {Checkbox} from 'react-bootstrap';
//import {DropDown} from '@progress/kendo-react-dropdowns';
import {SelectWithAutoComplete} from '../../../forms/components';


export default function LaborStandardsBulkEditForm({model, attributes, validationErrors, onSubmit, onCheckboxChange, onFieldChange}) {
  return (
    <form id="reflexis-labor-standard-bulk-edit-form" onSubmit={onSubmit}>
      <fieldset>
        <Checkbox id="updateAttribute" checked={model.get('updateAttribute')} onChange={onCheckboxChange}>
          Assign Reflexis Attribute
        </Checkbox>
        <SelectWithAutoComplete
          id="attribute"
          onChange={onFieldChange}
          value={model.get('attribute')}
          options={attributes}
          disabled={!model.get('updateAttribute')}
          formValidationErrors={validationErrors} />
      </fieldset>
    </form>
  );
}
