import CancelButton from './CancelButton';
import {Modal} from 'react-bootstrap';
import {SaveButton} from '../../forms/components';
import React from 'react';
import {PropTypes} from 'prop-types';
import ModalHeader from './ModalHeader';

export default function CreateEditModal({show, title, form, children, onCancel, onSave, loading, saving, disableSave}) {
  return (
    <Modal show={show} backdrop="static" animation={false} enforceFocus={false}>
      <Modal.Header>
        <ModalHeader onClick={onCancel} disabled={loading || saving} />
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {form || children}
      </Modal.Body>
      <Modal.Footer>
        <CancelButton onClick={onCancel} disabled={loading || saving} />
        <SaveButton loading={loading} saving={saving} onClick={onSave} disabled={disableSave} />
      </Modal.Footer>
    </Modal>
  );
}

CreateEditModal.propTypes = {
  form: props => {
    if (((typeof props.children) === 'undefined' || props.children === null) && ((typeof props.form) === 'undefined' || props.form === null)) {
      return new Error('Must provide content for the modal in "form" or "children" properties.');
    }
    return null;
  },
  children: PropTypes.element,
  loading: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  disableSave: PropTypes.bool,
};
