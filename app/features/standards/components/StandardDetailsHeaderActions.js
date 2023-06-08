import React from 'react';
import {PropTypes} from 'prop-types';

export default function StandardDetailsHeaderActions({
  editing, saving,
  onEdit, onCancelEdit, onSave,
}) {
  if (editing) {
    return (
      <span className="edit-controls">
        <button className="btn btn-sm" onClick={onSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        <a className="btn btn-sm btn-link" onClick={saving ? null : onCancelEdit} disabled={saving}>Cancel</a>
      </span>
    );
  }

  return <span className="enable-edit"><a className="clickable" onClick={onEdit}>edit</a></span>;
}

StandardDetailsHeaderActions.propTypes = {
  editing: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,

  onEdit: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
