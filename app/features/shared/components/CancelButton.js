import {Button} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function CancelButton({disabled, onClick}) {
  return <Button disabled={disabled} onClick={onClick}>Cancel</Button>;
}

CancelButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
