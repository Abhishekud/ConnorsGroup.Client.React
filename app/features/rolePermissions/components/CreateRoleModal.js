import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import CreateEditRoleForm from './CreateEditRoleForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {permissionOptionsSelector} from '../selectors/pages/list';
import {
  cancelCreateRole,
  createRole,
  setCreateRoleModelProperty,
  loadRoleSelectListOptions,
  loadPermissionOptions,
} from '../actions';
import React, {Component} from 'react';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class CreateRoleModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {loadPermissionOptions} = this.props;
    loadPermissionOptions();
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateRoleModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {createRole, model, router, loadRoleSelectListOptions} = this.props;

    createRole(model)
      .then(() => loadRoleSelectListOptions())
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this Role.', 'Error'));
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors, permissionOptions} = this.props;

    const form =
      <CreateEditRoleForm
        editing
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        permissionOptions={permissionOptions}
        validationErrors={validationErrors}
        model={model} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New Role"
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
    permissionOptions: permissionOptionsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreateRole,
    setCreateRoleModelProperty,
    createRole,
    loadRoleSelectListOptions,
    loadPermissionOptions,
  }
)(CreateRoleModal));
