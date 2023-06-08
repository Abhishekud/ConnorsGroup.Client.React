import React from 'react';
import {Button} from 'react-bootstrap';

export default function ClearGridConfigurationButton({hide, onClear}) {
  if (hide) return null;
  return (
    <Button
      title="Clear Grid Configuration"
      onClick={onClear}>
      <i className="fa fa-undo" />
    </Button>
  );
}
