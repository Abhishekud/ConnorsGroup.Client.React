import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {CreateEditModal} from '../../shared/components';
import {handleApiError, toastr} from '../../shared/services';
import {
  makeSelectListOptionsArrayWithBlankSelector,
} from '../../selectListOptions/selectors';
import {
  getFilingFieldsAsSelectListOptions,
  loadSelectListOptions,
} from '../../selectListOptions/actions';
import {
  cancelDuplicateAllowance,
  setDuplicateAllowanceModelProperty,
  duplicateAllowance,
  loadAllowance,
} from '../actions';
import {
  ALLOWANCES,
  ALLOWANCE_RESTS,
} from '../../selectListOptions/constants/selectListTypes';
import {
  savingSelector,
  showSelector,
  modelSelector,
  allowanceIdSelector,
  validationErrorsSelector,
} from '../selectors/modals/duplicate';
import CreateEditAllowanceForm from './CreateEditAllowanceForm';

class DuplicateAllowanceModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    this.props.getFilingFieldsAsSelectListOptions();
  }

  handleFieldChange(event) {
    const {name, value, maxLength} = event.target;

    let message = '';
    if (maxLength && maxLength <= value.length) {
      message = 'You have exceeded the maximum number of characters allowed';
    }
    this.props.setDuplicateAllowanceModelProperty(name, value, message);
  }

  handleSave() {
    const {duplicateAllowance, model, allowanceId, router, loadAllowance, loadSelectListOptions} = this.props;

    duplicateAllowance(allowanceId, model)
      .then(result => {
        router.push(`/allowances/${result.value.data}`);
        loadAllowance(result.value.data);
        loadSelectListOptions(ALLOWANCES);
      })
      .catch(error => {
        const {status} = error.response || {};
        if (status === 400) {
          toastr.error(this.props.validationErrors.get('_').join('\n'));
          return;
        }

        handleApiError(error, router, 'An error occurred while attempting to update the Allowance.');
      });
  }

  render() {
    const {
      handleCancel,
      saving,
      show,
      model,
      validationErrors,
      allowanceRestTimes,
    } = this.props;

    const form =
      <CreateEditAllowanceForm
        model={model}
        allowanceRestTimes={allowanceRestTimes}
        validationErrors={validationErrors}
        editing
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="Duplicate Allowance"
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
    allowanceId: allowanceIdSelector(state),
    validationErrors: validationErrorsSelector(state),
    allowanceRestTimes: allowanceRestTimesSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelDuplicateAllowance,
    setDuplicateAllowanceModelProperty,
    getFilingFieldsAsSelectListOptions,
    duplicateAllowance,
    loadAllowance,
    loadSelectListOptions,
  }
)(DuplicateAllowanceModal));
