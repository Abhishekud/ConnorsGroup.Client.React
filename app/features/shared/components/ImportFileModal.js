import React from 'react';
import {PropTypes} from 'prop-types';
import {Modal} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import CancelButton from './CancelButton';
import ModalHeader from './ModalHeader';

export default function ImportFileModal({show, saving, title, body, faIcon, onFileSelected, onCancel}) {
  return (
    <Modal show={show} className="import-file-modal" backdrop="static" animation={false}>
      <Modal.Header>
        <ModalHeader onClick={onCancel} disabled={saving} />
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!saving && <Dropzone onDrop={onFileSelected} multiple={false} disabled={saving}>
          {({getRootProps, getInputProps}) => (
            <div {...getRootProps()} className="file-dropzone">
              <input {...getInputProps()} />
              <i className={`fa ${faIcon} fa-lg side`} /><i className={`fa ${faIcon} fa-3x`} /><i className={`fa ${faIcon} fa-lg side`} />
              {body}
            </div>
          )}
        </Dropzone>}
        {saving && <div>
          <i className="fa fa-spinner fa-spin" title="Processing" />&nbsp;Please wait.  This operation could take some time to complete...
        </div>}
      </Modal.Body>
      <Modal.Footer>
        <CancelButton onClick={onCancel} disabled={saving} />
      </Modal.Footer>
    </Modal>
  );
}

ImportFileModal.propTypes = {
  show: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.object.isRequired,
  faIcon: PropTypes.string.isRequired,
  onFileSelected: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
