import autoBind from 'react-autobind';
import {
  HiddenSubmitButton,
  TextInput,
  TextArea,
  NumericInput,
  withAutoFocusOnEdit,
  Select,
} from '../../forms/components';
import {List, Map, fromJS} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Button} from 'react-bootstrap';

class CreateEditCharacteristicForm extends Component {
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
    characteristicSetValues.forEach(cc => {
      if (cc.get('characteristicSetId') === characteristicSetId) {
        value = cc.get('value');
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
      model,
      validationErrors,
      characteristicSets,
      activeStatuses,
      saving,
      onFieldChange,
      onSetValueChange,
      onSubmit,
      onRename,
      primaryInputRef,
      columnClickTarget,
      disabled,
      disableActiveStatus,
      isCreateCharacteristic,
    } = this.props;
    const nameValidationErrors =
      (validationErrors && validationErrors.get('name')) || List();

    return (
      <form onSubmit={onSubmit} className="create-edit-characteristic-form">
        <fieldset disabled={disabled || saving}>
          <TextInput
            id="name"
            label="Name"
            maxLength={256}
            value={model.get('name')}
            onChange={onFieldChange}
            inputRef={
              columnClickTarget === 'Name' ? primaryInputRef : null
            }
            formValidationErrors={validationErrors} />
          {nameValidationErrors.size > 0 && onRename && (
            <Button
              className="rename-characteristic"
              bsStyle="primary"
              bsSize="small"
              disabled={saving}
              onClick={onRename}>
              Rename Characteristic
            </Button>
          )}
          <TextArea
            id="definition"
            label="Definition"
            maxLength={1024}
            value={model.get('definition')}
            onChange={onFieldChange}
            rows={5}
            formValidationErrors={validationErrors} />
          <Select
            id="status"
            label="Status"
            value={model.get('status')}
            options={activeStatuses}
            onChange={onFieldChange}
            disabled={disableActiveStatus}
            formValidationErrors={validationErrors} />
          <div className={isCreateCharacteristic ? 'characteristic-sets' : 'edit-characteristic-sets'}>
            {characteristicSets.map(cc => (
              <NumericInput
                key={cc.get('id')}
                id={cc.get('id').toString()}
                min="0"
                step="any"
                formGroupClassName="characteristic-set"
                className={this.getCellClassName(cc, model)}
                label={cc.get('name')}
                labelTitle
                value={this.getSetValue(cc, model)}
                inputRef={
                  columnClickTarget === cc.get('name')
                    ? primaryInputRef
                    : null
                }
                onChange={onSetValueChange}
                formValidationErrors={validationErrors} />
            ))}
          </div>
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

CreateEditCharacteristicForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSetValueChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onRename: PropTypes.func,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  characteristicSets: PropTypes.instanceOf(List).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  primaryInputRef: PropTypes.func,
  activeStatuses: PropTypes.array.isRequired,
  columnClickTarget: PropTypes.string,
  disabled: PropTypes.bool,
};

export default withAutoFocusOnEdit()(CreateEditCharacteristicForm);
