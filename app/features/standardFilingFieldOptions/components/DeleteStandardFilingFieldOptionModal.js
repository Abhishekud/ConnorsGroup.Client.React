import autoBind from 'react-autobind';
import {
  ConfirmDeleteModal,
  AlertDeleteFailedModal,
} from '../../shared/components';
import {ValidationSummary} from '../../forms/components';
import {connect} from 'react-redux';
import {
  cancelDeleteStandardFilingFieldOption,
  deleteStandardFilingFieldOption,
  clearSelectedStandardFilingFieldOption,
} from '../actions';
import {
  deletingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
  standardFilingFieldIdSelector,
} from '../selectors/modals/delete';
import React, {Component} from 'react';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class DeleteStandardFilingFieldOptionModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {
      deleteStandardFilingFieldOption,
      standardFilingFieldId,
      clearSelectedStandardFilingFieldOption,
      model,
      router,
    } = this.props;

    deleteStandardFilingFieldOption(standardFilingFieldId, model.get('id'))
      .then(response => {
        clearSelectedStandardFilingFieldOption();
        return response;
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to delete the Standard Filing Field Option.', 'Error'));
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
          Please confirm that you want to delete <strong>{model.get('value')}</strong>.<br />
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
        message={<span><strong>{model.get('value')}</strong> could not be deleted for the following reasons:</span>}
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
    standardFilingFieldId: standardFilingFieldIdSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelDeleteStandardFilingFieldOption,
    deleteStandardFilingFieldOption,
    clearSelectedStandardFilingFieldOption,
  }
)(DeleteStandardFilingFieldOptionModal));
