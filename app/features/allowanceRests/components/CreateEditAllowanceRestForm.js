import autoBind from 'react-autobind';
import {
  HiddenSubmitButton,
  TextInput,
  Select,
  withAutoFocusOnEdit,
} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class CreateEditAllowanceRestForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);

    this.muscularForces = [
      {pctLoad: '01 - 12', lbs: '01 - 10', weight: 0}, {pctLoad: '13 - 25', lbs: '01 - 10', weight: 1}, {pctLoad: '26 - 50', lbs: '01 - 10', weight: 2}, {pctLoad: '51 - 75', lbs: '01 - 10', weight: 3}, {pctLoad: '76 - 100', lbs: '01 - 10', weight: 4},
      {pctLoad: '01 - 12', lbs: '11 - 20', weight: 1}, {pctLoad: '13 - 25', lbs: '11 - 20', weight: 3}, {pctLoad: '26 - 50', lbs: '11 - 20', weight: 5}, {pctLoad: '51 - 75', lbs: '11 - 20', weight: 7}, {pctLoad: '76 - 100', lbs: '11 - 20', weight: 10},
      {pctLoad: '01 - 12', lbs: '21 - 30', weight: 2}, {pctLoad: '13 - 25', lbs: '21 - 30', weight: 4}, {pctLoad: '26 - 50', lbs: '21 - 30', weight: 9}, {pctLoad: '51 - 75', lbs: '21 - 30', weight: 13}, {pctLoad: '76 - 100', lbs: '21 - 30', weight: 17},
      {pctLoad: '01 - 12', lbs: '31 - 40', weight: 3}, {pctLoad: '13 - 25', lbs: '31 - 40', weight: 6}, {pctLoad: '26 - 50', lbs: '31 - 40', weight: 13}, {pctLoad: '51 - 75', lbs: '31 - 40', weight: 19}, {pctLoad: '76 - 100', lbs: '31 - 40', weight: 25},
      {pctLoad: '01 - 12', lbs: '41 - 50', weight: 5}, {pctLoad: '13 - 25', lbs: '41 - 50', weight: 9}, {pctLoad: '26 - 50', lbs: '41 - 50', weight: 17}, {pctLoad: '51 - 75', lbs: '41 - 50', weight: 25}, {pctLoad: '76 - 100', lbs: '41 - 50', weight: 34},
      {pctLoad: '01 - 12', lbs: '51 - 60', weight: 6}, {pctLoad: '13 - 25', lbs: '51 - 60', weight: 11}, {pctLoad: '26 - 50', lbs: '51 - 60', weight: 22},
      {pctLoad: '01 - 12', lbs: '61 - 70', weight: 7}, {pctLoad: '13 - 25', lbs: '61 - 70', weight: 14}, {pctLoad: '26 - 50', lbs: '61 - 70', weight: 28},
      {pctLoad: '01 - 12', lbs: '71 - 80', weight: 8}, {pctLoad: '13 - 25', lbs: '71 - 80', weight: 17}, {pctLoad: '26 - 50', lbs: '71 - 80', weight: 34},
    ];

    const lbOptions = new Set();

    for (const mf of this.muscularForces) {
      lbOptions.add(mf.lbs);
    }

    this.lbOptions = Array.from(lbOptions);
  }

  render() {
    const {
      model, validationErrors,
      saving,
      onFieldChange, onSubmit,
      primaryInputRef,
    } = this.props;

    const pctLoadOptions = new Set();

    const percentUnderLoad = model.get('percentUnderLoad');
    const poundsHandled = model.get('poundsHandled');
    const muscularForce = model.get('muscularForce');

    for (const mf of this.muscularForces.filter(mf => mf.lbs === poundsHandled)) {
      pctLoadOptions.add(mf.pctLoad);
    }

    const entry = this.muscularForces.find(mf => mf.pctLoad === percentUnderLoad && mf.lbs === poundsHandled);
    if (entry) {
      if (entry.weight !== muscularForce) {
        setTimeout(() => onFieldChange({target: {name: 'muscularForce', value: entry.weight}}));
      }
    } else {
      setTimeout(() => {
        if (percentUnderLoad) onFieldChange({target: {name: 'percentUnderLoad', value: ''}});
        if (muscularForce !== '') onFieldChange({target: {name: 'muscularForce', value: ''}});
      });
    }

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={saving}>
          <TextInput
            id="name" label="Name" maxLength={250} value={model.get('name')}
            onChange={onFieldChange}
            inputRef={primaryInputRef}
            formValidationErrors={validationErrors} />

          <Select id="poundsHandled" label="Effective Net Weight Pounds Handled" disabled={percentUnderLoad === null}
            value={model.get('poundsHandled')}
            onChange={onFieldChange} formValidationErrors={validationErrors}>
            <option value="" />
            {this.lbOptions.map(value => (<option key={value} value={value}>{value}</option>))}
          </Select>

          <Select id="percentUnderLoad" label="Percent Time Under Load"
            value={model.get('percentUnderLoad')}
            onChange={onFieldChange} formValidationErrors={validationErrors}>
            <option value="" />
            {Array.from(pctLoadOptions).map(value => (<option key={value} value={value}>{value}</option>))}
          </Select>

          <TextInput id="muscularForce" label="Muscular Force (Factor)"
            value={model.get('muscularForce')} disabled formValidationErrors={validationErrors} />

          <Select id="conditionalMultiplier" label="Conditional Multiplier (Factor)"
            value={model.get('conditionalMultiplier')}
            onChange={onFieldChange} formValidationErrors={validationErrors}>
            <option value="1.0">1.0 - Normal</option>
            <option value="1.1">1.1 - Lifting from floor</option>
            <option value="1.2">1.2 - Placing above chest</option>
            <option value="1.5">1.5 - Getting above chest</option>
          </Select>

          <Select id="positionalMultiplier" label="Positional Multiplier (Percent)"
            value={model.get('positionalMultiplier')}
            onChange={onFieldChange} formValidationErrors={validationErrors}>
            <option value="0">0 - Multiple</option>
            <option value="1">1 - Sitting/Walking</option>
            <option value="2">2 - Standing</option>
            <option value="4">4 - Up/Down (ladders, stairs, ramps)</option>
            <option value="7">7 - Cramped, Close</option>
          </Select>

          <Select id="visualStrain" label="Visual Strain (Percent)"
            value={model.get('visualStrain')}
            onChange={onFieldChange} formValidationErrors={validationErrors}>
            <option value="0">0 - Normal</option>
            <option value="2">2 - Poor lighting, or glare or strobe effect on work surface</option>
          </Select>

          <Select id="noise" label="Noise (Percent)"
            value={model.get('noise')}
            onChange={onFieldChange} formValidationErrors={validationErrors}>
            <option value="0">0 - Normal</option>
            <option value="1">1 - Constant, rather loud (&gt;60 decibels) noises</option>
            <option value="2">2 - Average with sharp intermittent noise (Jackhammers, Punch Presses)</option>
          </Select>

          <Select id="safetyDevices" label="Safety Devices/Clothing (Percent)"
            value={model.get('safetyDevices')}
            onChange={onFieldChange} formValidationErrors={validationErrors}>
            <option value="0">0 - None</option>
            <option value="2">2 - Face Shield/Boots</option>
            <option value="3">3 - Goggles/Welding Mask</option>
            <option value="4">4 - Tight or Heavy Clothing</option>
            <option value="5">5 - Filter Mask</option>
          </Select>

          <Select id="concentration" label="Concentration (Percent)"
            value={model.get('concentration')}
            onChange={onFieldChange} formValidationErrors={validationErrors}>
            <option value="0">0 - Work committed to habit</option>
            <option value="2">2 - Requries full attention</option>
            <option value="4">4 - Requires concentrated attention</option>
            <option value="8">8 - Requires deep attention</option>
          </Select>

          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

CreateEditAllowanceRestForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  primaryInputRef: PropTypes.func,
};

export default withAutoFocusOnEdit()(CreateEditAllowanceRestForm);
