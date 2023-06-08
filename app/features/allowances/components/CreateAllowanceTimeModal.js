import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import CreateEditAllowanceTimeForm from './CreateEditAllowanceTimeForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/createTime';
import {
  cancelCreateAllowanceTime,
  createAllowanceTime,
  setCreateAllowanceTimeModelProperty,
} from '../actions';
import React, {PureComponent} from 'react';
import {handleApiError, toastr} from '../../shared/services';
import {withRouter} from 'react-router';
import {displayName} from '../constants/allowanceTimeTypes';

class CreateAllowanceTimeModal extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateAllowanceTimeModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {createAllowanceTime, model, router} = this.props;

    createAllowanceTime(model)
      .catch(error => {
        const {status} = error.response || {};
        if (status === 400) {
          toastr.error(this.props.validationErrors.get('_').join('\n'));
          return;
        }

        handleApiError(error, router, 'An error occurred while attempting to add this Allowance Time.', 'Error');
      });
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors} = this.props;

    const form =
      <CreateEditAllowanceTimeForm
        editing
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title={`New ${displayName(model.get('type'))}`}
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
    handleCancel: cancelCreateAllowanceTime,
    setCreateAllowanceTimeModelProperty,
    createAllowanceTime,
  }
)(CreateAllowanceTimeModal));
