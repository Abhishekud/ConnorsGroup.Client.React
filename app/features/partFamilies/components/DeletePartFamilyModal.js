import autoBind from 'react-autobind';
import {
  ConfirmDeleteModal,
  AlertDeleteFailedModal,
} from '../../shared/components';
import {ValidationSummary} from '../../forms/components';
import {connect} from 'react-redux';
import {
  cancelDeletePartFamily,
  deletePartFamily,
  clearSelectedPartFamily,
} from '../actions';
import {
  deletingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/delete';
import {partFamilyNameSelector} from '../../shared/selectors/components/settings';
import React, {Component} from 'react';
import {PART_FAMILIES} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class DeletePartFamilyModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {deletePartFamily, model, clearSelectedPartFamily, loadSelectListOptions, router, partFamilyName} = this.props;

    deletePartFamily(model.get('id'))
      .then(() => {
        clearSelectedPartFamily();
        loadSelectListOptions(PART_FAMILIES);
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to delete the ${partFamilyName}`, 'Error'));
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
    partFamilyName: partFamilyNameSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelDeletePartFamily,
    deletePartFamily,
    clearSelectedPartFamily,
    loadSelectListOptions,
  }
)(DeletePartFamilyModal));
