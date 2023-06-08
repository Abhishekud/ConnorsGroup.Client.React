import autoBind from 'react-autobind';
import {
  ConfirmDeleteModal,
  AlertDeleteFailedModal,
} from '../../shared/components';
import {ValidationSummary} from '../../forms/components';
import {connect} from 'react-redux';
import {
  cancelDeleteSelectedStandards,
  deleteStandards,
  loadStandardsList,
} from '../actions';
import {
  deletingSelector,
  showSelector,
  validationErrorsSelector,
} from '../selectors/modals/deleteSelectedStandards';
import {selectedStandardIdsSelector} from '../selectors/pages/list';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {handleApiError} from '../../shared/services';
import {modelSelector as standardsListFiltersModelSelector} from '../../standards/selectors/sidebars/filters';

class DeleteSelectedStandardsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {deleteStandards, router, loadStandardsList, standardListFilters, selectedStandardIds} = this.props;

    deleteStandards(selectedStandardIds)
      .then(response => {
        loadStandardsList(standardListFilters);
        return response;
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to delete the selected Standards.', 'Error'));
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
          Please confirm that you want to delete the selected Standards.<br />
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
        message={<span>The selected Standards could not be deleted for the following reasons:</span>}
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
    validationErrors: validationErrorsSelector(state),
    standardListFilters: standardsListFiltersModelSelector(state),
    selectedStandardIds: selectedStandardIdsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelDeleteSelectedStandards,
    deleteStandards,
    loadStandardsList,
  }
)(DeleteSelectedStandardsModal));
