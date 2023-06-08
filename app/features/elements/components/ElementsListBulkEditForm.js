import {Map} from 'immutable';
import React from 'react';
import {PropTypes} from 'prop-types';
import {Select} from '../../forms/components';
import {Checkbox, Button} from 'react-bootstrap';
import {ARCHIVE} from '../../standards/constants/standardStatuses';
import ElementStatusSettings from './ElementStatusSettings';

export default function ElementsListBulkEditForm({
  model, saving, onFieldChange, onCheckboxChange, validationErrors, statuses, activities, unitsOfMeasure, highestStatus, onSubmit, onDelete, needsManageProduction,
}) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset disabled={needsManageProduction || saving}>
        {highestStatus === ARCHIVE
          ? <div className="archive-warning">
            Archived elements cannot be edited. Proposed bulk edits to them will be
            ignored unless the elements status is changing back to Production.
          </div>
          : null}
        {needsManageProduction
          ? <div className="archive-warning">
            You have selected one or more production or archived elements.{' '}
            <strong>Your current permissions prevent the ability to make changes to these standards.</strong>
          </div>
          : null}
        <Checkbox
          id="updateElementUnitOfMeasureId" disabled={saving}
          checked={model.get('updateElementUnitOfMeasureId')} onChange={onCheckboxChange}><strong>Update Unit Of Measure</strong></Checkbox>
        <Select id="elementUnitOfMeasureId" onChange={onFieldChange}
          value={model.get('elementUnitOfMeasureId')} options={unitsOfMeasure}
          disabled={saving || !model.get('updateElementUnitOfMeasureId')}
          formValidationErrors={validationErrors} />

        <Checkbox
          id="updateElementActivityId" disabled={saving}
          checked={model.get('updateElementActivityId')} onChange={onCheckboxChange}><strong>Update Activity</strong></Checkbox>
        <Select id="elementActivityId" onChange={onFieldChange}
          value={model.get('elementActivityId')} options={activities}
          disabled={saving || !model.get('updateElementActivityId')}
          formValidationErrors={validationErrors} />

        <Checkbox
          id="updateStatus" disabled={saving}
          checked={model.get('updateStatus')} onChange={onCheckboxChange}><strong>Update Status</strong></Checkbox>
        <ElementStatusSettings
          editing hideHeader showComment disabled={!model.get('updateStatus')}
          onFieldChange={onFieldChange}
          model={model}
          validationErrors={validationErrors}
          statuses={statuses} />

        <div className="toggle-switch  form-group">
          <label className="control-label">Delete Selections</label>
          <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={onDelete}>
            <i className="fa fa-trash-o" title="Delete" />
          </Button>
        </div>
      </fieldset>
    </form>
  );
}

ElementsListBulkEditForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
  saving: PropTypes.bool.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
};
