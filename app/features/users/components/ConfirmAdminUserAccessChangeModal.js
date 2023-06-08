import autoBind from 'react-autobind';
import {ConfirmModal} from '../../shared/components';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {modelSelector} from '../selectors/sidebars/edit';
import {userStatuses} from '../constants';
import {Map} from 'immutable';
import {adminRoleValueSelector} from '../../authentication/selectors/currentUser';

class ConfirmAdminUserAccessChangeModal extends Component {
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
      model,
      adminRoleValue,
    } = this.props;

    let message;
    if (!model.get('roleIds').includes(adminRoleValue)) {
      message = <><span>You are about to remove <strong> admin access. </strong>Are you sure you want to proceed?</span><br /></>;
    } else if (model.get('status') === userStatuses.DISABLED) {
      message = <><span>You are about to deactivate a user with <strong> admin access. </strong>Are you sure you want to proceed?</span><br /></>;
    }

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

ConfirmAdminUserAccessChangeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  processing: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  adminRoleValue: PropTypes.string.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
};

function mapStateToProps(state) {
  return {
    model: modelSelector(state),
    adminRoleValue: adminRoleValueSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {}
)(ConfirmAdminUserAccessChangeModal);
