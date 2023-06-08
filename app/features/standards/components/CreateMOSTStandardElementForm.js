import autoBind from 'react-autobind';
import {
  HiddenSubmitButton,
  TextInput,
  Select,
  TextArea,
  SelectDropdownWithFilter,
} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {mostTypes} from '../../mostAnalysis/constants';
import {DropdownHeaderComponent, NoElementListComponent} from '../../shared/components';

const MOST_TYPE_OPTIONS = mostTypes.ALL.map(mt => ({value: mt, label: mt})).valueSeq().toArray();

export default class CreateMOSTStandardElementForm extends Component {
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
      elementId,
      handleShowCreateUnitOfMeasureModal,
    } = this.props;

    const addOn = (<i className="fa fa-superscript" onClick={onEditFormula} />);
    const dropdownHeaderComponent = <DropdownHeaderComponent onClick={handleShowCreateUnitOfMeasureModal} />;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={saving}>
          <Select
            id="mostType" label="MOST Type" value={model.get('mostType')} autoFocus
            onChange={onFieldChange}
            disabled={elementId}
            options={MOST_TYPE_OPTIONS} />
          <TextInput
            id="name" label="Name" maxLength={256} value={model.get('name')}
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

CreateMOSTStandardElementForm.propTypes = {
  unitOfMeasureOptions: PropTypes.array.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  onEditFormula: PropTypes.func.isRequired,
};
