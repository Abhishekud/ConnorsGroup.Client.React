import autoBind from 'react-autobind';
import {
  ConfirmDeleteModal,
  AlertDeleteFailedModal,
} from '../../shared/components';
import {ValidationSummary} from '../../forms/components';
import {connect} from 'react-redux';
import {
  cancelDeleteOrgHierarchyLevel,
  deleteOrgHierarchyLevel,
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
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {LOCATION_PARENTS} from '../../selectListOptions/constants/selectListTypes';

class DeleteOrgHierarchyLevelModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {deleteOrgHierarchyLevel, model, router, loadSelectListOptions} = this.props;

    deleteOrgHierarchyLevel(model.get('id')).then(() => {
      loadSelectListOptions(LOCATION_PARENTS);
    }
    )
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to delete the Hierarchy Level.'));
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
          Are you sure you want to delete <strong>{model.get('name')}</strong>?<br />
          <br />
          <strong>WARNING:</strong> Deleting <strong>{model.get('name')}</strong> , will remove all hierarchy levels beneath it, all their Hierarchy Level Options and their references in Locations will also be removed.
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
    handleCancel: cancelDeleteOrgHierarchyLevel,
    deleteOrgHierarchyLevel,
    loadSelectListOptions,
  }
)(DeleteOrgHierarchyLevelModal));
