import {Button} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function FilterSidebarSectionHeaderActions({onApply, onClear}) {
  return (
    <div className="action-buttons">
      <Button bsStyle="primary" bsSize="small" onClick={onApply}>Apply</Button>
      <Button className="cancel" bsStyle="link" bsSize="small" onClick={onClear}>Clear</Button>
    </div>
  );
}

FilterSidebarSectionHeaderActions.propTypes = {
  onApply: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};
