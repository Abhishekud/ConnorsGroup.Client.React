import React from 'react';
import {PropTypes} from 'prop-types';

export default function ModalHeader({onClick, disabled}) {
  return (
    <button className="close-button" title="Close" onClick={onClick} data-dismiss="modal" aria-label="Close" disabled={disabled}>
      <span aria-hidden="true">&times;</span>
    </button>
  );
}

ModalHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
