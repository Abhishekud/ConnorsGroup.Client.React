import {Map} from 'immutable';
import React from 'react';
import {PropTypes} from 'prop-types';
import moment from 'moment';
import {Select, Date, Input} from '../../forms/components';
import {Checkbox} from 'react-bootstrap';
import {ARCHIVE, PRODUCTION} from '../constants/standardStatuses';
import StandardStatusSettings from './StandardStatusSettings';
import {DeleteButton} from '../../shared/components/buttons';

export default function StandardsListBulkEditForm({
  model, saving, onFieldChange, onCheckboxChange, validationErrors, onFilingFieldCheckboxChange, onSubmit,
  statuses, departmentCount, attributes, jobClasses, laborCategories, classifications, allowances, partFamilyName, partFamilies,
  selectedStatuses, filingFields, onFilingFieldChange, partsEnabled, onDelete, onDeleteRevisions, onEffectiveStartDateFieldChange,
  onEffectiveEndDateFieldChange, canManageProduction, needsManageProduction, activeBulkDeleteBackgroundJob,
}) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset disabled={needsManageProduction || saving}>
        {selectedStatuses.includes(ARCHIVE) || selectedStatuses.includes(PRODUCTION) && canManageProduction
          ? <div className="archive-warning">
            {selectedStatuses.includes(ARCHIVE) ? <>You have selected one or more archived standards. </> : null}
            {selectedStatuses.includes(PRODUCTION) ? <>You have selected one or more production standards. </> : null}
            Modifications to these standards will result in new revisions.
          </div>
          : null}
        {(selectedStatuses.includes(PRODUCTION) || selectedStatuses.includes(ARCHIVE)) && !canManageProduction
          ? <div className="archive-warning">
            {selectedStatuses.includes(ARCHIVE) ? <>You have selected one or more archived standards. </> : null}
            {selectedStatuses.includes(PRODUCTION) ? <>You have selected one or more production standards. </> : null}
            <strong>Your current permissions prevent the ability to make changes to these standards.</strong>
          </div>
          : null}
        <Checkbox
          id="updateName" disabled={saving}
          checked={model.get('updateName')} onChange={onCheckboxChange}><strong>Update Name</strong></Checkbox>
        <Input id="name" type="text" onChange={onFieldChange}
          value={model.get('name')} disabled={saving || !model.get('updateName')}
          formValidationErrors={validationErrors} />
        <Checkbox
          id="updateAttributeId" disabled={saving || departmentCount > 1}
          checked={model.get('updateAttributeId')} onChange={onCheckboxChange}><strong>Update Attribute</strong></Checkbox>
        <Select id="attributeId"
          onChange={onFieldChange} value={model.get('attributeId')} options={attributes}
          disabled={saving || !model.get('updateAttributeId') || departmentCount > 1}
          formValidationErrors={validationErrors} />
        <Checkbox
          id="updateJobClassId" disabled={saving}
          checked={model.get('updateJobClassId')} onChange={onCheckboxChange}><strong>Update Job Class</strong></Checkbox>
        <Select id="jobClassId" onChange={onFieldChange}
          value={model.get('jobClassId')} options={jobClasses}
          disabled={saving || !model.get('updateJobClassId')}
          formValidationErrors={validationErrors} />
        <Checkbox
          id="updateLaborCategoryId" disabled={saving}
          checked={model.get('updateLaborCategoryId')} onChange={onCheckboxChange}><strong>Update Labor Category</strong></Checkbox>
        <Select id="laborCategoryId" onChange={onFieldChange}
          value={model.get('laborCategoryId')} options={laborCategories}
          disabled={saving || !model.get('updateLaborCategoryId')}
          formValidationErrors={validationErrors} />
        <Checkbox
          id="updateClassificationId" disabled={saving}
          checked={model.get('updateClassificationId')} onChange={onCheckboxChange}><strong>Update Classification</strong></Checkbox>
        <Select id="classificationId" onChange={onFieldChange}
          value={model.get('classificationId')} options={classifications}
          disabled={saving || !model.get('updateClassificationId')}
          formValidationErrors={validationErrors} />
        <Checkbox
          id="updateAllowanceId" disabled={saving}
          checked={model.get('updateAllowanceId')} onChange={onCheckboxChange}><strong>Update Allowances</strong></Checkbox>
        <Select id="allowanceId" onChange={onFieldChange} disabled={saving || !model.get('updateAllowanceId')}
          value={model.get('allowanceId')} options={allowances}
          formValidationErrors={validationErrors} />

        {partsEnabled && <Checkbox
          id="updatePartFamilyId" disabled={saving}
          checked={model.get('updatePartFamilyId')} onChange={onCheckboxChange}><strong>Update {partFamilyName}</strong></Checkbox>}
        {partsEnabled && <Select id="partFamilyId" onChange={onFieldChange}
          value={model.get('partFamilyId')} options={partFamilies}
          disabled={saving || !model.get('updatePartFamilyId')}
          formValidationErrors={validationErrors} />}

        <Checkbox id="updateFixVariable" disabled={saving} checked={model.get('updateFixVariable')} onChange={onCheckboxChange}>
          <strong>Update Fixed/Variable</strong>
        </Checkbox>
        <Select id="fixed" onChange={onFieldChange} disabled={saving || !model.get('updateFixVariable')}
          value={model.get('fixed')} formValidationErrors={validationErrors}
          options={[{value: '', label: ''}, {value: '1', label: 'Fixed'}, {value: '0', label: 'Variable'}]} />

        <Checkbox id="updateEffectiveStartDate" disabled={saving} checked={model.get('updateEffectiveStartDate')} onChange={onCheckboxChange}>
          <strong>Update Effective Start Date</strong>
        </Checkbox>
        <Date id="effectiveStartDate" label="Effective Start Date" onChange={onEffectiveStartDateFieldChange}
          value={model.get('effectiveStartDate') ? moment(model.get('effectiveStartDate')) : null}
          formValidationErrors={validationErrors} disabled={saving || !model.get('updateEffectiveStartDate')} />

        <Checkbox id="updateEffectiveEndDate" disabled={saving} checked={model.get('updateEffectiveEndDate')} onChange={onCheckboxChange}>
          <strong>Update Effective End Date</strong>
        </Checkbox>
        <Date id="effectiveEndDate" label="Effective End Date" onChange={onEffectiveEndDateFieldChange}
          value={model.get('effectiveEndDate') ? moment(model.get('effectiveEndDate')) : null}
          formValidationErrors={validationErrors} disabled={saving || !model.get('updateEffectiveEndDate')} />

        {filingFields.valueSeq().map(x => {
          const item = model.get('filingFieldValues').find(y => y.get('standardFilingFieldId') === x.get('id'));
          const checked = model.get('filingFieldsChecked').indexOf(x.get('id')) >= 0;
          const value = item ? item.get('standardFilingFieldOptionId') : null;
          const id = `updateFilingField-${x.get('id').toString()}`;
          return (
            <div key={x.get('id')}>
              <Checkbox data-id={x.get('id')} disabled={saving}
                checked={checked} onChange={onFilingFieldCheckboxChange}><strong>Update {x.get('name')}</strong></Checkbox>
              <Select id={id} name={`filingField-${x.get('id')}`} data-id={x.get('id')} onChange={onFilingFieldChange}
                disabled={saving || !checked}
                value={value} options={x.get('options')} formValidationErrors={validationErrors} />
            </div>
          );
        })}

        <Checkbox id="updateStatus" disabled={saving} checked={model.get('updateStatus')} onChange={onCheckboxChange}>
          <strong>Update Status</strong>
        </Checkbox>
        <StandardStatusSettings
          editing hideHeader showComment disabled={!model.get('updateStatus')}
          onFieldChange={onFieldChange}
          model={model}
          validationErrors={validationErrors}
          statuses={statuses} />

        <div className="toggle-switch  form-group">
          <label className="control-label">Delete Selections</label>
          <DeleteButton title={'Delete'} className="delete btn btn-sm btn-default" isVisible isOpen disabled={saving} onClick={onDelete} />
        </div>
        <div className="toggle-switch  form-group">
          <label className="control-label">Delete All Revisions</label>
          <DeleteButton title={'Except current revision'} className="delete btn btn-sm btn-default" isVisible isOpen disabled={saving || activeBulkDeleteBackgroundJob} onClick={onDeleteRevisions} />
        </div>
      </fieldset>
    </form>
  );
}

StandardsListBulkEditForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
  saving: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,

  departmentCount: PropTypes.number.isRequired,
  selectedStatuses: PropTypes.array.isRequired,
  partsEnabled: PropTypes.bool.isRequired,

  statuses: PropTypes.array.isRequired,
  attributes: PropTypes.array.isRequired,
  jobClasses: PropTypes.array.isRequired,
  laborCategories: PropTypes.array.isRequired,
  classifications: PropTypes.array.isRequired,
  allowances: PropTypes.array.isRequired,
  partFamilyName: PropTypes.string.isRequired,
  partFamilies: PropTypes.array.isRequired,
  filingFields: PropTypes.instanceOf(Map).isRequired,

  onFieldChange: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  onFilingFieldCheckboxChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onFilingFieldChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDeleteRevisions: PropTypes.func.isRequired,
  onEffectiveStartDateFieldChange: PropTypes.func.isRequired,
  onEffectiveEndDateFieldChange: PropTypes.func.isRequired,
};
