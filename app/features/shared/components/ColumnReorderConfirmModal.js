import autoBind from 'react-autobind';
import {ConfirmModal} from '.';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

export class ColumnReorderConfirmModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      show,
      processing,
      column,
      onConfirm,
      onCancel,
    } = this.props;

    const message = (
      <span>
        {column?.get('locked')
          ? (<span>You are trying to move <strong>{column?.get('title')}</strong> into a unlocked area,
            this column is locked, would you like to unlock it?</span>)
          : (<span>You are trying to move <strong>{column?.get('title')}</strong> into a locked area, this column is unlocked,
            would you like to lock it?</span>)}
        <br />
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

ColumnReorderConfirmModal.propTypes = {
  show: PropTypes.bool.isRequired,
  processing: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default withRouter(connect(

)(ColumnReorderConfirmModal));
