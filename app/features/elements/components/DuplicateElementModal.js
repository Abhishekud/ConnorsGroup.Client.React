import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {CreateEditModal} from '../../shared/components';
import {handleApiError} from '../../shared/services';
import {makeSelectListOptionsArrayWithBlankSelector} from '../../selectListOptions/selectors';
import {ELEMENT_UNITS_OF_MEASURE, ELEMENT_ACTIVITIES} from '../../selectListOptions/constants/selectListTypes';
import {
  cancelDuplicateElement,
  setDuplicateElementModelProperty,
  duplicateElement,
  loadMOSTElement,
  loadNonMOSTElement,
} from '../actions';
import {
  savingSelector,
  showSelector,
  modelSelector,
  elementTypeSelector,
  validationErrorsSelector,
} from '../selectors/modals/duplicate';
import DuplicateElementForm from './DuplicateElementForm';
import {elementTypes} from '../constants';

class DuplicateElementModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setDuplicateElementModelProperty(name, value);
  }

  handleSave() {
    const {duplicateElement, model, elementType, router} = this.props;

    duplicateElement(model)
      .then(result => {
        if (elementType === elementTypes.MOST) {
          router.push(`/elements/most/${result.value.data}`);
          this.props.loadMOSTElement(result.value.data);
        } else {
          router.push(`/elements/non-most/${result.value.data}`);
          this.props.loadNonMOSTElement(result.value.data);
        }
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to duplicate this Element.'));
  }

  render() {
    const {
      handleCancel,
      saving,
      show,
      model,
      validationErrors,
      elementUnitsOfMeasure,
      elementActivities,
    } = this.props;

    const form =
      <DuplicateElementForm
        editing
        model={model}
        saving={saving}
        validationErrors={validationErrors}
        unitsOfMeasure={elementUnitsOfMeasure}
        activities={elementActivities}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="Duplicate Element"
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

function mapStateToProps(state) {
  const elementUnitsOfMeasureSelector = makeSelectListOptionsArrayWithBlankSelector(ELEMENT_UNITS_OF_MEASURE);
  const elementActivitiesSelector = makeSelectListOptionsArrayWithBlankSelector(ELEMENT_ACTIVITIES);

  return {
    saving: savingSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    elementType: elementTypeSelector(state),
    validationErrors: validationErrorsSelector(state),
    elementUnitsOfMeasure: elementUnitsOfMeasureSelector(state),
    elementActivities: elementActivitiesSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelDuplicateElement,
    setDuplicateElementModelProperty,
    duplicateElement,
    loadMOSTElement,
    loadNonMOSTElement,
  }
)(DuplicateElementModal));
