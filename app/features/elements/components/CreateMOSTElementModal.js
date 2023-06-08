import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import {CreateEditModal} from '../../shared/components';
import CreateMOSTElementForm from './CreateMOSTElementForm';
import {
  createMOSTElement,
  cancelCreateMOSTElement,
  setCreateMOSTElementModelProperty,
} from '../actions';
import {
  modelSelector,
  savingSelector,
  validationErrorsSelector,
  showSelector,
} from '../selectors/modals/createMOSTElement';
import {makeSelectListOptionsArrayWithBlankSelector} from '../../selectListOptions/selectors';
import {ELEMENT_UNITS_OF_MEASURE, ELEMENT_ACTIVITIES} from '../../selectListOptions/constants/selectListTypes';
import {handleApiError} from '../../shared/services';

class CreateMOSTElementModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateMOSTElementModelProperty(name, value);
  }

  handleSave() {
    const {model, createMOSTElement, router} = this.props;

    createMOSTElement(model)
      .then(result => router.push(`elements/most/${result.value.data}`))
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this Element.', 'Error'));
  }

  render() {
    const {
      model,
      elementUnitsOfMeasure,
      elementActivities,
      validationErrors,
      saving,
      show,
      handleCancel,
    } = this.props;

    const form =
      <CreateMOSTElementForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model}
        unitsOfMeasure={elementUnitsOfMeasure}
        activities={elementActivities} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New MOST Element"
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
    model: modelSelector(state),
    elementUnitsOfMeasure: elementUnitsOfMeasureSelector(state),
    elementActivities: elementActivitiesSelector(state),
    validationErrors: validationErrorsSelector(state),
    show: showSelector(state),
    saving: savingSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    createMOSTElement,
    handleCancel: cancelCreateMOSTElement,
    setCreateMOSTElementModelProperty,
  }
)(CreateMOSTElementModal));
