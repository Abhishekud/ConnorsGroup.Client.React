import React, {Component, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import {Map} from 'immutable';
import autoBind from 'react-autobind';
import moment from 'moment';
import {
  Select,
  TextArea,
  TextInput,
  Date,
  withAutoFocusOnEdit,
} from '../../forms/components';
import StandardStatusSettings from './StandardStatusSettings';
import {PRODUCTION, ARCHIVE} from '../constants/standardStatuses';

class StandardDetailsForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleEffectiveStartDate(date) {
    this.props.onFieldChange({target: {name: 'effectiveStartDate', value: date}});
  }

  handleEffectiveEndDate(date) {
    this.props.onFieldChange({target: {name: 'effectiveEndDate', value: date}});
  }

  render() {
    const {
      model, validationErrors, creating, editing, saving, statusLogs, onClickComment, showStatusComment, currentStatus,
      allowances, classifications, attributes, departments, jobClasses, laborCategories, statuses, partFamilies,
      onFieldChange, departmentName, primaryInputRef, filingFields, onFilingFieldChange, partsEnabled, partFamilyName,
      canManageProduction,
    } = this.props;

    const attributeId = model.get('attributeId') || '';
    if (!attributes.some(a => a.value === attributeId.toString())) {
      setTimeout(() => onFieldChange({target: {name: 'attributeId', value: ''}}));
    }

    const isLockedStandard = currentStatus === PRODUCTION || currentStatus === ARCHIVE;
    const disabled = saving || !editing || isLockedStandard;

    return (
      <Fragment>
        <fieldset disabled={disabled}>
          <TextInput id="name" inputRef={primaryInputRef} label="Name"
            onChange={onFieldChange} value={model.get('name')}
            formValidationErrors={validationErrors} />
          <Select id="departmentId" label={departmentName} disabled={!creating}
            onChange={onFieldChange} value={model.get('departmentId')} options={departments}
            formValidationErrors={validationErrors} />
          <Select id="fixed" label="Fixed/Variable"
            onChange={onFieldChange} value={model.get('fixed').toString()} options={[{value: 'true', label: 'Fixed'}, {value: 'false', label: 'Variable'}]}
            formValidationErrors={validationErrors} />
          <Select id="attributeId" label="Attribute"
            onChange={onFieldChange} value={model.get('attributeId')} options={attributes}
            formValidationErrors={validationErrors} />
          <Select id="jobClassId" label="Job Class" onChange={onFieldChange}
            value={model.get('jobClassId')} options={jobClasses}
            formValidationErrors={validationErrors} />
          <Select id="laborCategoryId" label="Labor Category" onChange={onFieldChange}
            value={model.get('laborCategoryId')} options={laborCategories}
            formValidationErrors={validationErrors} />
          <Select id="classificationId" label="Classification" onChange={onFieldChange}
            value={model.get('classificationId')} options={classifications}
            formValidationErrors={validationErrors} />
          <Select id="allowanceId" label="Allowances" onChange={onFieldChange}
            value={model.get('allowanceId')} options={allowances}
            formValidationErrors={validationErrors} />
          <Date id="effectiveStartDate" label="Effective Start Date" onChange={this.handleEffectiveStartDate}
            value={model.get('effectiveStartDate') ? moment(model.get('effectiveStartDate')) : null}
            formValidationErrors={validationErrors} disabled={disabled} />
          <Date id="effectiveEndDate" label="Effective End Date" onChange={this.handleEffectiveEndDate}
            value={model.get('effectiveEndDate') ? moment(model.get('effectiveEndDate')) : null}
            formValidationErrors={validationErrors} disabled={disabled} />
          <TextArea id="applicatorInstructions" label="Applicator Instructions" rows={5}
            onChange={onFieldChange} value={model.get('applicatorInstructions')}
            formValidationErrors={validationErrors} />
          {creating ? null : <TextInput id="applicatorName" label="Applicator" disabled value={model.get('applicatorName')} />}
          {creating ? null : <TextInput id="lastEditorName" label="Editor" disabled value={model.get('lastEditorName')} />}

          {partsEnabled && <Select id="partFamilyId" label={partFamilyName} onChange={onFieldChange}
            value={model.get('partFamilyId')} options={partFamilies}
            formValidationErrors={validationErrors} />}

          {filingFields.valueSeq().map(x => {
            const item = model.get('filingFieldValues').find(y => y.get('standardFilingFieldId') === x.get('id'));
            const value = item ? item.get('standardFilingFieldOptionId') : null;
            return (
              <Select key={x.get('id')} name={`filingField-${x.get('id')}`} id={x.get('id').toString()} label={x.get('name')} onChange={onFilingFieldChange}
                value={value} options={x.get('options')} formValidationErrors={validationErrors} />
            );
          })}
        </fieldset>
        {creating ? null
          : <fieldset disabled={saving || !editing}>
            <StandardStatusSettings
              editing={editing}
              disabled={!canManageProduction && isLockedStandard}
              onFieldChange={onFieldChange}
              onClickComment={onClickComment}
              model={model}
              validationErrors={validationErrors}
              statuses={statuses}
              statusLogs={statusLogs}
              showComment={showStatusComment} />
          </fieldset>}
      </Fragment>
    );
  }
}

StandardDetailsForm.propTypes = {
  model: PropTypes.object.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  creating: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  filingFields: PropTypes.instanceOf(Map).isRequired,

  allowances: PropTypes.array.isRequired,
  classifications: PropTypes.array.isRequired,
  departmentName: PropTypes.string.isRequired,
  departments: PropTypes.array.isRequired,
  attributes: PropTypes.array.isRequired,
  jobClasses: PropTypes.array.isRequired,
  laborCategories: PropTypes.array.isRequired,
  statuses: PropTypes.array,
  statusLogs: PropTypes.array,
  showStatusComment: PropTypes.bool,
  partsEnabled: PropTypes.bool.isRequired,
  partFamilies: PropTypes.array.isRequired,
  partFamilyName: PropTypes.string.isRequired,
  currentStatus: PropTypes.string,

  onFieldChange: PropTypes.func.isRequired,
  onFilingFieldChange: PropTypes.func.isRequired,
  onClickComment: PropTypes.func,
  primaryInputRef: PropTypes.func,
  canManageProduction: PropTypes.bool,
};

export default withAutoFocusOnEdit()(StandardDetailsForm);
