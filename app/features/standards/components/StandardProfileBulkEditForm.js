import {Map} from 'immutable';
import React from 'react';
import {PropTypes} from 'prop-types';
import {Select, TextInput, ToggleSwitch} from '../../forms/components';
import {Button, Checkbox} from 'react-bootstrap';

export default function StandardProfileBulkEditForm({
  model, saving, onEditFormula, onFieldChange, onCheckboxChange, validationErrors, unitsOfMeasure, onDelete, selectedItems, onSubmit, hasBetaAccess,
}) {
  const addOn = (<i className={`fa fa-superscript ${saving || !model.get('updateFrequencyFormula') ? 'disabled' : ''}`} onClick={onEditFormula} disabled={saving || !model.get('updateFrequencyFormula')} />);
  const internalLabel = <Checkbox
    id="updateInternal" disabled={saving}
    checked={model.get('updateInternal')} onChange={onCheckboxChange}><strong>Update Internal</strong></Checkbox>;
  const machineLabel = <Checkbox
    id="updateMachineAllowance" disabled={saving}
    checked={model.get('updateMachineAllowance')} onChange={onCheckboxChange}><strong>Update Incentive Opportunity Allowance</strong></Checkbox>;
  return (
    <form onSubmit={onSubmit}>
      <fieldset disabled={saving}>
        <Checkbox
          id="updateFrequencyFormula" disabled={saving}
          checked={model.get('updateFrequencyFormula')} onChange={onCheckboxChange}><strong>Update Frequency Formula</strong></Checkbox>
        <TextInput
          id="frequencyFormula" formGroupClassName="frequency-formula" maxLength={2048}
          disabled={saving || !model.get('updateFrequencyFormula')} addOns={addOn}
          value={model.get('frequencyFormula')} onChange={onFieldChange}
          formValidationErrors={validationErrors} />
        <Checkbox
          id="updateUnitOfMeasureId" disabled={saving}
          checked={model.get('updateUnitOfMeasureId')} onChange={onCheckboxChange}><strong>Update Unit Of Measure</strong></Checkbox>
        <Select
          id="unitOfMeasureId" formGroupClassName="unit-of-measure"
          disabled={saving || !model.get('updateUnitOfMeasureId')}
          value={model.get('unitOfMeasureId')} onChange={onFieldChange}
          formValidationErrors={validationErrors}
          options={unitsOfMeasure} />
        <ToggleSwitch id="internal" disabled={saving || !model.get('updateInternal')} label={internalLabel} checked={model.get('internal')} onChange={onFieldChange} />
        {hasBetaAccess && <ToggleSwitch id="machineAllowance" disabled={saving || !model.get('updateMachineAllowance')} label={machineLabel} checked={model.get('machineAllowance')} onChange={onFieldChange} />}
        <div className="toggle-switch  form-group">
          <label className="control-label">Delete Selections</label>
          <Button bsStyle="default" className="delete" bsSize="small" disabled={saving || selectedItems.size === 0} onClick={onDelete}>
            <i className="fa fa-trash-o" title="Delete" />
          </Button>
        </div>
      </fieldset>
    </form>
  );
}

StandardProfileBulkEditForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
  saving: PropTypes.bool.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  unitsOfMeasure: PropTypes.array.isRequired,
  onEditFormula: PropTypes.func.isRequired,
  selectedItems: PropTypes.instanceOf(Map).isRequired,
};
