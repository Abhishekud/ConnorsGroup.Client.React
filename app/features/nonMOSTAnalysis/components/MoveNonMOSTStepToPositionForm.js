import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {Map} from 'immutable';
import {withAutoFocusOnEdit, HiddenSubmitButton, NumericInput, Select} from '../../forms/components';

class MoveNonMOSTStepToPositionForm extends PureComponent {
  render() {
    const {saving, model, insertBehaviors, validationErrors, onSubmit, onFieldChange, primaryInputRef} = this.props;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={saving}>
          <NumericInput id="position" label="Position" value={model.get('position')} maxLength={9}
            onChange={onFieldChange} formValidationErrors={validationErrors} inputRef={primaryInputRef} />
          <Select
            id="insertBehavior"
            label="Insert Behavior"
            value={model.get('insertBehavior')}
            options={insertBehaviors}
            onChange={onFieldChange}
            formValidationErrors={validationErrors} />
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

MoveNonMOSTStepToPositionForm.propTypes = {
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  insertBehaviors: PropTypes.array.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  primaryInputRef: PropTypes.func,
};

export default withAutoFocusOnEdit()(MoveNonMOSTStepToPositionForm);
