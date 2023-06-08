import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {elementTypes} from '../../elements/constants';
import {CreateEditModal} from '../../shared/components';
import {handleApiError} from '../../shared/services';
import {departmentIdSelector} from '../selectors/sidebars/standardDetails';
import {makeUnitOfMeasureSelectListOptionsForDepartmentArraySelector} from '../../unitsOfMeasure/selectors/selectListOptions';
import CreateEstimateStandardElementForm from './CreateEstimateStandardElementForm';
import CreateNonMOSTStandardElementForm from './CreateNonMOSTStandardElementForm';
import CreateMOSTStandardElementForm from './CreateMOSTStandardElementForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
  elementIdSelector,
} from '../selectors/modals/createStandardElement';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {
  cancelCreateStandardElement,
  createStandardElement,
  setCreateStandardElementModelProperty,
  showStandardElementFrequencyFormulaModal,
  setAddStandardElementModelProperty,
} from '../actions';
import {frequencyFormulaEditModes} from '../constants';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';

class CreateStandardElementModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateStandardElementModelProperty(name, value);
  }

  handleEditFormula() {
    const {showStandardElementFrequencyFormulaModal, model} = this.props;
    showStandardElementFrequencyFormulaModal(0, model.get('frequencyFormula'), frequencyFormulaEditModes.NEW_STANDARD_ELEMENT_FREQUENCY);
  }

  handleSave(event) {
    event.preventDefault();

    const {createStandardElement, standardId, model, router, elementId, setAddStandardElementModelProperty, addElementById} = this.props;
    if (elementId) {
      if (model.get('unitOfMeasureId') && model.get('name') && model.get('frequencyFormula')) {
        addElementById(elementId, model);
        return;
      }
      const mandatoryFormFields = [
        {field: 'name', value: model.get('name'), message: 'Name is required'},
        {field: 'unitOfMeasureId', value: model.get('unitOfMeasureId'), message: 'Unit of Measure is required'},
        {field: 'frequencyFormula', value: model.get('frequencyFormula'), message: '__invalid__'},
      ];
      for (const formField of mandatoryFormFields) {
        if (formField.value) {
          setAddStandardElementModelProperty(formField.field, formField.value, '');
        } else {
          setAddStandardElementModelProperty(formField.field, formField.value, formField.message);
        }
      }
      return;
    }
    createStandardElement(standardId, model)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this Standard Element.'));
  }

  render() {
    const {
      unitOfMeasureOptions,
      handleCancel,
      saving,
      show,
      validationErrors,
      timeFormat,
      handleShowCreateUnitOfMeasure,
      model,
      elementId,
    } = this.props;
    const elementType = model.get('elementType');

    const formProps = {
      unitOfMeasureOptions,
      saving,
      onFieldChange: this.handleFieldChange,
      onSubmit: this.handleSave,
      validationErrors,
      onEditFormula: this.handleEditFormula,
      model,
      handleShowCreateUnitOfMeasureModal: handleShowCreateUnitOfMeasure,
      elementId,
    };
    let form;

    switch (elementType) {
      case elementTypes.ESTIMATE:
        form = <CreateEstimateStandardElementForm {...formProps} timeFormat={timeFormat} />;
        break;

      case elementTypes.TIMED:
        form = <CreateNonMOSTStandardElementForm {...formProps} />;
        break;

      default:
        form = <CreateMOSTStandardElementForm {...formProps} />;
    }

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title={elementId ? `Add ${elementType}` : `New ${elementType}`}
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

CreateStandardElementModal.propTypes = {
  standardId: PropTypes.number.isRequired,
};

function makeMapStateToProps() {
  return state => {
    const departmentId = departmentIdSelector(state);
    const unitOfMeasureOptions = makeUnitOfMeasureSelectListOptionsForDepartmentArraySelector(state);

    return ({
      saving: savingSelector(state),
      show: showSelector(state),
      model: modelSelector(state),
      validationErrors: validationErrorsSelector(state),
      unitOfMeasureOptions: unitOfMeasureOptions(departmentId),
      timeFormat: timeFormatSelector(state),
      elementId: elementIdSelector(state),
    });
  };
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    handleCancel: cancelCreateStandardElement,
    setCreateStandardElementModelProperty,
    createStandardElement,
    showStandardElementFrequencyFormulaModal,
    setAddStandardElementModelProperty,
  }
)(CreateStandardElementModal));
