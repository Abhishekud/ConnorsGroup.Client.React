import autoBind from 'react-autobind';
import {HiddenSubmitButton, TextInput, NumericInput, Select, withAutoFocusOnEdit} from '../../forms/components';
import {Map} from 'immutable';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

class CreateEditAllowanceForm extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model, validationErrors,
      editing, saving,
      allowanceRestTimes,
      onFieldChange, onSubmit,
      primaryInputRef,
      disabled,
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled || saving || !editing}>
          <TextInput
            id="name" label="Name" maxLength={256} value={model.get('name')}
            onChange={onFieldChange}
            inputRef={primaryInputRef}
            formValidationErrors={validationErrors} />

          <NumericInput id="paidTimeMinutes" label="Paid Time (Minutes)"
            value={model.get('paidTimeMinutes')}
            onChange={onFieldChange} formValidationErrors={validationErrors} />

          <NumericInput id="excludedPaidBreaksMinutes" label="Excluded Paid Breaks (Minutes)"
            value={model.get('excludedPaidBreaksMinutes')}
            onChange={onFieldChange} formValidationErrors={validationErrors} />

          <NumericInput id="reliefTimeMinutes" label="Relief Time (Minutes)"
            value={model.get('reliefTimeMinutes')}
            onChange={onFieldChange} formValidationErrors={validationErrors} />

          <NumericInput id="includedPaidBreaksMinutes" label="Included Paid Breaks (Minutes)"
            value={model.get('includedPaidBreaksMinutes')}
            onChange={onFieldChange} formValidationErrors={validationErrors} />

          <Select
            id="allowanceRestId" label="Rest Calculation"
            value={model.get('allowanceRestId')} options={allowanceRestTimes}
            onChange={onFieldChange} formValidationErrors={validationErrors} />

          <NumericInput id="minorUnavoidableDelayPercent" label="Minor Unavoidable Delay (Percent)"
            value={model.get('minorUnavoidableDelayPercent')}
            onChange={onFieldChange} formValidationErrors={validationErrors} />

          <NumericInput id="additionalDelayPercent" label="Additional Delay (Percent)"
            value={model.get('additionalDelayPercent')}
            onChange={onFieldChange} formValidationErrors={validationErrors} />

          <NumericInput id="machineAllowancePercent" label="Incentive Opportunity Allowance (Percent)"
            value={model.get('machineAllowancePercent')}
            onChange={onFieldChange} formValidationErrors={validationErrors} />

          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

CreateEditAllowanceForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  allowanceRestTimes: PropTypes.instanceOf(Array).isRequired,
  primaryInputRef: PropTypes.func,
  disabled: PropTypes.bool,
};

export default withAutoFocusOnEdit()(CreateEditAllowanceForm);
