import {Map} from 'immutable';
import {Button} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function AttributeListEntry({attribute, onEdit, hasPermission}) {
  return (
    <div className="attribute-list-entry">
      <span title={attribute.get('name')}>{attribute.get('name')}</span>
      {hasPermission && <Button bsStyle="link" bsSize="small" onClick={onEdit}>Edit</Button>}
    </div>
  );
}

AttributeListEntry.propTypes = {
  attribute: PropTypes.instanceOf(Map).isRequired,
  onEdit: PropTypes.func.isRequired,
  hasPermission: PropTypes.bool,
};
