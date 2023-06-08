import {Map} from 'immutable';
import {Button} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';
import CreateEditAttributeForm from './CreateEditAttributeForm';

export default function AttributeListEntryEditor({
  attribute, saving, validationErrors,
  onFieldChange, onSave, onCancel, onDelete, departmentName,
  departments, canCreate, canUpdate,
}) {
  return (
    <div className="attribute-list-entry-editor">
      <CreateEditAttributeForm
        model={attribute}
        disabled={!canUpdate}
        editing
        saving={saving}
        validationErrors={validationErrors}
        onFieldChange={onFieldChange}
        onSubmit={onSave}
        departmentName={departmentName}
        departments={departments} />
      <div className="actions">
        {canUpdate && <Button bsStyle="primary" bsSize="small" disabled={saving} onClick={onSave}>Save</Button>}
        <Button bsStyle="link" bsSize="small" disabled={saving} onClick={onCancel}>Cancel</Button>
        <div className="spacer" />
        {canCreate && <Button bsStyle="default" bsSize="small" disabled={saving} onClick={onDelete} className="delete">
          <i className="fa fa-trash-o" title="Delete" />
        </Button>}
      </div>
    </div>
  );
}

AttributeListEntryEditor.propTypes = {
  departments: PropTypes.array.isRequired,
  attribute: PropTypes.instanceOf(Map).isRequired,
  canCreate: PropTypes.bool,
  canUpdate: PropTypes.bool,
  saving: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
