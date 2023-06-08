import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import CreateEditUnitOfMeasureForm from './CreateEditUnitOfMeasureForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {
  cancelCreateUnitOfMeasure,
  createUnitOfMeasure,
  selectUnitOfMeasure,
  setCreateUnitOfMeasureModelProperty,
} from '../actions';
import {fromJS} from 'immutable';
import React, {Component} from 'react';
import {ELEMENT_UNITS_OF_MEASURE} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class CreateUnitOfMeasureModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateUnitOfMeasureModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {createUnitOfMeasure, selectUnitOfMeasure, model, loadSelectListOptions, router} = this.props;

    createUnitOfMeasure(model)
      .then(response => {
        selectUnitOfMeasure(fromJS(response.action.payload.data));
        loadSelectListOptions(ELEMENT_UNITS_OF_MEASURE);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to create this Unit of Measure.', 'Error'));
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors} = this.props;

    const form =
      <CreateEditUnitOfMeasureForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New Unit of Measure"
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

function mapStateToProps(state) {
  return {
    saving: savingSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreateUnitOfMeasure,
    setCreateUnitOfMeasureModelProperty,
    createUnitOfMeasure,
    selectUnitOfMeasure,
    loadSelectListOptions,
  }
)(CreateUnitOfMeasureModal));
