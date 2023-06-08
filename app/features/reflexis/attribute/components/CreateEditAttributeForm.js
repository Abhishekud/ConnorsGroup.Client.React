import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {
  TextInput,
  withAutoFocusOnEdit,
  HiddenSubmitButton,
} from '../../../forms/components';

class CreateEditAttributeForm extends PureComponent {
  render() {
    const {
      model,
      primaryInputRef,
      formValidationErrors,
      disabled,
      onSubmit,
      onFieldChange,
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled}>
          <TextInput
            id="name"
            inputRef={primaryInputRef}
            label="Name"
            onChange={onFieldChange}
            value={model.get('name')}
            formValidationErrors={formValidationErrors} />
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

CreateEditAttributeForm.propTypes = {
  model: PropTypes.object.isRequired,
  primaryInputRef: PropTypes.func.isRequired,
  formValidationErrors: PropTypes.object,
  //create: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,

  // handlers
  onSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
};

export default withAutoFocusOnEdit()(CreateEditAttributeForm);
