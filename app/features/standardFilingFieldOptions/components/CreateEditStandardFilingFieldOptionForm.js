import autoBind from 'react-autobind';
import {HiddenSubmitButton, TextInput, withAutoFocusOnEdit} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class CreateEditStandardFilingFieldOptionForm extends Component {
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
      disabled,
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled || saving}>
          <TextInput
            id="value" label="Value" maxLength={256} value={model.get('value')}
            onChange={onFieldChange}
            inputRef={primaryInputRef}
            formValidationErrors={validationErrors} />
          <HiddenSubmitButton disabled={disabled} />
        </fieldset>
      </form>
    );
  }
}

CreateEditStandardFilingFieldOptionForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  primaryInputRef: PropTypes.func,
};

export default withAutoFocusOnEdit()(CreateEditStandardFilingFieldOptionForm);
