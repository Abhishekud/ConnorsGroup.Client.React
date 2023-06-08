import React from 'react';
import {Button} from 'react-bootstrap';

export default function ClearFiltersButton({hide, onClear, className}) {
  if (hide) return null;
  return (
    <Button
      title="Clear All Filters"
      className={className}
      onClick={onClear}>
      <span className="k-icon k-i-filter-clear k-icon-16" />
    </Button>
  );
}
