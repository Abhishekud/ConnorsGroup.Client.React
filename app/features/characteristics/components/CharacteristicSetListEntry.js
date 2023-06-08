import {Map} from 'immutable';
import {Button} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function CharacteristicSetListEntry({characteristicSet, onEdit, canEdit}) {
  return (
    <div className="characteristic-set-list-entry">
      <span title={characteristicSet.get('name')}>
        {characteristicSet.get('name')}
        {characteristicSet.get('default') ? <small> (default)</small> : null}
      </span>
      {canEdit && <Button bsStyle="link" bsSize="small" onClick={onEdit}>Edit</Button>}
    </div>
  );
}

CharacteristicSetListEntry.propTypes = {
  characteristicSet: PropTypes.instanceOf(Map).isRequired,
  onEdit: PropTypes.func.isRequired,
  canEdit: PropTypes.bool,
};
