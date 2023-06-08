import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import CreateEditAllowanceRestForm from './CreateEditAllowanceRestForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {
  cancelCreateAllowanceRest,
  createAllowanceRest,
  selectAllowanceRest,
  setCreateAllowanceRestModelProperty,
} from '../actions';
import {fromJS} from 'immutable';
import React, {Component} from 'react';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {ALLOWANCE_RESTS} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';

class CreateAllowanceRestModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value, maxLength} = event.target;
    let message = '';
    if (maxLength && maxLength <= value.length) {
      message = 'You have exceeded the maximum number of characters allowed';
    }
    this.props.setCreateAllowanceRestModelProperty(name, value, message);
  }

  handleSave(event) {
    event.preventDefault();

    const {createAllowanceRest, loadSelectListOptions, selectAllowanceRest, model, router} = this.props;

    createAllowanceRest(model)
      .then(response => {
        selectAllowanceRest(fromJS(response.action.payload.data));
        loadSelectListOptions(ALLOWANCE_RESTS);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this AllowanceRest.', 'Error'));
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors} = this.props;

    const form =
      <CreateEditAllowanceRestForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New Rest"
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

function mapStateToProps(state) {
  return {
    saving: savingSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreateAllowanceRest,
    setCreateAllowanceRestModelProperty,
    createAllowanceRest,
    selectAllowanceRest,
    loadSelectListOptions,
  }
)(CreateAllowanceRestModal));
