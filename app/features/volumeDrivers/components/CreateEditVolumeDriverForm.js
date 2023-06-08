import autoBind from 'react-autobind';
import {HiddenSubmitButton, TextInput, Select, withAutoFocusOnEdit} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class CreateEditVolumeDriverForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model, validationErrors,
      saving,
      onFieldChange, onSubmit,
      primaryInputRef,
      departmentName,
      departments,
      disabled,
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled || saving}>
          <TextInput
            id="name" label="Name" maxLength={256} value={model.get('name')}
            onChange={onFieldChange}
            inputRef={primaryInputRef}
            formValidationErrors={validationErrors} />
          <Select
            id="departmentId" label={departmentName} disabled={model.get('id', 0) !== 0}
            onChange={onFieldChange} value={model.get('departmentId')} options={departments}
            formValidationErrors={validationErrors} />
          <TextInput
            id="description" label="Description" maxLength={1024} value={model.get('description')}
            onChange={onFieldChange}
            formValidationErrors={validationErrors} />
          <HiddenSubmitButton disabled={disabled} />
        </fieldset>
      </form>
    );
  }
}

CreateEditVolumeDriverForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  primaryInputRef: PropTypes.func,
  departmentName: PropTypes.string.isRequired,
  departments: PropTypes.array.isRequired,
};

export default withAutoFocusOnEdit()(CreateEditVolumeDriverForm);
