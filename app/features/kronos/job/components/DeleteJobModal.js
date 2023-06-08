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
import {cancelDelete, deleteJob} from '../actions';
import {
  showSelector,
  modelSelector,
  deletingSelector,
  validationErrorsSelector,
} from '../selectors/modals/delete';

class DeleteJobModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {deleteJob, model} = this.props;
    deleteJob(model.get('id'));
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
    deleting: deletingSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    cancelDelete,
    deleteJob,
  }
)(DeleteJobModal));

DeleteJobModal.propTypes = {
  show: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  cancelDelete: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
};
