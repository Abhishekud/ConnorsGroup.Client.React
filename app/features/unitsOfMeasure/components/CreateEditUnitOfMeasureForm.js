import autoBind from 'react-autobind';
import {HiddenSubmitButton, TextInput, withAutoFocusOnEdit, Select} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class CreateEditUnitOfMeasureForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model, validationErrors,
      activeStatuses,
      saving,
      onFieldChange, onSubmit,
      primaryInputRef,
      disabled,
      disableActiveStatus,
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled || saving}>
          <TextInput
            id="name" label="Name" maxLength={256} value={model.get('name')}
            onChange={onFieldChange}
            inputRef={primaryInputRef}
            formValidationErrors={validationErrors} />
          <Select id="status" label="Status" value={model.get('status')} options={activeStatuses} onChange={onFieldChange} formValidationErrors={validationErrors} disabled={disableActiveStatus} />
          <HiddenSubmitButton disabled={disabled} />
        </fieldset>
      </form>
    );
  }
}

CreateEditUnitOfMeasureForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  primaryInputRef: PropTypes.func,
  activeStatuses: PropTypes.array.isRequired,
};

export default withAutoFocusOnEdit()(CreateEditUnitOfMeasureForm);
