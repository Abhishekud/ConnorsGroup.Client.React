import {HiddenSubmitButton, NumericInput, withAutoFocusOnEdit, TextInput, TextArea} from '../../forms/components';
import {Map} from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';

function CreateEditVolumeDriverMappingVariablesForm(props) {
  const {
    model, validationErrors, onSetValueChange,
    saving, onFieldChange, onSubmit, volumeDriverMappingSets, disabled,
    columnClickTarget, primaryInputRef,
  } = props;

  const getSetValue = (volumeDriverMappingSet, volumeDriverMappingVariables) => {
    const setId = volumeDriverMappingSet.get('id');
    const value = volumeDriverMappingVariables.get('volumeDriverMappingVariableValues')
      .find(cv => cv.get('volumeDriverMappingSetId') === setId);
    return value ? value.get('value') : 0;
  };

  return (
    <form onSubmit={onSubmit} className="create-edit-volume-driver-mapping-variables-form">
      <fieldset disabled={saving}>
        <TextInput
          id="name" label="Name" maxLength={256} value={model.get('name')}
          onChange={onFieldChange}
          disabled={!disabled}
          inputRef={primaryInputRef}
          formValidationErrors={validationErrors} />
        <TextArea
          id="description"
          label="Description"
          maxLength={1024}
          value={model.get('description')}
          onChange={onFieldChange}
          rows={5}
          disabled={!disabled}
          formValidationErrors={validationErrors} />
        <TextArea
          id="observationNotes"
          label="Observation Notes"
          maxLength={1024}
          value={model.get('observationNotes')}
          onChange={onFieldChange}
          rows={5}
          disabled={!disabled}
          formValidationErrors={validationErrors} />
        <div className="volume-driver-mapping-sets">
          {volumeDriverMappingSets.map(vdms => (
            <NumericInput
              key={vdms.get('id')}
              id={vdms.get('id').toString()}
              min="0"
              step="any"
              formGroupClassName="volume-driver-mapping-set"
              className="text-right"
              label={vdms.get('name')}
              labelTitle
              value={getSetValue(vdms, model)}
              disabled={!disabled}
              inputRef={columnClickTarget === vdms.get('name') ? primaryInputRef : null}
              onChange={onSetValueChange}
              formValidationErrors={validationErrors} />
          ))}
        </div>
        <HiddenSubmitButton />
      </fieldset>
    </form>
  );
}

CreateEditVolumeDriverMappingVariablesForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSetValueChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  columnClickTarget: PropTypes.string,
  disabled: PropTypes.bool,
  primaryInputRef: PropTypes.func,
};

export default withAutoFocusOnEdit()(CreateEditVolumeDriverMappingVariablesForm);
