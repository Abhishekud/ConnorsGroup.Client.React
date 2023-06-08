import autoBind from 'react-autobind';
import {
  ConfirmDeleteModal,
  AlertDeleteFailedModal,
} from '../../shared/components';
import {ValidationSummary} from '../../forms/components';
import {connect} from 'react-redux';
import {
  cancelDeleteRole,
  deleteRole,
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
import pluralize from 'pluralize';
import {Alert} from 'react-bootstrap';

class DeleteRoleModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {deleteRole, model, router} = this.props;

    deleteRole(model.get('id'))
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to delete the Role.', 'Error'));
  }

  render() {
    const {
      handleCancel,
      show,
      deleting,
      model,
      validationErrors,
    } = this.props;

    if (model.get('userCount') > 0) {
      const message = (
        <Alert className="validation-summary" bsStyle="danger">
          <h5>
            <span>
              The <strong>{model.get('name')}</strong> role cannot be deleted because
              there {pluralize('is', model.get('userCount'))} currently {model.get('userCount')} {pluralize('user', model.get('userCount'))} with
              this role assignment.  This role must be unassigned from all users in order to be deleted.
            </span>
          </h5>
        </Alert>
      );
      return (
        <AlertDeleteFailedModal
          show={show}
          message={message}
          okButtonStyle="default"
          onOk={handleCancel} />
      );
    }

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
    handleCancel: cancelDeleteRole,
    deleteRole,
  }
)(DeleteRoleModal));
