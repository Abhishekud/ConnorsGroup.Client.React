import autoBind from 'react-autobind';
import {
  HiddenSubmitButton,
  NumericInput,
  withAutoFocusOnEdit,
  Select,
} from '../../forms/components';
import {List, Map, fromJS} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Checkbox} from 'react-bootstrap';

class CreateBulkEditCharacteristicForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }


  getSetValue(characteristicSet, characteristic) {
    const characteristicSetId = characteristicSet.get('id');
    const characteristicSetValues = fromJS(
      characteristic.get('characteristicSetValues')
    );
    let value = '';
    characteristicSetValues.forEach(characteristicSetValuesKey => {
      if (characteristicSetValuesKey.get('characteristicSetId') === characteristicSetId) {
        value = characteristicSetValuesKey.get('value');
      }
    });
    return value;
  }

  getUpdateValue(characteristicSet, characteristic) {
    const characteristicSetId = characteristicSet.get('id');
    const characteristicSetValues = fromJS(
      characteristic.get('characteristicSetValues')
    );
    let value = '';
    characteristicSetValues.forEach(characteristicSetValuesKey => {
      if (characteristicSetValuesKey.get('characteristicSetId') === characteristicSetId) {
        value = characteristicSetValuesKey.get('updateValue');
      }
    });
    return value;
  }

  getCellClassName(characteristicSet, characteristic) {
    const characteristicSetId = characteristicSet.get('id');
    let value = characteristic
      .get('characteristicSetValues')
      .find(cv => cv.characteristicSetId === characteristicSetId);
    value = Map(value);
    if (value) {
      return value.get('neverSpecified')
        ? 'text-right null-cell-value'
        : 'text-right';
    }
    return 'text-right null-cell-value';
  }

  render() {
    const {
      inactiveUpdate,
      model,
      validationErrors,
      characteristicSets,
      focusOnCharacteristicSetId,
      activeStatuses,
      saving,
      onFieldChange,
      onSetValueChange,
      onSubmit,
      onCheckboxChange,
      disabled,
    } = this.props;
    const newModel = model.get(focusOnCharacteristicSetId);
    return (
      <form onSubmit={onSubmit} className="create-edit-characteristic-form">
        <fieldset disabled={disabled || saving}>
          {inactiveUpdate === true
            ? <div className="archive-warning">Inactive characteristics cannot be edited. Proposed bulk edits to them will be ignored unless the characteristic is changed back to Active.
            </div>
            : null}
          <Checkbox
            id="updateStatus" disabled={saving}
            checked={newModel.get('updateStatus')} onChange={onCheckboxChange}><strong>Update Status</strong></Checkbox>
          <Select
            id="status"
            label="Status"
            disabled={saving || !newModel.get('updateStatus')}
            value={newModel.get('status')}
            options={activeStatuses}
            onChange={onFieldChange}
            formValidationErrors={validationErrors} />
          <div className="bulk-edit-characteristic-sets">
            {characteristicSets.map((characteristicSetsKey, index) => (
              <div key={index}>
                <Checkbox id="updateValue" key={index} name={characteristicSetsKey.get('id')} disabled={saving} checked={this.getUpdateValue(characteristicSetsKey, newModel, index)} onChange={onCheckboxChange}><strong>Update {characteristicSetsKey.get('name')}</strong>
                </Checkbox>
                <NumericInput
                  key={characteristicSetsKey.get('id')}
                  id={characteristicSetsKey.get('id').toString()}
                  min="0"
                  step="any"
                  formGroupClassName="characteristic-set"
                  disabled={saving || !(this.getUpdateValue(characteristicSetsKey, newModel))}
                  label={characteristicSetsKey.get('name')}
                  labelTitle
                  value={this.getSetValue(characteristicSetsKey, newModel)}
                  onChange={onSetValueChange}
                  formValidationErrors={validationErrors} />
              </div>
            ))}
          </div>
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

CreateBulkEditCharacteristicForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSetValueChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  characteristicSets: PropTypes.instanceOf(List).isRequired,
  focusOnCharacteristicSetId: PropTypes.number,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  activeStatuses: PropTypes.array.isRequired,
  inactiveUpdate: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

export default withAutoFocusOnEdit()(CreateBulkEditCharacteristicForm);
