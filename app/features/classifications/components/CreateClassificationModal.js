import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import CreateEditClassificationForm from './CreateEditClassificationForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {
  cancelCreateClassification,
  createClassification,
  selectClassification,
  setCreateClassificationModelProperty,
} from '../actions';
import {fromJS} from 'immutable';
import React, {Component} from 'react';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {CLASSIFICATIONS} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';

class CreateClassificationModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateClassificationModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {createClassification, loadSelectListOptions, selectClassification, model, router} = this.props;

    createClassification(model)
      .then(response => {
        selectClassification(fromJS(response.action.payload.data));
        loadSelectListOptions(CLASSIFICATIONS);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this Classification.', 'Error'));
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors} = this.props;

    const form =
      <CreateEditClassificationForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New Classification"
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
    handleCancel: cancelCreateClassification,
    setCreateClassificationModelProperty,
    createClassification,
    selectClassification,
    loadSelectListOptions,
  }
)(CreateClassificationModal));
