import {Map} from 'immutable';
import {Button} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';
import CreateEditLocationProfileForm from './CreateEditLocationProfileForm';

export default function LocationProfileListEntryEditor({
  locationProfile, editing, saving, validationErrors, departments,
  onFieldChange, onSave, onCancel, onDelete, onAddSelectedItem,
  onRemoveSelectedItem, departmentName, canEdit,
}) {
  return (
    <div className="location-profile-list-entry-editor">
      <CreateEditLocationProfileForm
        model={locationProfile}
        departmentName={departmentName}
        departments={departments}
        onFieldChange={onFieldChange}
        onAddSelectedItem={onAddSelectedItem}
        onRemoveSelectedItem={onRemoveSelectedItem}
        onSubmit={onSave}
        validationErrors={validationErrors}
        saving={saving}
        editing={editing} disabled={!canEdit} />
      <div className="actions">
        <div>
          {canEdit && <Button bsStyle="primary" bsSize="small" disabled={saving} onClick={onSave}>Save</Button>}
          <Button bsStyle="link" bsSize="small" disabled={saving} onClick={onCancel}>Cancel</Button>
        </div>
        {canEdit && <Button bsStyle="default" bsSize="small" disabled={saving} onClick={onDelete}>
          <i className="fa fa-trash-o" title="Delete" />
        </Button>}
      </div>
    </div>
  );
}

LocationProfileListEntryEditor.propTypes = {
  locationProfile: PropTypes.instanceOf(Map).isRequired,
  editing: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  departments: PropTypes.array.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddSelectedItem: PropTypes.func.isRequired,
  onRemoveSelectedItem: PropTypes.func.isRequired,
  canEdit: PropTypes.bool,
};
