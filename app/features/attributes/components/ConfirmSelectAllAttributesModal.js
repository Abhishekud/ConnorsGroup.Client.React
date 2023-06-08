import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {ConfirmModal} from '../../shared/components';
import {
  toggleConfirmSelectAllAttributes,
} from '../actions';
import {
  showSelector,
  modelSelector,
} from '../selectors/modals/confirmSelectAllAttributes';

class ConfirmSelectAllAttributesModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {onConfirm, model, handleToggle} = this.props;
    onConfirm(model.get('columnId'));
    handleToggle();
  }

  render() {
    const {show, model, handleToggle} = this.props;

    const message = model.get('appliedCheck')
      ? <span>This will deselect all records for <b>{model.get('columnName')}</b> attribute.<br /><br /> Are you sure you want to proceed? </span>
      : <span>This will select all records for <b>{model.get('columnName')}</b> attribute.<br /><br /> Are you sure you want to proceed? </span>;

    return (
      <ConfirmModal
        show={show}
        message={message}
        onCancel={handleToggle}
        processing={false}
        onConfirm={this.handleConfirm} />
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    model: modelSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    handleToggle: toggleConfirmSelectAllAttributes,
  }
)(ConfirmSelectAllAttributesModal);
