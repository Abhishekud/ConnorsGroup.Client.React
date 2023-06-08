import autoBind from 'react-autobind';
import {
  HiddenSubmitButton,
  TextInput,
  ToggleSwitch,
} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

export default class EditCharacteristicSetForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model, validationErrors, defaultSet,
      saving,
      onFieldChange, onSubmit,
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={saving}>
          <TextInput
            id="name" label="Name" maxLength={256} value={model.get('name')}
            onChange={onFieldChange} autoFocus
            formValidationErrors={validationErrors} />
          <ToggleSwitch id="default" label="Make the default"
            disabled={defaultSet}
            onChange={defaultSet ? null : onFieldChange} checked={model.get('default')} />
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

EditCharacteristicSetForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  defaultSet: PropTypes.bool.isRequired,
};
