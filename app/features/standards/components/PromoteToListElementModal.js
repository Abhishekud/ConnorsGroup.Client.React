import React, {Component} from 'react';
import {withRouter} from 'react-router';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  promoteToListElement,
  cancelPromoteToListElement,
  setPromoteToListElementModelProperty,
} from '../actions';
import {
  showSelector,
  savingSelector,
  modelSelector,
  validationErrorsSelector,
  standardIdSelector,
  standardElementIdSelector,
} from '../selectors/modals/promoteToListElement';
import {CreateEditModal} from '../../shared/components';
import PromoteToListElementForm from './PromoteToListElementForm';
import {ELEMENT_UNITS_OF_MEASURE, ELEMENT_ACTIVITIES} from '../../selectListOptions/constants/selectListTypes';
import {makeSelectListOptionsArrayWithBlankSelector} from '../../selectListOptions/selectors';
import {handleApiError} from '../../shared/services';
import {DEFAULT_ELEMENT_UNIT_OF_MEASURE} from '../constants/defaultSelections';

class PromoteToListElementModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setPromoteToListElementModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {router, standardId, standardElementId, model} = this.props;

    this.props.promoteToListElement(standardId, standardElementId, model)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to promote this Standard Element.'));
  }

  render() {
    const {
      show,
      saving,
      model,
      elementUnitsOfMeasure,
      elementActivities,
      validationErrors,
      handleCancel,
    } = this.props;

    if (show && !model.get('elementUnitOfMeasureId') && elementUnitsOfMeasure.length) {
      setTimeout(() => {
        const defaultUOM = elementUnitsOfMeasure.filter(uom => uom.label === DEFAULT_ELEMENT_UNIT_OF_MEASURE)[0];
        const value = (defaultUOM === null) ? null : defaultUOM.value;

        this.handleFieldChange({target: {name: 'elementUnitOfMeasureId', value}});
      });
    }

    const form =
      <PromoteToListElementForm
        saving={saving}
        model={model}
        unitsOfMeasure={elementUnitsOfMeasure}
        activities={elementActivities}
        validationErrors={validationErrors}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="Promote to Element"
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

function makeMapStateToProps() {
  const elementUnitsOfMeasureSelector = makeSelectListOptionsArrayWithBlankSelector(ELEMENT_UNITS_OF_MEASURE);
  const elementActivitiesSelector = makeSelectListOptionsArrayWithBlankSelector(ELEMENT_ACTIVITIES);

  return state => ({
    show: showSelector(state),
    saving: savingSelector(state),
    model: modelSelector(state),
    elementUnitsOfMeasure: elementUnitsOfMeasureSelector(state),
    elementActivities: elementActivitiesSelector(state),
    validationErrors: validationErrorsSelector(state),
    standardId: standardIdSelector(state),
    standardElementId: standardElementIdSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    promoteToListElement,
    handleCancel: cancelPromoteToListElement,
    setPromoteToListElementModelProperty,
  }
)(PromoteToListElementModal));
