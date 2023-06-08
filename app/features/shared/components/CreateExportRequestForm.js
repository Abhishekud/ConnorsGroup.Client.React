import autoBind from 'react-autobind';
import {HiddenSubmitButton, TextInput, withAutoFocusOnEdit} from '../../forms/components';
import {Map} from 'immutable';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

class CreateExportRequestForm extends PureComponent {
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
            id="fileName" label="File Name" maxLength={128} value={model.get('fileName')}
            onChange={onFieldChange}
            inputRef={primaryInputRef}
            formValidationErrors={validationErrors} />
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

CreateExportRequestForm.propTypes = {
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  primaryInputRef: PropTypes.func,
};

export default withAutoFocusOnEdit()(CreateExportRequestForm);
