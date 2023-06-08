import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import CreateEditLaborCategoryForm from './CreateEditLaborCategoryForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {
  cancelCreateLaborCategory,
  createLaborCategory,
  selectLaborCategory,
  setCreateLaborCategoryModelProperty} from '../actions';
import {fromJS} from 'immutable';
import React, {Component} from 'react';
import {LABOR_CATEGORIES} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class CreateLaborCategoryModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateLaborCategoryModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {createLaborCategory, selectLaborCategory, model, loadSelectListOptions, router} = this.props;

    createLaborCategory(model)
      .then(response => {
        selectLaborCategory(fromJS(response.action.payload.data));
        loadSelectListOptions(LABOR_CATEGORIES);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this Labor Category.', 'Error'));
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors} = this.props;

    const form =
      <CreateEditLaborCategoryForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New Labor Category"
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
    handleCancel: cancelCreateLaborCategory,
    setCreateLaborCategoryModelProperty,
    createLaborCategory,
    selectLaborCategory,
    loadSelectListOptions,
  }
)(CreateLaborCategoryModal));
