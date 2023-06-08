import React from 'react';
import {Button} from 'react-bootstrap';

export default function ResetLockedColumnsButton({hide, onClear, className}) {
  if (!hide) return null;
  return (
    <Button
      title={'Reset Locked Columns'}
      className={className}
      onClick={onClear}>
      <i className="fa fa-unlock" />
    </Button>
  );
}
