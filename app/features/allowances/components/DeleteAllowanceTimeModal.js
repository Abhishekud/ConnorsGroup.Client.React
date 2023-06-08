import autoBind from 'react-autobind';
import {
  ConfirmDeleteModal,
} from '../../shared/components';
import {connect} from 'react-redux';
import {
  cancelDeleteAllowanceTime,
  deleteAllowanceTime,
} from '../actions';
import {
  deletingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/deleteTime';
import React, {PureComponent} from 'react';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class DeleteAllowanceTimeModal extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {deleteAllowanceTime, model, router} = this.props;

    deleteAllowanceTime(model.get('id'))
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to delete the Allowance Time.', 'Error'));
  }

  render() {
    const {
      handleCancel,
      show,
      deleting,
      model,
    } = this.props;

    const message = (
      <span>
        Please confirm that you want to delete <strong>{model.get('name')}</strong>.<br /><br />This action cannot be undone.
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
    handleCancel: cancelDeleteAllowanceTime,
    deleteAllowanceTime,
  }
)(DeleteAllowanceTimeModal));
