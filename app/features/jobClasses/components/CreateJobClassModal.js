import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import CreateEditJobClassForm from './CreateEditJobClassForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {
  cancelCreateJobClass,
  createJobClass,
  selectJobClass,
  setCreateJobClassModelProperty,
} from '../actions';
import {fromJS} from 'immutable';
import React, {Component} from 'react';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {JOB_CLASSES} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';

class CreateJobClassModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateJobClassModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {createJobClass, loadSelectListOptions, selectJobClass, model, router} = this.props;

    createJobClass(model)
      .then(response => {
        selectJobClass(fromJS(response.action.payload.data));
        loadSelectListOptions(JOB_CLASSES);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this Job Class.', 'Error'));
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors} = this.props;

    const form =
      <CreateEditJobClassForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New Job Class"
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
    handleCancel: cancelCreateJobClass,
    setCreateJobClassModelProperty,
    createJobClass,
    selectJobClass,
    loadSelectListOptions,
  }
)(CreateJobClassModal));
