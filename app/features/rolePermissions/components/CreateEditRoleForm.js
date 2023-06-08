import autoBind from 'react-autobind';
import {HiddenSubmitButton, TextInput, TextArea, withAutoFocusOnEdit, MultiSelect} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import pluralize from 'pluralize';

class CreateEditRoleForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model, validationErrors,
      editing, saving,
      onFieldChange, onSubmit,
      primaryInputRef,
      disabled,
      permissionOptions,
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled || saving || !editing}>
          <TextInput
            id="name" label="Name" maxLength={256} value={model.get('name')}
            onChange={onFieldChange}
            inputRef={primaryInputRef}
            formValidationErrors={validationErrors} />
          <TextArea
            id="description" label="Description" maxLength={1024} value={model.get('description')}
            onChange={onFieldChange} rows={5}
            formValidationErrors={validationErrors} />
          {permissionOptions && permissionOptions.profiling &&
            <MultiSelect
              id="profiling"
              label="Profiling Permissions"
              disabled={disabled || saving || !editing}
              options={permissionOptions.profiling}
              onChange={onFieldChange}
              textField="label"
              dataItemKey="value"
              autoClose={false}
              value={model.get('profiling')} />}
          {permissionOptions && permissionOptions.standards &&
            <MultiSelect
              id="standards"
              label="Standards Permissions"
              disabled={disabled || saving || !editing}
              options={permissionOptions.standards}
              onChange={onFieldChange}
              textField="label"
              dataItemKey="value"
              autoClose={false}
              value={model.get('standards')} />}
          {permissionOptions && permissionOptions.measurements &&
            <MultiSelect
              id="measurements"
              label="Measurements Permissions"
              disabled={disabled || saving || !editing}
              options={permissionOptions.measurements}
              onChange={onFieldChange}
              textField="label"
              dataItemKey="value"
              autoClose={false}
              value={model.get('measurements')} />}
          {permissionOptions && permissionOptions.outputs &&
            <MultiSelect
              id="outputs"
              label="Outputs Permissions"
              disabled={disabled || saving || !editing}
              options={permissionOptions.outputs}
              onChange={onFieldChange}
              textField="label"
              dataItemKey="value"
              autoClose={false}
              value={model.get('outputs')} />}
          {permissionOptions && permissionOptions.admin &&
            <MultiSelect
              id="admin"
              label="Admin Permissions"
              disabled={disabled || saving || !editing}
              options={permissionOptions.admin}
              onChange={onFieldChange}
              textField="label"
              dataItemKey="value"
              autoClose={false}
              value={model.get('admin')} />}
          {permissionOptions && permissionOptions.kronos &&
            <MultiSelect
              id="kronos"
              label="Kronos Permissions"
              disabled={disabled || saving || !editing}
              options={permissionOptions.kronos}
              onChange={onFieldChange}
              textField="label"
              dataItemKey="value"
              autoClose={false}
              value={model.get('kronos')} />}

          <HiddenSubmitButton />
        </fieldset>
        {model.get('id') > 0 && <div className="role-edit-user-count"><strong>{model.get('userCount')}</strong> {pluralize('user', model.get('userCount'))} with this role</div>}
      </form>
    );
  }
}

CreateEditRoleForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  primaryInputRef: PropTypes.func,
  disabled: PropTypes.bool,
};

export default withAutoFocusOnEdit()(CreateEditRoleForm);
