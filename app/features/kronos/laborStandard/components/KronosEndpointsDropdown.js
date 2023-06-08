import React from 'react';
import {Dropdown, MenuItem} from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import {List} from 'immutable';

function kronosEndpointsDropdown({kronosEndpoints, isSubmitting, onClick}) {
  const handler = id => () => onClick(id);

  if (kronosEndpoints.filter(x => x.get('status') === 'Enabled').count() === 0) return null;

  if (isSubmitting) {
    return (
      <Dropdown id="export" className="btn-default header-button" pullRight disabled>
        <Dropdown.Toggle noCaret><i className="fa fa-spinner fa-spin" title="Submission in progress" /></Dropdown.Toggle>
      </Dropdown>
    );
  }

  return (
    <Dropdown id="export" className="btn-default header-button" pullRight>
      <Dropdown.Toggle noCaret><i className="fa fa-external-link" /></Dropdown.Toggle>
      <Dropdown.Menu>
        {kronosEndpoints.filter(x => x.get('status') === 'Enabled').map((ep, idx) => (<MenuItem key={idx} eventKey={idx} onClick={handler(ep.get('id'))}>{ep.get('name')}</MenuItem>))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

kronosEndpointsDropdown.propTypes = {
  kronosEndpoints: PropTypes.instanceOf(List).isRequired,
  onClick: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default kronosEndpointsDropdown;
