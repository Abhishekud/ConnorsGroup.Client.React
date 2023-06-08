import {Map} from 'immutable';
import {Button} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';
import EditCharacteristicSetForm from './EditCharacteristicSetForm';

export default function CharacteristicSetListEntryEditor({
  characteristicSet, saving, validationErrors, defaultSet,
  onFieldChange, onSave, onCancel, onDelete,
}) {
  return (
    <div className="characteristic-set-list-entry-editor">
      <EditCharacteristicSetForm
        model={characteristicSet}
        defaultSet={defaultSet}
        saving={saving}
        validationErrors={validationErrors}
        onFieldChange={onFieldChange}
        onSubmit={onSave} />
      <div className="actions">
        <div>
          <Button bsStyle="primary" bsSize="small" disabled={saving} onClick={onSave}>Save</Button>
          <Button bsStyle="link" bsSize="small" disabled={saving} onClick={onCancel}>Cancel</Button>
        </div>
        <Button bsStyle="default" bsSize="small" disabled={saving} onClick={onDelete}>
          <i className="fa fa-trash-o" title="Delete" />
        </Button>
      </div>
    </div>
  );
}

CharacteristicSetListEntryEditor.propTypes = {
  characteristicSet: PropTypes.instanceOf(Map).isRequired,
  saving: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  defaultSet: PropTypes.bool.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
