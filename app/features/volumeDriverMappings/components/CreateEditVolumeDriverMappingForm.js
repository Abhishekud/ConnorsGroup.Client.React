import autoBind from 'react-autobind';
import {HiddenSubmitButton, Select, NumericInput, withAutoFocusOnEdit, TextArea} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class CreateEditVolumeDriverMappingForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  getSetValue(volumeDriverMappingSet, volumeDriverMapping) {
    const setId = volumeDriverMappingSet.get('id');
    const value = volumeDriverMapping.get('values').find(cv => cv.get('volumeDriverMappingSetId') === setId);
    return value ? value.get('value') : 0;
  }

  render() {
    const {
      model, validationErrors, volumeDriverOptions, unitOfMeasureOptions, onSetValueChange,
      saving, onFieldChange, onSubmit, volumeDriverMappingSets, disabled,
      primaryInputRef,
      columnClickTarget,
    } = this.props;
    return (
      <form onSubmit={onSubmit} className="create-edit-volume-driver-mapping-form">
        <fieldset disabled={saving}>
          <Select id="volumeDriverId" label="Volume Driver" value={model.get('volumeDriverId')}
            onChange={onFieldChange}
            disabled={disabled}
            options={volumeDriverOptions}
            formValidationErrors={validationErrors}
            inputRef={
              columnClickTarget === 'Volume Driver' ? primaryInputRef : null
            } />
          <Select id="unitOfMeasureId" label="Unit Of Measure" value={model.get('unitOfMeasureId')}
            onChange={onFieldChange}
            disabled={disabled}
            options={unitOfMeasureOptions}
            formValidationErrors={validationErrors}
            inputRef={
              columnClickTarget === 'Unit Of Measure'
                ? primaryInputRef
                : null
            } />
          <TextArea
            id="description" label="Description" maxLength={1024} value={model.get('description')}
            onChange={onFieldChange} rows={5}
            disabled={disabled}
            formValidationErrors={validationErrors} />
          <div className="volume-driver-mapping-sets">
            {volumeDriverMappingSets.map(vdms =>
              (<NumericInput key={vdms.get('id')} id={vdms.get('id').toString()} min="0" step="any"
                formGroupClassName="volume-driver-mapping-set" className="text-right"
                label={vdms.get('name')} labelTitle value={this.getSetValue(vdms, model)}
                disabled={disabled}
                inputRef={
                  columnClickTarget === vdms.get('name')
                    ? primaryInputRef
                    : null
                }
                onChange={onSetValueChange}
                formValidationErrors={validationErrors} />))}
          </div>
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

CreateEditVolumeDriverMappingForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSetValueChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  volumeDriverOptions: PropTypes.instanceOf(Array).isRequired,
  unitOfMeasureOptions: PropTypes.instanceOf(Array).isRequired,
  columnClickTarget: PropTypes.string,
  primaryInputRef: PropTypes.func,
  disabled: PropTypes.bool,
};

export default withAutoFocusOnEdit()(CreateEditVolumeDriverMappingForm);
