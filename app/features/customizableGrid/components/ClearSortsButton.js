import React from 'react';
import {Button} from 'react-bootstrap';

export default function ClearSortsButton({hide, onClear, className}) {
  if (hide) return null;
  return (
    <Button
      className={className}
      onClick={onClear}>
      <span>Unsort</span>
    </Button>
  );
}
