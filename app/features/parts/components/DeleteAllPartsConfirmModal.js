import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {
  ConfirmDeleteModal,
  AlertDeleteFailedModal,
} from '../../shared/components';
import {ValidationSummary} from '../../forms/components';
import {connect} from 'react-redux';
import {
  cancelDeleteAllParts,
  deleteAllParts,
  loadPartsPage,
  loadPartsList,
} from '../actions';
import {
  deletingSelector,
  showSelector,
  validationErrorsSelector,
} from '../selectors/modals/deleteAllConfirm';
import {
  partNameSelector,
  partFamilyNameSelector,
} from '../../shared/selectors/components/settings';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {PART_FAMILIES} from '../../selectListOptions/constants/selectListTypes';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import pluralize from 'pluralize';

class DeleteAllPartsConfirmModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {deleteAllParts, loadPartsPage, loadPartsList, router, partName, partFamilies} = this.props;

    deleteAllParts()
      .then(() => {
        loadPartsPage();

        const partFamilyId = partFamilies.length ? partFamilies[0].value : 0;
        loadPartsList(partFamilyId)
          .catch(error => handleApiError(error, router, `An error occurred while attempting to load the ${pluralize(partName)} list.`, 'Error'));
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to delete all ${pluralize(partName)}`, 'Error'));
  }

  render() {
    const {
      handleCancel,
      show,
      deleting,
      validationErrors,
      partName,
      partFamilyName,
    } = this.props;

    let message;

    if (validationErrors.size === 0) {
      message = (
        <span>
          Please confirm that you want to delete ALL {pluralize(partName)} for ALL {pluralize(partFamilyName)}.<br />
          <br />
          <strong>NOTE: ALL {pluralize(partName)} for ALL {pluralize(partFamilyName)} will be deleted.</strong><br />
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
        message={<span>All {pluralize(partName)} could not be deleted for the following reasons:</span>}
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
  const partFamiliesSelector = makeSelectListOptionsArraySelector(PART_FAMILIES);
  return {
    show: showSelector(state),
    deleting: deletingSelector(state),
    validationErrors: validationErrorsSelector(state),
    partName: partNameSelector(state),
    partFamilyName: partFamilyNameSelector(state),
    partFamilies: partFamiliesSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelDeleteAllParts,
    deleteAllParts,
    loadPartsPage,
    loadPartsList,
  }
)(DeleteAllPartsConfirmModal));
