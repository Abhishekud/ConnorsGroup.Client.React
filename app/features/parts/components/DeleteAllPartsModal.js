import autoBind from 'react-autobind';
import {
  ConfirmDeleteModal,
} from '../../shared/components';
import {connect} from 'react-redux';
import {
  cancelDeleteAllParts,
  showDeleteAllPartsConfirm,
} from '../actions';
import {
  showSelector,
} from '../selectors/modals/deleteAll';
import {
  partNameSelector,
  partFamilyNameSelector,
} from '../../shared/selectors/components/settings';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import pluralize from 'pluralize';

class DeleteAllPartsModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      handleCancel,
      show,
      partName,
      partFamilyName,
      showDeleteAllPartsConfirm,
    } = this.props;
    const message = (
      <span>
        Are you sure that you want to delete ALL {pluralize(partName)} for ALL {pluralize(partFamilyName)}.<br />
        <br />
        This action cannot be undone.
      </span>
    );
    return (
      <ConfirmDeleteModal
        show={show}
        message={message}
        onCancel={handleCancel}
        deleting={false}
        onConfirm={showDeleteAllPartsConfirm} />
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    partName: partNameSelector(state),
    partFamilyName: partFamilyNameSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelDeleteAllParts,
    showDeleteAllPartsConfirm,
  }
)(DeleteAllPartsModal));
