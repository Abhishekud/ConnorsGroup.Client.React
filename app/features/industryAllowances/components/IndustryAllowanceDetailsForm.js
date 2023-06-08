import autoBind from 'react-autobind';
import {HiddenSubmitButton, TextInput, NumericInput, withAutoFocusOnEdit} from '../../forms/components';
import {Map} from 'immutable';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

class IndustryAllowanceDetailsForm extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model,
    } = this.props;

    return (
      <form>
        <fieldset disabled>
          <TextInput
            id="name" label="Name" maxLength={256} value={model.get('name')} readOnly />

          <NumericInput id="paidTimeMinutes" label="Paid Time (Minutes)"
            value={model.get('paidTimeMinutes')} readOnly />

          <NumericInput id="excludedPaidBreaksMinutes" label="Excluded Paid Breaks (Minutes)"
            value={model.get('excludedPaidBreaksMinutes')} readOnly />

          <NumericInput id="reliefTimeMinutes" label="Relief Time (Minutes)"
            value={model.get('reliefTimeMinutes')} readOnly />

          <NumericInput id="includedPaidBreaksMinutes" label="Included Paid Breaks (Minutes)"
            value={model.get('includedPaidBreaksMinutes')} readOnly />

          <NumericInput id="minorUnavoidableDelayPercent" label="Minor Unavoidable Delay (Percent)"
            value={model.get('minorUnavoidableDelayPercent')} readOnly />

          <NumericInput id="additionalDelayPercent" label="Additional Delay (Percent)"
            value={model.get('additionalDelayPercent')} readOnly />

          <NumericInput id="machineAllowancePercent" label="Incentive Opportunity Allowance (Percent)"
            value={model.get('machineAllowancePercent')} readOnly />

          <TextInput id="name" label="Rest Calculation" maxLength={256}
            value={model.get('allowanceRestName')} readOnly />

          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

IndustryAllowanceDetailsForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
};

export default withAutoFocusOnEdit()(IndustryAllowanceDetailsForm);
