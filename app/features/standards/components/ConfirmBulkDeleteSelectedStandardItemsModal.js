import autoBind from 'react-autobind';
import {
  ConfirmDeleteModal,
  AlertDeleteFailedModal,
} from '../../shared/components';
import {ValidationSummary} from '../../forms/components';
import {connect} from 'react-redux';
import {
  cancelBulkDeleteSelectedStandardItems,
  bulkDeleteSelectedStandardItems,
  loadStandardDetails,
  toggleStandardProfileBulkEditSidebar,
} from '../actions';
import {
  deletingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/bulkDeleteSelectedStandardItems';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {handleApiError} from '../../shared/services';

class ConfirmBulkDeleteSelectedStandardItemsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {bulkDeleteSelectedStandardItems, model, router, loadStandardDetails, handleCancel, toggleStandardProfileBulkEditSidebar} = this.props;

    bulkDeleteSelectedStandardItems(model.get('id'), model.get('selectedElementIds'), model.get('selectedStandardElementGroupIds'))
      .then(response => {
        handleCancel();
        toggleStandardProfileBulkEditSidebar();
        loadStandardDetails(model.get('id'));
        return response;
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to delete the selected standard elements.', 'Error'));
  }

  render() {
    const {
      handleCancel,
      show,
      deleting,
      model,
      validationErrors,
    } = this.props;

    let message;
    if (validationErrors.size === 0) {
      message = (
        <span>
          Please confirm that you want to delete the selected standard items.<br />
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
        message={<span><strong>{model.get('name')}</strong> could not be deleted for the following reasons:</span>}
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
    handleCancel: cancelBulkDeleteSelectedStandardItems,
    bulkDeleteSelectedStandardItems,
    loadStandardDetails,
    toggleStandardProfileBulkEditSidebar,
  }
)(ConfirmBulkDeleteSelectedStandardItemsModal));
