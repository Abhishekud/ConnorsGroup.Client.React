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
import {cancelDelete, deleteLaborPeriod} from '../actions';
import {showSelector, modelSelector, validationErrorsSelector} from '../selectors/modals/delete';
import {handleApiError} from '../../../shared/services';

class DeleteLaborPeriodModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {deleteLaborPeriod, model, router} = this.props;
    deleteLaborPeriod(model.get('id'))
      .then(
        () => router.push('/kronos/laborperiods'),
        error => handleApiError(error, router, 'An error occurred while attempting to delete the Labor Period.', 'Error'));
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
    deleteLaborPeriod,
  }
)(DeleteLaborPeriodModal));

DeleteLaborPeriodModal.propTypes = {
  show: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  cancelDelete: PropTypes.func.isRequired,
  deleteLaborPeriod: PropTypes.func.isRequired,
};
