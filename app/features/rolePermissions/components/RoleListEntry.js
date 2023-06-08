import {Map} from 'immutable';
import {Button} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';
import pluralize from 'pluralize';

export default function RoleListEntry({role, onEdit, disabled}) {
  return (
    <div className="role-list-entry">
      <div className="role-list-entry_header">
        <span title={role.get('name')}>{role.get('name')}</span>
        {!disabled && <Button bsStyle="link" bsSize="small" onClick={onEdit}>Edit</Button>}
      </div>
      <div title={role.get('description')}>{role.get('description')}</div>
      <div className="role-list-entry_users"><strong>{role.get('userCount')}</strong> {pluralize('user', role.get('userCount'))} with this role</div>
    </div>
  );
}

RoleListEntry.propTypes = {
  role: PropTypes.instanceOf(Map).isRequired,
  onEdit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
