import autoBind from 'react-autobind';
import {HiddenSubmitButton, TextInput, withAutoFocusOnEdit} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class CreateEditPartFieldForm extends Component {
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
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={saving}>
          <TextInput
            id="name" label="Name" maxLength={256} value={model.get('name')}
            onChange={onFieldChange}
            inputRef={primaryInputRef}
            formValidationErrors={validationErrors} />
          <label className="required-checkbox">
            <input type="checkbox" name="required" disabled={saving}
              checked={model.get('required')} onChange={onFieldChange} />
            <span>Required</span>
          </label>
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

CreateEditPartFieldForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  primaryInputRef: PropTypes.func,
};

export default withAutoFocusOnEdit()(CreateEditPartFieldForm);
