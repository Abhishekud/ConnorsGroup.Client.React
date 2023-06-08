import autoBind from 'react-autobind';
import {HiddenSubmitButton, Select, withAutoFocusOnEdit} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Checkbox} from 'react-bootstrap';
class BulkEditLocationDepartmentForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      bulkModel,
      validationErrors,
      saving,
      onFieldChange,
      onSubmit,
      characteristicCategories,
      volumeDriverMappingSets,
      onCheckboxChange,
      disabled,
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled || saving}>

          <Checkbox id="updateVolumeDriverMappingSetId" disabled={saving}
            name="updatevolumeDriverMappingSetId" onChange={onCheckboxChange}
            checked={bulkModel.get('updateVolumeDriverMappingSetId')}>
            <strong>Update Volume Driver Mapping Set</strong>
          </Checkbox>

          <Select
            id="volumeDriverMappingSetId" label="Volume Driver Mapping Set"
            value={bulkModel.get('volumeDriverMappingSetId')}
            onChange={onFieldChange}
            options={volumeDriverMappingSets}
            formValidationErrors={validationErrors}
            disabled={saving || !bulkModel.get('updateVolumeDriverMappingSetId')} />

          <Checkbox id="updateCharacteristicSetId" name="updatecharacteristicSetId"
            checked={bulkModel.get('updateCharacteristicSetId')}
            onChange={onCheckboxChange}><strong>Update Characteristic Set</strong>
          </Checkbox>
          <Select
            id="characteristicSetId" label="Characteristic Set" value={bulkModel.get('characteristicSetId')}
            onChange={onFieldChange}
            options={characteristicCategories}
            formValidationErrors={validationErrors}
            disabled={saving || !bulkModel.get('updateCharacteristicSetId')} />
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

BulkEditLocationDepartmentForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  bulkModel: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  characteristicCategories: PropTypes.array.isRequired,
  volumeDriverMappingSets: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
};

export default withAutoFocusOnEdit()(BulkEditLocationDepartmentForm);
