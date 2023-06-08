import {Map} from 'immutable';
import {Button} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';
import EditVolumeDriverMappingSetForm from './EditVolumeDriverMappingSetForm';

export default function VolumeDriverMappingSetListEntryEditor({
  volumeDriverMappingSet, saving, validationErrors,
  onFieldChange, onSave, onCancel, onDelete, canCreate, canUpdate,
}) {
  return (
    <div className="volume-driver-mapping-set-list-entry-editor">
      <EditVolumeDriverMappingSetForm
        model={volumeDriverMappingSet}
        saving={saving}
        disabled={!canUpdate}
        validationErrors={validationErrors}
        onFieldChange={onFieldChange}
        onSubmit={onSave} />
      <div className="actions">
        <div>
          {canUpdate && <Button bsStyle="primary" bsSize="small" onClick={onSave}>Save</Button>}
          <Button bsStyle="link" bsSize="small" onClick={onCancel}>Cancel</Button>
        </div>
        {canCreate && <Button bsStyle="default" bsSize="small" onClick={onDelete}>
          <i className="fa fa-trash-o" title="Delete" />
        </Button>}
      </div>
    </div>
  );
}

VolumeDriverMappingSetListEntryEditor.propTypes = {
  volumeDriverMappingSet: PropTypes.instanceOf(Map).isRequired,
  saving: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  canCreate: PropTypes.bool,
  canUpdate: PropTypes.bool,
};
