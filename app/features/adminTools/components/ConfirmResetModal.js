import autoBind from 'react-autobind';
import {ConfirmModal} from '../../shared/components';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

export class ConfirmResetModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      show,
      processing,
      onConfirm,
      onCancel,
    } = this.props;

    const message = (
      <span>
        <span>WARNING: This will delete ALL data from the labor model. This cannot be undone.</span>
      </span>
    );

    return (
      <ConfirmModal
        show={show}
        message={message}
        processing={processing}
        onCancel={onCancel}
        onConfirm={onConfirm} />
    );
  }
}

ConfirmResetModal.propTypes = {
  show: PropTypes.bool.isRequired,
  processing: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default withRouter(
  connect()(ConfirmResetModal)
);
