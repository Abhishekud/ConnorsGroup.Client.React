import {Map, List} from 'immutable';
import React from 'react';
import {PropTypes} from 'prop-types';
import {TextInput, ToggleSwitch} from '../../forms/components';
import {Button, Checkbox} from 'react-bootstrap';

export default function StandardProfileBulkEditForm({
  model, saving, onFieldChange, onCheckboxChange, validationErrors, onDelete, selectedSteps, onSubmit,
}) {
  const simoLabel = <Checkbox
    id="updateSimo" disabled={saving}
    checked={model.get('updateSimo')} onChange={onCheckboxChange}><strong>Update Simo</strong></Checkbox>;
  return (
    <form onSubmit={onSubmit}>
      <fieldset disabled={saving}>
        <Checkbox
          id="updateFrequency" disabled={saving}
          checked={model.get('updateFrequency')} onChange={onCheckboxChange}><strong>Update Frequency</strong></Checkbox>
        <TextInput
          id="frequency" formGroupClassName="frequency" maxLength={20}
          disabled={saving || !model.get('updateFrequency')}
          value={model.get('frequency')} onChange={onFieldChange}
          formValidationErrors={validationErrors} />
        <ToggleSwitch id="simo" disabled={saving || !model.get('updateSimo')} label={simoLabel} checked={model.get('simo')} onChange={onFieldChange} />
        <div className="toggle-switch  form-group">
          <label className="control-label">Delete Selections</label>
          <Button bsStyle="default" className="delete" bsSize="small" disabled={saving || selectedSteps.size === 0} onClick={onDelete}>
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
  selectedSteps: PropTypes.instanceOf(List).isRequired,
};
