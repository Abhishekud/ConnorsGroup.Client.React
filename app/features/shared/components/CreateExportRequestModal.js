import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import CancelButton from './CancelButton';
import {Button, Modal} from 'react-bootstrap';
import CreateExportRequestForm from './CreateExportRequestForm';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {handleApiError} from '../../shared/services';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/createExportRequest';
import {
  setCreateExportRequestModelProperty,
  cancelCreateExportRequest,
  createExportRequest,
} from '../actions';
import {withRouter} from 'react-router';

class CreateExportRequestModal extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(e) {
    const {name, value} = e.target;
    this.props.setCreateExportRequestModelProperty(name, value);
  }

  handleSave(e) {
    e.preventDefault();

    const {model, createExportRequest, onExportRequestCreated, router} = this.props;

    createExportRequest(model)
      .then(response => onExportRequestCreated(response.action.payload.data))
      .catch(e => handleApiError(e, router, 'An error occurred while initializing the export'));
  }

  render() {
    const {show, title, model, validationErrors, saving, handleCancel} = this.props;

    return (
      <Modal show={show} backdrop="static" animation={false}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateExportRequestForm
            saving={saving}
            model={model}
            validationErrors={validationErrors}
            onSubmit={this.handleSave}
            onFieldChange={this.handleFieldChange} />
        </Modal.Body>
        <Modal.Footer>
          <CancelButton onClick={handleCancel} disabled={saving} />
          <Button bsStyle="primary" disabled={saving} onClick={this.handleSave}>{saving ? 'Processing...' : 'Export'}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CreateExportRequestModal.propTypes = {
  title: PropTypes.string.isRequired,
  onExportRequestCreated: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    saving: savingSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setCreateExportRequestModelProperty,
    handleCancel: cancelCreateExportRequest,
    createExportRequest,
  }
)(CreateExportRequestModal));
