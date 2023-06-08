import {Button} from 'react-bootstrap';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function ExportButton({loading, exporting, onClick, disabled}) {
  let exportButtonText;
  if (loading) exportButtonText = 'Loading...';
  else if (exporting) exportButtonText = 'Exporting...';
  else exportButtonText = 'Export';

  return <Button bsStyle="primary" disabled={loading || exporting || disabled} onClick={onClick}>{exportButtonText}</Button>;
}

ExportButton.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  exporting: PropTypes.bool,
  disabled: PropTypes.bool,
};
