import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {List} from 'immutable';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  setEditUserModelProperty,
  updateUser,
  showDeleteUser,
  closeUsersListEditSidebar,
  showSetUserPassword,
  toggleConfirmAdminUserAccessChangeModal,
  cancelConfirmAdminUserAccessChangeModal,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
  toggleConfirmAdminUserAccessChangeModalSelector,
} from '../selectors/sidebars/edit';
import {
  authenticationMethodSelector,
  emailSelector as currentUserEmailSelector,
  adminRoleValueSelector,
} from '../../authentication/selectors/currentUser';
import CreateEditUserForm from './CreateEditUserForm';
import DeleteUserModal from './DeleteUserModal';
import {handleApiError} from '../../shared/services';
import {APPLICATORS} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';
import {authenticationMethods} from '../../authentication/constants';
import {ADMIN_USERS, SUPER_ADMIN_MANAGE_PERMISSIONS} from '../../authentication/constants/permissions';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {roleSelectListOptionsSelector} from '../../rolePermissions/selectors/selectListOptions';
import {loadIdentity} from '../../authentication/actions';
import {SUPER_ADMIN} from '../../rolePermissions/roleConstants';
import {loadRoleSelectListOptions} from '../../rolePermissions/actions';
import ConfirmAdminUserAccessChangeModal from './ConfirmAdminUserAccessChangeModal';
import {userStatuses} from '../constants';

class UsersListEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCancelConfirmAdminUserAccessChangeModal() {
    const {cancelConfirmAdminUserAccessChangeModal, adminRoleValue} = this.props;
    cancelConfirmAdminUserAccessChangeModal(adminRoleValue);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    let selectedOptions = value;
    if (name === 'roleIds') {
      selectedOptions = List(value.map(v => v.value));
    }

    const {setEditUserModelProperty, toggleConfirmAdminUserAccessChangeModal, model, adminRoleValue} = this.props;
    // Status is disabled and role is admin only
    if ((name === 'status' && value === userStatuses.DISABLED && (model.get('roleIds')).includes(adminRoleValue) || (name === 'roleIds' && (model.get('roleIds')).includes(adminRoleValue) && !selectedOptions.includes(adminRoleValue)))) {
      toggleConfirmAdminUserAccessChangeModal();
    }

    setEditUserModelProperty(name, selectedOptions);
  }

  prepareValuesToShow() {
    const {model, roles} = this.props;
    const values = model.get('roleIds').toJS();
    return roles.filter(role => values.includes(role.value));
  }

  handleSave(event) {
    event.preventDefault();

    const {updateUser, model, loadSelectListOptions, closeUsersListEditSidebar, currentUserEmail, loadIdentity, loadRoleSelectListOptions, router} = this.props;

    updateUser(model)
      .then(() => {
        if (model.get('email') === currentUserEmail) {
          loadIdentity();
          loadRoleSelectListOptions();
        }
        loadSelectListOptions(APPLICATORS);
        closeUsersListEditSidebar();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the user.'));
  }

  handleCancel() {
    this.props.closeUsersListEditSidebar();
  }

  handleSetPassword() {
    const {model, showSetUserPassword} = this.props;
    showSetUserPassword(model);
  }

  handleDelete() {
    const {model, showDeleteUser} = this.props;
    showDeleteUser(model);
  }

  render() {
    const {
      authenticationMethod,
      currentUserEmail,
      canManageRolePermissions,
      show,
      model,
      roles,
      saving,
      validationErrors,
      canManageUsers,
      toggleConfirmAdminUserAccessChangePopUpModal,
      toggleConfirmAdminUserAccessChangeModal,
    } = this.props;

    if (!show) return null;
    const currentUserSelected = model.get('email') === currentUserEmail;

    let missingSuperAdmin = false;
    if (canManageRolePermissions && currentUserSelected) {
      const newRoles = model.get('roleIds');
      const adminRole = roles.find(role => role.label === SUPER_ADMIN);
      if (!newRoles.find(role => role === adminRole.value)) {
        missingSuperAdmin = true;
      }
    }

    return (
      <Sidebar className="users-list-edit-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving}
          onCancel={this.handleCancel} onSave={this.handleSave}
          hasPermission={canManageUsers}
          editActions={
            <div className="edit-actions">
              {authenticationMethod !== authenticationMethods.SSO && canManageUsers &&
                <>
                  <Button bsSize="small" disabled={saving} onClick={this.handleSetPassword}>Set Password</Button>
                  &nbsp;
                </>}
              {canManageUsers && <Button bsSize="small" disabled={saving || currentUserSelected} onClick={this.handleDelete}>
                <i className="fa fa-trash-o" title="Delete" />
              </Button>}
            </div>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection className="user" title="Edit User" collapsible={false}>
            {missingSuperAdmin && <p className="warning">WARNING: Removing {SUPER_ADMIN} will prevent you from managing permissions.</p>}
            <CreateEditUserForm
              currentUserEmail={currentUserEmail}
              model={model}
              roles={roles}
              validationErrors={validationErrors}
              saving={saving}
              onFieldChange={this.handleFieldChange}
              onSubmit={this.handleSave}
              disabled={!canManageUsers}
              prepareValuesToShow={this.prepareValuesToShow()} />
          </SidebarSection>
          <ConfirmAdminUserAccessChangeModal show={toggleConfirmAdminUserAccessChangePopUpModal} onCancel={this.handleCancelConfirmAdminUserAccessChangeModal} onConfirm={toggleConfirmAdminUserAccessChangeModal} processing={false} />
          <DeleteUserModal />
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const canManageUsersSelector = makeCurrentUserHasPermissionSelector(ADMIN_USERS);
  const canManageRolePermissionsSelector = makeCurrentUserHasPermissionSelector(SUPER_ADMIN_MANAGE_PERMISSIONS);
  return {
    authenticationMethod: authenticationMethodSelector(state),
    currentUserEmail: currentUserEmailSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
    canManageUsers: canManageUsersSelector(state),
    roles: roleSelectListOptionsSelector(state),
    canManageRolePermissions: canManageRolePermissionsSelector(state),
    toggleConfirmAdminUserAccessChangePopUpModal: toggleConfirmAdminUserAccessChangeModalSelector(state),
    adminRoleValue: adminRoleValueSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setEditUserModelProperty,
    updateUser,
    showDeleteUser,
    closeUsersListEditSidebar,
    showSetUserPassword,
    loadSelectListOptions,
    loadIdentity,
    loadRoleSelectListOptions,
    toggleConfirmAdminUserAccessChangeModal,
    cancelConfirmAdminUserAccessChangeModal,
  }
)(UsersListEditSidebar));
