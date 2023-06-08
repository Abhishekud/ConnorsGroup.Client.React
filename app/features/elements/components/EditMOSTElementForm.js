import autoBind from 'react-autobind';
import {HiddenSubmitButton, TextArea, TextInput, Select, withAutoFocusOnEdit} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import ElementStatusSettings from './ElementStatusSettings';
import {PRODUCTION, ARCHIVE} from '../../standards/constants/standardStatuses';

class EditMOSTElementForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model, validationErrors,
      editing, saving,
      onFieldChange, onSubmit, onClickComment,
      primaryInputRef,
      unitsOfMeasure,
      activities,
      currentStatus,
      statuses, statusLogs, showStatusComment,
      canManageProduction,
      canEdit,
    } = this.props;

    const isLocked = currentStatus === PRODUCTION || currentStatus === ARCHIVE;
    return (
      <form onSubmit={onSubmit} className="edit-element-header-form">
        <fieldset disabled={saving || !editing}>
          <TextInput
            id="name" label="Name" maxLength={256} value={model.get('name')}
            onChange={onFieldChange}
            formValidationErrors={validationErrors}
            inputRef={primaryInputRef} />
          <Select
            disabled={currentStatus === PRODUCTION || currentStatus === ARCHIVE}
            id="elementUnitOfMeasureId" label="Unit Of Measure" value={model.get('elementUnitOfMeasureId')}
            onChange={onFieldChange}
            options={unitsOfMeasure}
            formValidationErrors={validationErrors} />
          <Select
            id="elementActivityId" label="Activity" value={model.get('elementActivityId')}
            onChange={onFieldChange}
            options={activities}
            formValidationErrors={validationErrors} />
          <TextArea id="applicatorInstructions" label="Applicator Instructions" rows={5}
            onChange={onFieldChange} value={model.get('applicatorInstructions')}
            formValidationErrors={validationErrors} />
          <TextInput id="applicatorName" label="Applicator" disabled value={model.get('applicatorName')} />
          <TextInput id="lastEditorName" label="Editor" disabled value={model.get('lastEditorName')} />
          <ElementStatusSettings
            model={model}
            editing={editing}
            disabled={!canManageProduction && isLocked}
            validationErrors={validationErrors}
            statuses={statuses}
            statusLogs={statusLogs}
            showComment={showStatusComment}
            onFieldChange={onFieldChange}
            onClickComment={onClickComment} />
          <HiddenSubmitButton disabled={!canEdit} />
        </fieldset>
      </form>
    );
  }
}

EditMOSTElementForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onClickComment: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  primaryInputRef: PropTypes.func,
  unitsOfMeasure: PropTypes.array.isRequired,
  activities: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
  statusLogs: PropTypes.array.isRequired,
  showStatusComment: PropTypes.bool.isRequired,
  currentStatus: PropTypes.string,
  canManageProduction: PropTypes.bool,
  canEdit: PropTypes.bool,
};

export default withAutoFocusOnEdit()(EditMOSTElementForm);
