import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import CreateEditAllowanceForm from './CreateEditAllowanceForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {
  cancelCreateAllowance,
  createAllowance,
  setCreateAllowanceModelProperty} from '../actions';
import React, {PureComponent} from 'react';
import {
  ALLOWANCES,
  ALLOWANCE_RESTS,
} from '../../selectListOptions/constants/selectListTypes';
import {makeSelectListOptionsArrayWithBlankSelector} from '../../selectListOptions/selectors';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {handleApiError, toastr} from '../../shared/services';
import {withRouter} from 'react-router';

class CreateAllowanceModal extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, type, maxLength} = event.target;
    let value = event.target.value;

    if (type === 'number') {
      value = value ? Number(value) : null;
    }

    let message = '';
    if (maxLength && maxLength <= value.length) {
      message = 'You have exceeded the maximum number of characters allowed';
    }

    this.props.setCreateAllowanceModelProperty(name, value, message);
  }

  handleSave(event) {
    event.preventDefault();

    const {createAllowance, loadSelectListOptions, model, router} = this.props;

    createAllowance(model)
      .then(response => {
        router.push(`allowances/${response.action.payload.data}`);
        loadSelectListOptions(ALLOWANCES);
      })
      .catch(error => {
        const {status} = error.response || {};
        if (status === 400) {
          toastr.error(this.props.validationErrors.get('_').join('\n'));
          return;
        }

        handleApiError(error, router, 'An error occurred while attempting to add this Allowance.', 'Error');
        if (!error.response.status) throw error;
      });
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors, allowanceRestTimes} = this.props;

    const form =
      <CreateEditAllowanceForm
        editing
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        allowanceRestTimes={allowanceRestTimes}
        model={model} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New Allowance"
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

function mapStateToProps(state) {
  const allowanceRestTimesSelector = makeSelectListOptionsArrayWithBlankSelector(ALLOWANCE_RESTS);

  return {
    saving: savingSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    allowanceRestTimes: allowanceRestTimesSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreateAllowance,
    setCreateAllowanceModelProperty,
    createAllowance,
    loadSelectListOptions,
  }
)(CreateAllowanceModal));
