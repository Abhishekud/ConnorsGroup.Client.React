import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {ConfirmModal} from '../../shared/components';
import {
  cancelUpdateStandard,
} from '../actions';
import {
  showSelector,
  processingSelector,
  modelSelector,
  standardIdSelector,
  oldStatusSelector,
  performSaveSelector,
} from '../selectors/modals/updateStandard';
import {displayName} from '../constants/standardStatuses';

class ConfirmUpdateStandardModal extends Component {
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

    const name = model.get('name');
    const status = displayName(model.get('status'));
    const oldStatus = displayName(this.props.oldStatus);

    const message =
      <span>
        Standard <strong>{name}</strong> contains one or more Elements
        below <strong>{status}</strong> status.<br /><br />
        Click Confirm to convert these Elements to <strong>{status}</strong>.<br /><br />
        Click Cancel to maintain Element statuses and keep
        Standard <strong>{name}</strong> as <strong>{oldStatus}</strong>.
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
    standardId: standardIdSelector(state),
    oldStatus: oldStatusSelector(state),
    performSave: performSaveSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    handleCancel: cancelUpdateStandard,
  }
)(ConfirmUpdateStandardModal);
