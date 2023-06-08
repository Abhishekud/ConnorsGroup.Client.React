import {Map} from 'immutable';
import {Button} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';

const editButtons = (saving, saveText, savingText, onSave, onCancel, editActions) =>
  (<div className="action-buttons">
    <div className="controlled-actions">
      <Button bsStyle="primary" bsSize="small" disabled={saving}
        onClick={onSave}>{saving ? savingText || 'Saving...' : saveText || 'Save'}</Button>
      <Button className="cancel" bsStyle="link" bsSize="small" disabled={saving} onClick={onCancel}>Cancel</Button>
      {editActions}
    </div>
  </div>);

const closeButtons = (saving, onCancel, editActions) =>
  (<div className="action-buttons">
    <div className="controlled-actions">
      <Button bsStyle="primary" bsSize="small" disabled={saving}
        onClick={onCancel}>Close</Button>
      {editActions}
    </div>
  </div>);

export default function BulkEditSidebarSectionHeaderActions({
  workingModel, editing, saving, dirty, saveText, savingText,
  onEdit, onSave, onCancel, nonEditActions, editActions,
}) {
  if (!workingModel.size) return null;

  // We treat the object as dirty if the dirty property is not provided. This is
  // to ensure backwards compatibility.
  if (editing && (dirty || typeof dirty === 'undefined')) {
    return editButtons(saving, saveText, savingText, onSave, onCancel, editActions);
  }

  if (editing && !dirty) {
    return closeButtons(saving, onCancel, editActions);
  }

  return (
    <div className="action-buttons">
      {nonEditActions}
      <Button bsStyle="link" bsSize="small" onClick={onEdit}><strong>edit</strong></Button>
    </div>
  );
}

BulkEditSidebarSectionHeaderActions.propTypes = {
  workingModel: PropTypes.instanceOf(Map).isRequired,
  editing: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  dirty: PropTypes.bool,
  onEdit: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
