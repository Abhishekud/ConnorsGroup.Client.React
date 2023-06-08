import autoBind from 'react-autobind';
import {
  HiddenSubmitButton,
  TextArea,
  TextInput,
  Select,
  withAutoFocusOnEdit,
} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class CreateNonMOSTElementForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model, validationErrors,
      editing, saving,
      onFieldChange, onSubmit,
      primaryInputRef,
      unitsOfMeasure,
      activities,
    } = this.props;

    return (
      <form onSubmit={onSubmit} className="edit-element-header-form">
        <fieldset disabled={saving || !editing}>
          <TextInput
            id="name" label="Name" maxLength={256} value={model.get('name')}
            onChange={onFieldChange}
            inputRef={primaryInputRef}
            formValidationErrors={validationErrors} />
          <Select
            id="elementUnitOfMeasureId" label="Unit Of Measure" value={model.get('elementUnitOfMeasureId')}
            onChange={onFieldChange}
            options={unitsOfMeasure}
            formValidationErrors={validationErrors} />
          <Select
            id="elementActivityId" label="Activity" value={model.get('elementActivityId')}
            onChange={onFieldChange}
            options={activities}
            formValidationErrors={validationErrors} />
          <TextArea id="applicatorInstructions" label="Applicator Instructions" rows={5}
            onChange={onFieldChange} value={model.get('applicatorInstructions')}
            formValidationErrors={validationErrors} />
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

CreateNonMOSTElementForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  primaryInputRef: PropTypes.func,
  unitsOfMeasure: PropTypes.array.isRequired,
  activities: PropTypes.array.isRequired,
};

export default withAutoFocusOnEdit()(CreateNonMOSTElementForm);
