import autoBind from 'react-autobind';
import {HiddenSubmitButton, TextInput, Select, withAutoFocusOnEdit} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class EditLocationDepartmentForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model,
      validationErrors,
      saving,
      onFieldChange,
      onSubmit,
      primaryInputRef,
      characteristicCategories,
      volumeDriverMappingSets,
      disabled,
    } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled || saving}>
          <TextInput
            id="name" label="Name" maxLength={256} value={model.get('name')}
            onChange={onFieldChange} disabled
            inputRef={primaryInputRef}
            formValidationErrors={validationErrors} />
          <Select
            id="volumeDriverMappingSetId" label="Volume Driver Mapping Set"
            value={model.get('volumeDriverMappingSetId')}
            onChange={onFieldChange}
            options={volumeDriverMappingSets}
            formValidationErrors={validationErrors} />
          <Select
            id="characteristicSetId" label="Characteristic Set" value={model.get('characteristicSetId')}
            onChange={onFieldChange}
            options={characteristicCategories}
            formValidationErrors={validationErrors} />
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

EditLocationDepartmentForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  primaryInputRef: PropTypes.func,
  characteristicCategories: PropTypes.array.isRequired,
  volumeDriverMappingSets: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
};

export default withAutoFocusOnEdit()(EditLocationDepartmentForm);
