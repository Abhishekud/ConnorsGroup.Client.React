import CancelButton from './CancelButton';
import {Modal} from 'react-bootstrap';
import {ExportButton} from '../../forms/components';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function ExportModal({show, title, form, onCancel, onExport, loading, exporting, disabled}) {
  return (
    <Modal show={show} backdrop="static" animation={false}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {form}
      </Modal.Body>
      <Modal.Footer>
        <CancelButton onClick={onCancel} disabled={loading || exporting} />
        <ExportButton loading={loading} exporting={exporting} disabled={disabled} onClick={onExport} />
      </Modal.Footer>
    </Modal>
  );
}

ExportModal.propTypes = {
  form: PropTypes.element.isRequired,
  loading: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
  exporting: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
};
