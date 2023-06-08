import {Map} from 'immutable';
import {Button} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';
import CreateEditRoleForm from './CreateEditRoleForm';

export default function RoleListEntryEditor({
  role, saving, validationErrors, onFieldChange, onSave, onCancel, onDelete,
}) {
  return (
    <div className="role-list-entry-editor">
      <CreateEditRoleForm
        model={role}
        editing
        saving={saving}
        validationErrors={validationErrors}
        onFieldChange={onFieldChange}
        onSubmit={onSave} />
      <div className="actions">
        <Button bsStyle="primary" bsSize="small" disabled={saving} onClick={onSave}>Save</Button>
        <Button bsStyle="link" bsSize="small" disabled={saving} onClick={onCancel}>Cancel</Button>
        <div className="spacer" />
        <Button bsStyle="default" bsSize="small" disabled={saving} onClick={onDelete} className="delete">
          <i className="fa fa-trash-o" title="Delete" />
        </Button>
      </div>
    </div>
  );
}

RoleListEntryEditor.propTypes = {
  role: PropTypes.instanceOf(Map).isRequired,
  saving: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
