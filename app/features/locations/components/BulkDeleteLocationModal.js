import autoBind from 'react-autobind';
import {
  ConfirmDeleteModal,
  AlertDeleteFailedModal,
} from '../../shared/components';
import {ValidationSummary} from '../../forms/components';
import {connect} from 'react-redux';
import {
  modelSelector as filterValuesSelector,
} from '../selectors/sidebars/filters';
import {
  cancelDeleteLocation,
  bulkDeleteLocation,
  closeLocationsListEditSidebar,
  clearSelectedLocation,
} from '../actions';
import {
  deletingSelector,
  showSelector,
  bulkModelSelector,
  validationErrorsSelector,
} from '../selectors/modals/delete';
import {
  locationNameSelector,
} from '../../shared/selectors/components/settings';
import React, {Component} from 'react';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class BulkDeleteLocationModal extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  handleConfirm() {
    const {bulkDeleteLocation, bulkModel, closeLocationsListEditSidebar, reloadLocationsList, locationName, router, filter, allLocationsSelected} = this.props;

    bulkDeleteLocation(bulkModel.get('locationIds'), filter, allLocationsSelected)
      .then(() => {
        closeLocationsListEditSidebar();
        reloadLocationsList();
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to delete the ${locationName}.`, 'Error'));
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
          Please confirm that you want to delete these locations.<br />
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
        message={<span><strong>Selected Ids</strong> could not be deleted for the following reasons:</span>}
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
    bulkModel: bulkModelSelector(state),
    validationErrors: validationErrorsSelector(state),
    locationName: locationNameSelector(state),
    filterValues: filterValuesSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelDeleteLocation,
    bulkDeleteLocation,
    clearSelectedLocation,
    closeLocationsListEditSidebar,
  }
)(BulkDeleteLocationModal));
