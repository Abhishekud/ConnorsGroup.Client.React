import autoBind from 'react-autobind';
import {HiddenSubmitButton, TextArea, TextInput, Select, withAutoFocusOnEdit} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {mostTypes} from '../../mostAnalysis/constants';

const MOST_TYPE_OPTIONS = mostTypes.ALL.map(mat => ({value: mat, label: mat})).valueSeq().toArray();

class CreateEditMOSTElementForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model, validationErrors,
      saving,
      onFieldChange, onSubmit,
      primaryInputRef,
      unitsOfMeasure,
      activities,
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={saving}>
          <Select id="mostType" label="MOST Type"
            value={model.get('mostType')} options={MOST_TYPE_OPTIONS}
            onChange={onFieldChange}
            inputRef={primaryInputRef}
            formValidationErrors={validationErrors} />
          <TextInput
            id="name" label="Name" maxLength={256} value={model.get('name')}
            onChange={onFieldChange}
            formValidationErrors={validationErrors} />
          <Select id="elementUnitOfMeasureId" label="Unit Of Measure" value={model.get('elementUnitOfMeasureId')}
            onChange={onFieldChange}
            options={unitsOfMeasure}
            formValidationErrors={validationErrors} />
          <Select id="elementActivityId" label="Activity" value={model.get('elementActivityId')}
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

CreateEditMOSTElementForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  primaryInputRef: PropTypes.func,
  unitsOfMeasure: PropTypes.array.isRequired,
  activities: PropTypes.array.isRequired,
};

export default withAutoFocusOnEdit()(CreateEditMOSTElementForm);
