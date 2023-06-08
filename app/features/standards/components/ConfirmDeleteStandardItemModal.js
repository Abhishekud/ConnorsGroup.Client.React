import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {handleApiError} from '../../shared/services';
import {ConfirmDeleteModal} from '../../shared/components';
import {
  deleteStandardElements,
  deleteStandardElementGroup,
  cancelDeleteStandardItem,
  loadStandardDetails,
} from '../actions';
import {
  showSelector,
  processingSelector,
  standardIdSelector,
  modelSelector,
} from '../selectors/modals/deleteStandardItem';
import {
  STANDARD_ELEMENT_GROUP,
} from '../constants/standardItemTypes';
import {withRouter} from 'react-router';

class ConfirmDeleteStandardItemModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {standardId, model, router} = this.props;

    this.deleteItem(standardId, model)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to delete the Standard Item.'));
  }

  deleteItem(standardId, model) {
    return model.get('type') === STANDARD_ELEMENT_GROUP
      ? this.props.deleteStandardElementGroup(standardId, model.get('id'))
        .then(() => this.props.loadStandardDetails(standardId))
      : this.props.deleteStandardElements(standardId, [model.get('id')])
        .then(() => this.props.loadStandardDetails(standardId));
  }

  handleCancel() {
    this.props.cancelDeleteStandardItem();
  }

  render() {
    const {show, processing, model} = this.props;

    const message =
      <span>
        Please confirm that you want to delete <strong>{model.get('name')}</strong>.
        {model.get('type') === STANDARD_ELEMENT_GROUP
          ? <span><br />All standard elements in this group will be deleted as well.</span>
          : null}
        <br /><br />This action cannot be undone.
      </span>;

    return (
      <ConfirmDeleteModal
        show={show}
        message={message}
        deleting={processing}
        onCancel={this.handleCancel}
        onConfirm={this.handleConfirm} />
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    processing: processingSelector(state),
    standardId: standardIdSelector(state),
    model: modelSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    deleteStandardElements,
    deleteStandardElementGroup,
    cancelDeleteStandardItem,
    loadStandardDetails,
  }
)(ConfirmDeleteStandardItemModal));
