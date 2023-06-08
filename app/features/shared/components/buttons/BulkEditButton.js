import React from 'react';
import {Button} from 'react-bootstrap';
import {PropTypes} from 'prop-types';

export default function BulkEditButton({isVisible, isOpen, onClick, disabled}) {
  if (!isVisible) return null;
  return (
    <Button id="bulkEdit" className={`${isOpen ? 'btn-wheat' : 'btn-default'} bulk-edit-toggle header-button`} title="Bulk Edit" onClick={onClick} disabled={disabled}>
      <i className="fa fa-pencil" />
    </Button>
  );
}

BulkEditButton.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
