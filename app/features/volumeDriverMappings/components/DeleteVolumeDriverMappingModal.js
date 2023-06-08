import autoBind from 'react-autobind';
import {
  ConfirmDeleteModal,
  AlertDeleteFailedModal,
} from '../../shared/components';
import {ValidationSummary} from '../../forms/components';
import {connect} from 'react-redux';
import {
  cancelDeleteVolumeDriverMapping,
  deleteVolumeDriverMapping,
  clearSelectedVolumeDriverMapping,
} from '../actions';
import {
  deletingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/delete';
import React, {Component} from 'react';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class DeleteVolumeDriverMappingModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {deleteVolumeDriverMapping, model, clearSelectedVolumeDriverMapping, router, reloadVolumeDriverMappings} = this.props;

    deleteVolumeDriverMapping(model.get('id'))
      .then(response => {
        clearSelectedVolumeDriverMapping();
        reloadVolumeDriverMappings();
        return response;
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to delete the Volume Driver Mapping.', 'Error'));
  }

  render() {
    const {
      handleCancel,
      show,
      deleting,
      validationErrors,
    } = this.props;

    let message;

    if (validationErrors.size === 0) {
      message = (
        <span>
          Please confirm that you want to delete this pair.<br />
          <br />
          This action cannot be undone.
        </span>
      );

      return (
        <ConfirmDeleteModal
          show={show}
          message={message}
          deleting={deleting}
          onCancel={handleCancel}
          onConfirm={this.handleConfirm} />
      );
    }

    message = (
      <ValidationSummary
        dismissable={false}
        message={<span>This pair could not be deleted for the following reasons:</span>}
        errors={validationErrors} />
    );

    return (
      <AlertDeleteFailedModal
        show={show}
        message={message}
        okButtonStyle="default"
        onOk={handleCancel} />
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    deleting: deletingSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelDeleteVolumeDriverMapping,
    deleteVolumeDriverMapping,
    clearSelectedVolumeDriverMapping,
  }
)(DeleteVolumeDriverMappingModal));
