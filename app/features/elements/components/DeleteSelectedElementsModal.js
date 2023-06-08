import autoBind from 'react-autobind';
import {
  ConfirmDeleteModal,
  AlertDeleteFailedModal,
} from '../../shared/components';
import {ValidationSummary} from '../../forms/components';
import {connect} from 'react-redux';
import {
  cancelDeleteSelectedElements,
  deleteElements,
  loadElementsList,
} from '../actions';
import {
  deletingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/deleteSelectedElements';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {handleApiError} from '../../shared/services';
import {modelSelector as elementsListFiltersModelSelector} from '../selectors/sidebars/filters';

class DeleteSelectedElementsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {deleteElements, model, router, loadElementsList, elementListFilters} = this.props;

    deleteElements(model.get('selectedElementIds'))
      .then(response => {
        loadElementsList(elementListFilters);
        return response;
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to delete the selected Elements.', 'Error'));
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
          Please confirm that you want to delete the selected Elements.<br />
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
        message={<span>The selected Elements could not be deleted for the following reasons:</span>}
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
    elementListFilters: elementsListFiltersModelSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelDeleteSelectedElements,
    deleteElements,
    loadElementsList,
  }
)(DeleteSelectedElementsModal));
