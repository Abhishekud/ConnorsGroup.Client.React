import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {PropTypes} from 'prop-types';
import {
  ConfirmDeleteModal, AlertDeleteFailedModal,
} from '../../../shared/components';
import {ValidationSummary} from '../../../forms/components';
import {
  cancelDelete,
  deleteTaskGroup,
} from '../actions';
import {
  showSelector,
  modelSelector,
  validationErrorsSelector,
  deletingSelector,
} from '../selectors/modals/delete';
import {handleApiError} from '../../../shared/services';

class DeleteTaskGroupModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {deleteTaskGroup, model, router, reloadList} = this.props;
    deleteTaskGroup(model.get('id'))
      .then(() => {
        reloadList();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to delete the Task Group.', 'Error'));
  }

  handleCancel() {
    this.props.cancelDelete();
  }

  render() {
    const {
      show,
      model,
      validationErrors,
      deleting,
    } = this.props;
    let message;

    if (validationErrors.size === 0) {
      message = (
        <span>
          Please confirm that you want to delete <strong>{model.get('name')}</strong>.<br />
          <br />
          This action cannot be undone.
        </span>
      );

      return (
        <ConfirmDeleteModal
          show={show}
          message={message}
          deleting={deleting}
          onCancel={this.handleCancel}
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
        onOk={this.handleCancel} />
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    deleting: deletingSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    cancelDelete,
    deleteTaskGroup,
  }
)(DeleteTaskGroupModal));

DeleteTaskGroupModal.propTypes = {
  show: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  cancelDelete: PropTypes.func.isRequired,
  deleteTaskGroup: PropTypes.func.isRequired,
};
