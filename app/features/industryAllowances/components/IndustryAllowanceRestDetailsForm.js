import autoBind from 'react-autobind';
import {
  HiddenSubmitButton,
  TextInput,
  withAutoFocusOnEdit,
} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class IndustryAllowanceRestDetailsForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {model} = this.props;

    return (
      <form>
        <fieldset disabled>
          <TextInput
            id="poundsHandled" label="Effective Net Weight Pounds Handled" maxLength={250}
            value={model.get('poundsHandled')} readOnly />

          <TextInput
            id="percentUnderLoad" label="Percent Time Under Load" maxLength={250}
            value={model.get('percentUnderLoad')} readOnly />

          <TextInput id="muscularForce" label="Muscular Force (Factor)"
            value={model.get('muscularForce')} readOnly />

          <TextInput
            id="conditionalMultiplier" label="Conditional Multiplier (Factor)"
            value={model.get('conditionalMultiplier')} maxLength={250} readOnly />

          <TextInput
            id="positionalMultiplier" label="Positional Multiplier (Percent)"
            value={model.get('positionalMultiplier')} maxLength={250} readOnly />

          <TextInput
            id="visualStrain" label="Visual Strain (Percent)"
            value={model.get('visualStrain')} maxLength={250} readOnly />

          <TextInput
            id="noise" label="Noise (Percent)"
            value={model.get('noise')} maxLength={250} readOnly />

          <TextInput
            id="safetyDevices" label="Safety Devices/Clothing (Percent)"
            value={model.get('safetyDevices')} maxLength={250} readOnly />

          <TextInput
            id="concentration" label="Concentration (Percent)"
            value={model.get('concentration')} maxLength={250} readOnly />

          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

IndustryAllowanceRestDetailsForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
};

export default withAutoFocusOnEdit()(IndustryAllowanceRestDetailsForm);
