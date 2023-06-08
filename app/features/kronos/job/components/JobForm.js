import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {
  TextInput,
  withAutoFocusOnEdit,
  HiddenSubmitButton,
} from '../../../forms/components';

class JobForm extends PureComponent {
  render() {
    const {
      primaryInputRef,
      onFieldChange,

      model,
      onSubmit,
      formValidationErrors,
    } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <fieldset>
          <TextInput id="name" inputRef={primaryInputRef} label="Name" onChange={onFieldChange} value={model.get('name')} formValidationErrors={formValidationErrors} />
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

JobForm.propTypes = {
  model: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,

  primaryInputRef: PropTypes.func.isRequired,
  formValidationErrors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default withAutoFocusOnEdit()(JobForm);
