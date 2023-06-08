import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
  ConfirmDeleteModal,
} from '../../../shared/components';
import {cancelDelete, deleteEndpoint, loadEndpointsList} from '../actions';
import {showSelector, modelSelector, deletingSelector} from '../selectors/modals/delete';

class DeleteClassificationModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {deleteEndpoint, model} = this.props;
    deleteEndpoint(model)
      .then(() => this.props.loadEndpointsList);
  }

  handleCancel() {
    this.props.cancelDelete();
  }

  render() {
    const {
      show,
      model,
      deleting,
    } = this.props;

    const message = (
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
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    model: modelSelector(state),
    deleting: deletingSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    cancelDelete,
    deleteEndpoint,
    loadEndpointsList,
  }
)(DeleteClassificationModal));
