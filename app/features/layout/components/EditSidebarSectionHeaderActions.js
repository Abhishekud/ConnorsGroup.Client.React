import {Map} from 'immutable';
import {Button} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';

const editButtons = (disabled, hasPermission, saving, saveText, savingText, onSave, onCancel, editActions) =>
  (<div className="action-buttons">
    <div className="controlled-actions">
      {hasPermission && <Button bsStyle="primary" bsSize="small" disabled={disabled || saving}
        onClick={onSave}>{saving ? savingText || 'Saving...' : saveText || 'Save'}</Button>}
      <Button className="cancel" bsStyle="link" bsSize="small" disabled={saving} onClick={onCancel}>Cancel</Button>
      {editActions}
    </div>
  </div>);

const editCharacteristicsButtons = (disabled, hasPermission, saving, saveText, savingText, onSave, onCancel, editActions, inactiveUpdate, status) =>
  (<div className="action-buttons">
    <div className="controlled-actions">
      {hasPermission && <Button bsStyle="primary" bsSize="small" disabled={disabled || saving || (inactiveUpdate && status)}
        onClick={onSave}>{saving ? savingText || 'Saving...' : saveText || 'Save'}</Button>}
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

export default function EditSidebarSectionHeaderActions({
  workingModel, editing, saving, dirty, saveText, savingText, disabled, hasPermission,
  onEdit, onSave, onCancel, nonEditActions, editActions, focusOnCharacteristicSetId, inactiveUpdate,
}) {
  if (!workingModel.size) return null;
  const permissionGranted = hasPermission || typeof hasPermission === 'undefined';

  // We treat the object as dirty if the dirty property is not provided. This is
  // to ensure backwards compatibility.
  if (focusOnCharacteristicSetId) {
    if (editing && (dirty || typeof dirty === 'undefined')) {
      const model = workingModel.get(focusOnCharacteristicSetId);
      const status = !(model.get('updateStatus') && (model.get('status') === 'Active'));
      return editCharacteristicsButtons(disabled, permissionGranted, saving, saveText, savingText, onSave, onCancel, editActions, status, inactiveUpdate);
    }
  }

  if (editing && (dirty || typeof dirty === 'undefined')) {
    return editButtons(disabled, permissionGranted, saving, saveText, savingText, onSave, onCancel, editActions);
  }

  if (editing && !dirty) {
    return closeButtons(saving, onCancel, editActions);
  }

  if (nonEditActions || permissionGranted) {
    return (
      <div className="action-buttons">
        {nonEditActions}
        {permissionGranted && <Button bsStyle="link" bsSize="small" onClick={onEdit} disabled={disabled}><strong>edit</strong></Button>}
      </div>
    );
  }
  return <div className="action-buttons-none" />;
}

EditSidebarSectionHeaderActions.propTypes = {
  workingModel: PropTypes.instanceOf(Map).isRequired,
  editing: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  dirty: PropTypes.bool,
  inactiveUpdate: PropTypes.bool,
  focusOnCharacteristicSetId: PropTypes.number,
  onEdit: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  hasPermission: PropTypes.bool,
};
