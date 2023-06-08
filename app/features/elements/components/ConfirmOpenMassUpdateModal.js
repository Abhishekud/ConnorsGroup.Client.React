import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {ContinueCancelModal} from '../../shared/components';
import {
  hideConfirmOpenMassUpdate,
} from '../actions';
import {
  toggleShowMassUpdate,
} from '../../elementMassUpdate/actions';
import {
  showSelector,
} from '../selectors/modals/confirmOpenMassUpdate';

class ConfirmOpenMassUpdateModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleContinue() {
    const {elementType, hideConfirmOpenMassUpdate, toggleShowMassUpdate} = this.props;

    hideConfirmOpenMassUpdate();
    toggleShowMassUpdate(elementType);
  }

  render() {
    const {show, handleCancel} = this.props;
    const message =
      <span>
        The selected Element is used in production standards and is unable to be updated
        to <strong>Archive</strong> status until the element is no longer used.<br /><br />
        Click Continue to open the Mass Update tool to remove the selected Element.<br /><br />
        Click Cancel to return to editing this element.
      </span>;

    return (
      <ContinueCancelModal
        show={show}
        message={message}
        onCancel={handleCancel}
        onContinue={this.handleContinue} />
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    handleCancel: hideConfirmOpenMassUpdate,
    hideConfirmOpenMassUpdate,
    toggleShowMassUpdate,
  }
)(ConfirmOpenMassUpdateModal);
