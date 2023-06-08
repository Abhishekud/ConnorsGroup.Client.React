import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {PropTypes} from 'prop-types';
import {
  ConfirmDeleteModal,
  AlertDeleteFailedModal,
} from '../../../shared/components';
import {ValidationSummary} from '../../../forms/components';
import {cancelDelete, deleteTask} from '../actions';
import {
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/delete';
import {handleApiError} from '../../../shared/services';

class DeleteTaskModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {deleteTask, model, router, reloadTasks} = this.props;
    deleteTask(model.get('id'))
      .then(() => {
        reloadTasks();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to delete the Kronos Task.', 'Error'));
  }

  handleCancel() {
    this.props.cancelDelete();
  }

  render() {
    const {
      show,
      model,
      validationErrors,
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
          deleting={false}
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
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    cancelDelete,
    deleteTask,
  }
)(DeleteTaskModal));

DeleteTaskModal.propTypes = {
  show: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  cancelDelete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};
