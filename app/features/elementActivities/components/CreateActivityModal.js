import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import CreateEditActivityForm from './CreateEditActivityForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {
  cancelCreateActivity,
  createActivity,
  selectActivity,
  setCreateActivityModelProperty} from '../actions';
import {fromJS} from 'immutable';
import React, {Component} from 'react';
import {ELEMENT_ACTIVITIES} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class CreateActivityModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateActivityModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {createActivity, selectActivity, model, loadSelectListOptions, router} = this.props;

    createActivity(model)
      .then(response => {
        selectActivity(fromJS(response.action.payload.data));
        loadSelectListOptions(ELEMENT_ACTIVITIES);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to create this Activity.', 'Error'));
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors} = this.props;

    const form =
      <CreateEditActivityForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New Activity"
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
    handleCancel: cancelCreateActivity,
    setCreateActivityModelProperty,
    createActivity,
    selectActivity,
    loadSelectListOptions,
  }
)(CreateActivityModal));
