import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  cancelDeleteVolumeDriverValueSet,
  deleteVolumeDriverValueSet,
  clearSelectedVolumeDriverValueSet,
} from '../actions';
import {
  deletingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/delete';
import React, {Component} from 'react';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import DeleteValidationMessageComponent from '../../shared/components/DeleteValidationMessageComponent';

class DeleteVolumeDriverValueSetModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleConfirm() {
    const {deleteVolumeDriverValueSet, model, clearSelectedVolumeDriverValueSet, router} = this.props;

    deleteVolumeDriverValueSet(model.get('id'))
      .then(() => {
        clearSelectedVolumeDriverValueSet();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to delete the volume driver value set.', 'Error'));
  }

  render() {
    const {validationErrors, model, handleCancel, show, deleting} = this.props;
    return (<DeleteValidationMessageComponent validationErrors={validationErrors} model={model} handleCancel={handleCancel} onConfirm={this.handleConfirm} show={show} deleting={deleting} />);
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    deleting: deletingSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelDeleteVolumeDriverValueSet,
    deleteVolumeDriverValueSet,
    clearSelectedVolumeDriverValueSet,
  }
)(DeleteVolumeDriverValueSetModal));
