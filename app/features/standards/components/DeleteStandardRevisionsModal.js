import autoBind from 'react-autobind';
import {
  ConfirmDeleteModal,
  AlertDeleteFailedModal,
} from '../../shared/components';
import {ValidationSummary} from '../../forms/components';
import {connect} from 'react-redux';
import {
  deleteStandardRevisions,
  cancelDeleteStandardRevisions,
  loadStandardRevisionsList,
  loadStandard,
} from '../actions';
import {
  deletingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/deleteStandardRevisions';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../shared/services';

class DeleteStandardRevisionsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {model, router, deleteStandardRevisions, loadStandardRevisionsList, params, loadStandard} = this.props;
    deleteStandardRevisions(model)
      .then(response => {
        toastr.success('Selected revision(s) has been deleted successfully.');
        loadStandardRevisionsList(model.standardId)
          .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the list of Standard revisions.', 'Error'));
        loadStandard(params.id)
          .catch(error => {
            handleApiError(error, router, 'An error occurred while attempting to load the Standard builder.', 'Error');
          });
        return response;
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to delete the Standard Revision(s).', 'Error'));
  }

  getMessage() {
    const {validationErrors} = this.props;
    let message = (
      <ValidationSummary
        dismissable={false}
        message={<span>Standard Revision(s) could not be deleted for the following reasons:</span>}
        errors={validationErrors} />
    );

    if (validationErrors.size === 0) {
      message = (<span>Please confirm that you want to delete the selected revision(s).<br />
        <br />
        This action cannot be undone.
      </span>
      );
    }
    return message;
  }

  render() {
    const {
      handleCancel,
      show,
      deleting,
      validationErrors,
    } = this.props;

    if (validationErrors.size === 0) {
      return (
        <ConfirmDeleteModal
          show={show}
          message={this.getMessage()}
          deleting={deleting}
          onCancel={handleCancel}
          onConfirm={this.handleConfirm} />
      );
    }

    return (
      <AlertDeleteFailedModal
        show={show}
        message={this.getMessage()}
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
    handleCancel: cancelDeleteStandardRevisions,
    deleteStandardRevisions,
    loadStandardRevisionsList,
    loadStandard,
  }
)(DeleteStandardRevisionsModal));
