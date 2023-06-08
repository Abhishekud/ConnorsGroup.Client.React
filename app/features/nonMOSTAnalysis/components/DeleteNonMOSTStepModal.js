import autoBind from 'react-autobind';
import {ConfirmDeleteModal} from '../../shared/components';
import {connect} from 'react-redux';
import {
  cancelDeleteNonMOSTStep,
  deleteNonMOSTSteps,
} from '../actions';
import {
  loadNonMOSTElementDetails,
} from '../../elements/actions';
import {
  deletingSelector,
  showSelector,
  modelSelector,
} from '../selectors/modals/delete';
import {
  parentTypeSelector,
} from '../selectors/containers/nonMOSTSteps';
import React, {Component} from 'react';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {parentTypes} from '../constants';

class DeleteNonMOSTStepModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {deleteNonMOSTSteps, loadNonMOSTElementDetails, model, router, params, parentType} = this.props;

    deleteNonMOSTSteps([model.get('id')])
      .then(() => {
        if (parentType === parentTypes.ELEMENT) loadNonMOSTElementDetails(params.id);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to delete the Timed Step.'));
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
        Please confirm that you want to delete <strong>{model.get('description')}</strong>.<br />
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
}

function mapStateToProps(state) {
  return {
    parentType: parentTypeSelector(state),
    show: showSelector(state),
    deleting: deletingSelector(state),
    model: modelSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelDeleteNonMOSTStep,
    deleteNonMOSTSteps,
    loadNonMOSTElementDetails,
  }
)(DeleteNonMOSTStepModal));
