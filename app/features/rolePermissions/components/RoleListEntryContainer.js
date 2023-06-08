import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import RoleListEntry from './RoleListEntry';
import RoleListEntryEditor from './RoleListEntryEditor';
import {
  editRole,
  cancelEditRole,
  setRoleModelProperty,
  updateRole,
  showDeleteRole,
  loadRoleSelectListOptions,
} from '../actions';
import {
  makeEditingRoleSelector,
  makeSavingRoleSelector,
  makeRoleValidationErrorsSelector,
} from '../selectors/sidebars/roles';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {SUPER_ADMIN, BETA_ACCESS} from '../roleConstants';

class RoleListEntryContainer extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleEdit() {
    const {role, editRole} = this.props;
    editRole(role.get('id'));
  }

  handleCancelEdit() {
    const {role, cancelEditRole} = this.props;

    cancelEditRole(role.get('id'));
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    const {role, setRoleModelProperty} = this.props;

    setRoleModelProperty(role.get('id'), name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {role, updateRole, router, loadRoleSelectListOptions} = this.props;

    updateRole(role)
      .then(() => loadRoleSelectListOptions())
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the role.'));
  }

  handleDelete() {
    const {role, showDeleteRole} = this.props;

    showDeleteRole(role);
  }

  render() {
    const {
      role,
      validationErrors,
      pristineRole,

      editing,
      saving,
    } = this.props;

    if (editing) {
      return (
        <RoleListEntryEditor
          role={role}
          validationErrors={validationErrors}
          saving={saving}
          onFieldChange={this.handleFieldChange}
          onSave={this.handleSave}
          onCancel={this.handleCancelEdit}
          onDelete={this.handleDelete} />
      );
    }

    return (
      <RoleListEntry
        role={pristineRole}
        disabled={pristineRole.get('name') === SUPER_ADMIN || pristineRole.get('name') === BETA_ACCESS}
        onEdit={this.handleEdit} />
    );
  }
}

RoleListEntryContainer.propTypes = {
  pristineRole: PropTypes.instanceOf(Map).isRequired,
  role: PropTypes.instanceOf(Map).isRequired,
};

function makeMapStateToProps() {
  const editingSelector = makeEditingRoleSelector();
  const savingSelector = makeSavingRoleSelector();
  const validationErrorsSelector = makeRoleValidationErrorsSelector();

  return (state, ownProps) => ({
    editing: editingSelector(state, ownProps),
    saving: savingSelector(state, ownProps),
    validationErrors: validationErrorsSelector(state, ownProps),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    editRole,
    cancelEditRole,
    setRoleModelProperty,
    updateRole,
    showDeleteRole,
    loadRoleSelectListOptions,
  }
)(RoleListEntryContainer));
