import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {Map} from 'immutable';
import {HiddenSubmitButton, Select} from '../../forms/components';

export default class PromoteToListElementForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      model,
      unitsOfMeasure,
      activities,
      validationErrors,
      saving,
      onFieldChange,
      onSubmit,
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={saving}>
          <Select
            id="elementUnitOfMeasureId" label="Unit of Measure" value={model.get('elementUnitOfMeasureId')}
            onChange={onFieldChange} options={unitsOfMeasure} formValidationErrors={validationErrors} />
          <Select
            id="elementActivityId" label="Activity" value={model.get('elementActivityId')}
            onChange={onFieldChange} options={activities} formValidationErrors={validationErrors} />
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

PromoteToListElementForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
  unitsOfMeasure: PropTypes.array.isRequired,
  activities: PropTypes.array.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  saving: PropTypes.bool.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
