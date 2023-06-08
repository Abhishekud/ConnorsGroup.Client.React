import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {ConfirmModal} from '../../shared/components';
import {
  cancelUpdateElements,
} from '../actions';
import {
  showSelector,
  processingSelector,
  modelSelector,
  performSaveSelector,
} from '../selectors/modals/updateElements';
import {displayName} from '../../standards/constants/standardStatuses';

class ConfirmUpdateElementsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {performSave} = this.props;

    performSave();
  }

  render() {
    const {show, processing, model, handleCancel} = this.props;
    const status = displayName(model.get('status'));

    const message =
      <span>
        The selected Elements that are
        below <strong>{status}</strong> status will be updated to the new status.<br /><br />
        Click Confirm to convert these Elements to <strong>{status}</strong>.<br /><br />
        Click Cancel to prevent updates and maintain the existing status.
      </span>;

    return (
      <ConfirmModal
        show={show}
        message={message}
        processing={processing}
        onCancel={handleCancel}
        onConfirm={this.handleConfirm} />
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    processing: processingSelector(state),
    model: modelSelector(state),
    performSave: performSaveSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    handleCancel: cancelUpdateElements,
  }
)(ConfirmUpdateElementsModal);
