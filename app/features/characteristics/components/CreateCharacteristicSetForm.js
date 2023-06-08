import autoBind from 'react-autobind';
import {
  HiddenSubmitButton,
  TextInput,
  Select,
  ToggleSwitch,
} from '../../forms/components';
import {List, Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

export default class CreateCharacteristicSetForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model, validationErrors,
      characteristicSets,
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
            onChange={onFieldChange} checked={model.get('default')} />
          <Select id="copyFromCharacteristicSetId" label="Copy Values From" optional
            value={model.get('copyFromCharacteristicSetId')}
            onChange={onFieldChange} formValidationErrors={validationErrors}>
            <option value="" />
            {characteristicSets.map(cc => (
              <option key={cc.get('id')} value={cc.get('id')}>
                {cc.get('name')}
              </option>))}
          </Select>
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

CreateCharacteristicSetForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  characteristicSets: PropTypes.instanceOf(List).isRequired,
};
