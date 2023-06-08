import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import {ADMIN_USERS} from '../../authentication/constants/permissions';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import CreateEditUserForm from './CreateEditUserForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {
  cancelCreateUser,
  createUser,
  selectUser,
  setCreateUserModelProperty,
} from '../actions';
import {fromJS, List, Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {APPLICATORS} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {roleSelectListOptionsSelector} from '../../rolePermissions/selectors/selectListOptions';

class CreateUserModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  prepareValuesToShow() {
    const {roles, model} = this.props;
    const values = model.get('roleIds')?.toJS();
    return roles.filter(role => values?.includes(role.value));
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    let selectedOptions = value;
    if (name === 'roleIds') {
      selectedOptions = List(value.map(v => v.value));
    }

    this.props.setCreateUserModelProperty(name, selectedOptions);
  }

  handleSave(event) {
    event.preventDefault();

    const {createUser, selectUser, loadSelectListOptions, model, router} = this.props;
    createUser(model)
      .then(response => {
        selectUser(fromJS(response.action.payload.data));
        loadSelectListOptions(APPLICATORS);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this User.', 'Error'));
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors, canManageUsers, roles} = this.props;

    const form =
      <CreateEditUserForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        roles={roles}
        model={model}
        prepareValuesToShow={this.prepareValuesToShow()} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New User"
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave}
        disableSave={!canManageUsers} />
    );
  }
}

CreateUserModal.propTypes = {
  handleCancel: PropTypes.func,
  setCreateUserModelProperty: PropTypes.func,
  createUser: PropTypes.func,
  saving: PropTypes.bool,
  show: PropTypes.bool,
  model: PropTypes.instanceOf(Map),
  validationErrors: PropTypes.instanceOf(Map),
  roles: PropTypes.array,
};

function mapStateToProps(state) {
  const canManageUsersSelector = makeCurrentUserHasPermissionSelector(ADMIN_USERS);
  return {
    saving: savingSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    canManageUsers: canManageUsersSelector(state),
    roles: roleSelectListOptionsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreateUser,
    setCreateUserModelProperty,
    createUser,
    selectUser,
    loadSelectListOptions,
  }
)(CreateUserModal));
