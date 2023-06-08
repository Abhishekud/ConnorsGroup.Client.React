import {Map} from 'immutable';
import {Button} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function VolumeDriverMappingSetListEntry({volumeDriverMappingSet, onEdit, hasPermission}) {
  return (
    <div className="volume-driver-mapping-set-list-entry">
      <span title={volumeDriverMappingSet.get('name')}>
        {volumeDriverMappingSet.get('name')}
      </span>
      {hasPermission && <Button bsStyle="link" bsSize="small" onClick={onEdit}>Edit</Button>}
    </div>
  );
}

VolumeDriverMappingSetListEntry.propTypes = {
  volumeDriverMappingSet: PropTypes.instanceOf(Map).isRequired,
  onEdit: PropTypes.func.isRequired,
  hasPermission: PropTypes.bool,
};
