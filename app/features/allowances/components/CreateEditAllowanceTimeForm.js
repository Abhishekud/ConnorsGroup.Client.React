import autoBind from 'react-autobind';
import {HiddenSubmitButton, TextInput, TextArea, NumericInput, withAutoFocusOnEdit} from '../../forms/components';
import {Map} from 'immutable';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

class CreateEditAllowanceTimeForm extends PureComponent {
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
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={saving || !editing}>
          <TextInput
            id="name" label="Name" maxLength={256} value={model.get('name')}
            onChange={onFieldChange}
            inputRef={primaryInputRef}
            formValidationErrors={validationErrors} />

          <TextArea
            id="definition"
            label="Definition"
            value={model.get('definition')}
            maxLength={256}
            rows={5}
            formValidationErrors={validationErrors}
            onChange={onFieldChange} />

          <NumericInput
            id="minutes" label="Minutes"
            onChange={onFieldChange}
            value={model.get('minutes')} formValidationErrors={validationErrors} />

          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

CreateEditAllowanceTimeForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  primaryInputRef: PropTypes.func,
};

export default withAutoFocusOnEdit()(CreateEditAllowanceTimeForm);
