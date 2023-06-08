import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import CreateEditAttributeForm from './CreateEditAttributeForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
  departmentNameSelector,
} from '../selectors/modals/create';
import {
  cancelCreateAttribute,
  createAttribute,
  setCreateAttributeModelProperty,
  loadAttributeSelectListOptions,
} from '../actions';
import React, {Component} from 'react';
import {ATTRIBUTES} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class CreateAttributeModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateAttributeModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {createAttribute, model, loadSelectListOptions, loadAttributeSelectListOptions, router} = this.props;
    createAttribute(model)
      .then(() => {
        loadSelectListOptions(ATTRIBUTES);
        loadAttributeSelectListOptions();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this Attribute.', 'Error'));
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors, departmentName} = this.props;

    const form =
      <CreateEditAttributeForm
        editing
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title={`New Attribute in ${departmentName}`}
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
    departmentName: departmentNameSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreateAttribute,
    setCreateAttributeModelProperty,
    createAttribute,
    loadSelectListOptions,
    loadAttributeSelectListOptions,
  }
)(CreateAttributeModal));
