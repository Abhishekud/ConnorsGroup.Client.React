import React from 'react';
import {Button} from 'react-bootstrap';

export default function ClearHiddenColumnsButton({hide, onClear, className}) {
  if (!hide) return null;
  return (
    <Button
      title={'Reset Hidden Columns'}
      className={className}
      onClick={onClear}>
      <i className="fa fa-eye" />
    </Button>
  );
}
