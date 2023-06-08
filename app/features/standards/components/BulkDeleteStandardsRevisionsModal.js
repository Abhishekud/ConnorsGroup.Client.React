import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  cancelBulkDeleteStandardsRevisions,
  bulkDeleteStandardsRevisions,
  loadStandardsList,
} from '../actions';
import {
  deletingSelector,
  showSelector,
  validationErrorsSelector,
  modelSelector,
} from '../selectors/modals/bulkDeleteStandardsRevisions';
import {selectedStandardIdsSelector} from '../selectors/pages/list';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../shared/services';
import {pollBackgroundJobs} from '../../shared/actions';
import {modelSelector as standardsListFiltersModelSelector} from '../../standards/selectors/sidebars/filters';
import {BULK_DELETE_STANDARDS_REVISIONS, POLL_INTERVAL} from '../../shared/constants/backgroundJobs';
import DeleteStandardRevisionsMessageComponent from './DeleteStandardRevisionsMessageComponent';

class BulkDeleteStandardsRevisionsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {bulkDeleteStandardsRevisions, router, model, loadStandardsList, standardListFilters} = this.props;
    bulkDeleteStandardsRevisions(model)
      .then(response => {
        loadStandardsList(standardListFilters);
        if (response.value.data.backgrounded) {
          toastr.success('This will take some time. The revisions are being deleted in the background. An email will be sent with the status once completed.', 'Success');
          this.checkBackgroundJobs();
          this.pollTimer = setInterval(this.checkBackgroundJobs, POLL_INTERVAL);
        } else {
          toastr.success('Revision(s) for selected standard(s) has been deleted successfully.', 'Success');
        }
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to delete the selected Standards Revisions.', 'Error'));
  }

  checkBackgroundJobs() {
    const {pollBackgroundJobs} = this.props;
    pollBackgroundJobs([BULK_DELETE_STANDARDS_REVISIONS])
      .then(res => {
        const activeBulkDeleteBackgroundJob = res.value.data.activeJobs;
        if (!activeBulkDeleteBackgroundJob) {
          clearInterval(this.pollTimer);
          this.pollTimer = null;
        }
      });
  }

  render() {
    const {
      handleCancel,
      show,
      deleting,
      validationErrors,
    } = this.props;

    return (
      <DeleteStandardRevisionsMessageComponent show={show} deleting={deleting}
        validationErrors={validationErrors} handleCancel={handleCancel} onConfirm={this.handleConfirm} />
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
    model: modelSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelBulkDeleteStandardsRevisions,
    bulkDeleteStandardsRevisions,
    loadStandardsList,
    pollBackgroundJobs,
  }
)(BulkDeleteStandardsRevisionsModal));
