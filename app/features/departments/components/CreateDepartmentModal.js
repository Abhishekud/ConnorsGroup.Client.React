import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import CreateEditDepartmentForm from './CreateEditDepartmentForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {
  cancelCreateDepartment,
  createDepartment,
  selectDepartment,
  setCreateDepartmentModelProperty,
} from '../actions';
import {fromJS} from 'immutable';
import React, {Component} from 'react';
import {DEPARTMENTS} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {
  departmentNameSelector,
} from '../../shared/selectors/components/settings';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class CreateDepartmentModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateDepartmentModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {createDepartment, selectDepartment, departmentName, model, loadSelectListOptions, router} = this.props;

    createDepartment(model)
      .then(response => {
        selectDepartment(fromJS(response.action.payload.data));
        loadSelectListOptions(DEPARTMENTS);
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to add this ${departmentName}.`, 'Error'));
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors, departmentName} = this.props;

    const form =
      <CreateEditDepartmentForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title={`New ${departmentName}`}
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
    handleCancel: cancelCreateDepartment,
    setCreateDepartmentModelProperty,
    createDepartment,
    selectDepartment,
    loadSelectListOptions,
  }
)(CreateDepartmentModal));
