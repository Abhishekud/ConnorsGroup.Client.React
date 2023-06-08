import autoBind from 'react-autobind';
import {userStatuses} from '../constants';
import {
  HiddenSubmitButton,
  Select,
  TextInput,
  withAutoFocusOnEdit,
  MultiSelect,
} from '../../forms/components';
import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

const STATUS_OPTIONS = userStatuses.DISPLAYABLE.map(status => ({value: status, label: status})).valueSeq().toArray();

const statusOptions = value => {
  const x = Object.assign([], STATUS_OPTIONS);
  if (value !== userStatuses.LOG_IN_LOCKED) x.splice(0, 1); // MUTATED STATE
  return x;
};

class CreateEditUserForm extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {
      currentUserEmail,
      model, validationErrors,
      saving, roles,
      onFieldChange, onSubmit,
      primaryInputRef,
      disabled,
      prepareValuesToShow,
    } = this.props;

    const editingCurrentUser = currentUserEmail && model.get('email') === currentUserEmail;

    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled || saving}>
          <TextInput id="email" label="Email" readOnly={editingCurrentUser}
            maxLength={256} value={model.get('email')}
            onChange={onFieldChange}
            inputRef={primaryInputRef}
            formValidationErrors={validationErrors} />
          <Select id="status" label="Status"
            value={model.get('status') ?? userStatuses.ENABLED} options={statusOptions(model.get('status'))}
            onChange={onFieldChange}
            formValidationErrors={validationErrors} />
          <MultiSelect
            id="roleIds"
            label="Roles"
            disabled={disabled || saving}
            options={roles}
            onChange={onFieldChange}
            textField="label"
            dataItemKey="value"
            autoClose={false}
            value={prepareValuesToShow}
            formValidationErrors={validationErrors} />
          <HiddenSubmitButton disabled={disabled} />
        </fieldset>
      </form>
    );
  }
}

CreateEditUserForm.propTypes = {
  currentUserEmail: PropTypes.string,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  roles: PropTypes.array.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
};

export default withAutoFocusOnEdit()(CreateEditUserForm);
