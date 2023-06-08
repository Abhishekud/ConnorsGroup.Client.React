import autoBind from 'react-autobind';
import {
  HiddenSubmitButton,
  TextInput,
  TextArea,
  SelectDropdownWithFilter,
} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {DropdownHeaderComponent, NoElementListComponent} from '../../shared/components';

export default class CreateEstimateStandardElementForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  listNoDataRender() {
    return (<NoElementListComponent />);
  }

  render() {
    const {
      unitOfMeasureOptions,
      model, validationErrors,
      saving,
      onEditFormula,
      onFieldChange, onSubmit,
      timeFormat,
      handleShowCreateUnitOfMeasureModal,
    } = this.props;

    const addOn = (<i className="fa fa-superscript" onClick={onEditFormula} />);
    const dropdownHeaderComponent = <DropdownHeaderComponent onClick={handleShowCreateUnitOfMeasureModal} />;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={saving}>
          <TextInput
            id="name" label="Name" maxLength={256} value={model.get('name')} autoFocus
            onChange={onFieldChange}
            formValidationErrors={validationErrors} />
          <TextInput
            id="frequencyFormula" label="Frequency" maxLength={2048} value={model.get('frequencyFormula')}
            onChange={onFieldChange} addOns={addOn}
            formValidationErrors={validationErrors} />
          <SelectDropdownWithFilter
            aria-required="true"
            label="Unit of Measure"
            id="unitOfMeasureId" formGroupClassName="unit-of-measure"
            disabled={false} name="unitOfMeasureId"
            value={model.get('unitOfMeasureId')} onChange={onFieldChange}
            formValidationErrors={validationErrors}
            options={unitOfMeasureOptions}
            clearButton={false}
            listNoDataRender={this.listNoDataRender}
            onFilterChange={this.handleFilterChange}
            header={dropdownHeaderComponent} />
          <TextInput
            id="measuredTimeMeasurementUnits" label={`Time (${timeFormat})`}
            value={model.get('measuredTimeMeasurementUnits')}
            onChange={onFieldChange}
            formValidationErrors={validationErrors} />
          <TextArea
            id="comment" label="Comment" value={model.get('comment')} maxLength={2048}
            onChange={onFieldChange}
            formValidationErrors={validationErrors} />
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

CreateEstimateStandardElementForm.propTypes = {
  unitOfMeasureOptions: PropTypes.array.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  timeFormat: PropTypes.string.isRequired,
  onEditFormula: PropTypes.func.isRequired,
};
