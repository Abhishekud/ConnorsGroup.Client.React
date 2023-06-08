import {Map} from 'immutable';
import {Button} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function LocationProfileListEntry({locationProfile, onEdit, canEdit}) {
  return (
    <div className="location-profile-list-entry">
      <span title={locationProfile.get('name')}>
        {locationProfile.get('name')}
      </span>
      <Button bsStyle="link" bsSize="small" onClick={onEdit}>{canEdit ? 'Edit' : 'View'}</Button>
    </div>
  );
}

LocationProfileListEntry.propTypes = {
  locationProfile: PropTypes.instanceOf(Map).isRequired,
  onEdit: PropTypes.func.isRequired,
  canEdit: PropTypes.bool,
};
