import autoBind from 'react-autobind';
import {
  HiddenSubmitButton,
  TextInput,
  Select,
} from '../../forms/components';
import {List, Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

export default class CreateVolumeDriverMappingSetForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model, validationErrors,
      volumeDriverMappingSets,
      saving, disabled,
      onFieldChange, onSubmit,
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled || saving}>
          <TextInput
            id="name" label="Name" maxLength={256} value={model.get('name')}
            onChange={onFieldChange} autoFocus
            formValidationErrors={validationErrors} />
          <Select id="copyFromSetId" label="Copy Values From" optional value={model.get('copyFromSetId')}
            onChange={onFieldChange} formValidationErrors={validationErrors}>
            <option value="" />
            {volumeDriverMappingSets.map(cc => (
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

CreateVolumeDriverMappingSetForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  volumeDriverMappingSets: PropTypes.instanceOf(List).isRequired,
  disabled: PropTypes.bool,
};
