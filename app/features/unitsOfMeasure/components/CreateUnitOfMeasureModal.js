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
  loadUnitOfMeasureSelectListOptions,
} from '../actions';
import {fromJS} from 'immutable';
import React, {Component} from 'react';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {ACTIVE_STATUSES} from '../../selectListOptions/constants/selectListTypes';

class CreateUnitOfMeasureModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {disableActiveStatus, setCreateUnitOfMeasureModelProperty} = this.props;
    const {name, value} = event.target;
    if (disableActiveStatus && name === 'status') {
      return;
    }
    setCreateUnitOfMeasureModelProperty(name, value);
  }

  handleCancel() {
    const {showChildModal, handleCancel} = this.props;
    if (showChildModal) {
      showChildModal();
    }
    handleCancel();
  }

  handleSave(event) {
    event.preventDefault();

    const {createUnitOfMeasure, selectUnitOfMeasure, model, loadUnitOfMeasureSelectListOptions, router, handleToggleCreateUnitOfMeasure, showChildModal} = this.props;

    createUnitOfMeasure(model)
      .then(response => {
        if (showChildModal) {
          showChildModal();
        }
        if (handleToggleCreateUnitOfMeasure) {
          handleToggleCreateUnitOfMeasure(response.action.payload.data);
        } else {
          selectUnitOfMeasure(fromJS(response.action.payload.data));
          loadUnitOfMeasureSelectListOptions();
        }
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this Unit of Measure.', 'Error'));
  }

  render() {
    const {saving, show, model, activeStatuses, validationErrors, disableActiveStatus} = this.props;

    const form =
      <CreateEditUnitOfMeasureForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model}
        activeStatuses={activeStatuses}
        disableActiveStatus={disableActiveStatus} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New Unit of Measure"
        form={form}
        onCancel={this.handleCancel}
        onSave={this.handleSave} />
    );
  }
}

function mapStateToProps(state) {
  const activeStatusesSelector = makeSelectListOptionsArraySelector(ACTIVE_STATUSES);

  return {
    saving: savingSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    activeStatuses: activeStatusesSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreateUnitOfMeasure,
    setCreateUnitOfMeasureModelProperty,
    createUnitOfMeasure,
    selectUnitOfMeasure,
    loadUnitOfMeasureSelectListOptions,
  }
)(CreateUnitOfMeasureModal));
