import React from 'react';
import {Button} from 'react-bootstrap';
import {PropTypes} from 'prop-types';

export default function DeleteButton({title, isVisible, isOpen, onClick, disabled, className}) {
  if (!isVisible) return null;
  return (
    <Button id="bulkDelete" className={className ? className : `${isOpen ? 'btn-wheat' : 'btn-default'} bulk-edit-toggle header-button`}
      title={title} onClick={onClick} disabled={disabled}>
      <i className="fa fa-trash-o" />
    </Button>
  );
}

DeleteButton.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
};
