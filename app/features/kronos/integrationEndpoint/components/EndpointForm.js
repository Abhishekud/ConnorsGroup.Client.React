import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {Checkbox} from 'react-bootstrap';
import {
  TextInput,
  PasswordInput,
  withAutoFocusOnEdit,
  HiddenSubmitButton,
  Select,
} from '../../../forms/components';

class EndpointForm extends PureComponent {
  render() {
    const {
      primaryInputRef,
      onFieldChange,
      onCheckboxChange,
      kronosEndpointStatuses,
      model,
      onSubmit,
      formValidationErrors,
      create,
      disabled,
    } = this.props;
    return (
      <form onSubmit={onSubmit} autoComplete="off">
        <fieldset disabled={disabled}>
          <TextInput id="name" inputRef={primaryInputRef} label="Name" onChange={onFieldChange} value={model.get('name')} formValidationErrors={formValidationErrors} />
          <TextInput id="url" label="Url" onChange={onFieldChange} value={model.get('url')} formValidationErrors={formValidationErrors} />
          <TextInput id="userName" label="User Name" onChange={onFieldChange} value={model.get('userName')} formValidationErrors={formValidationErrors} />
          {!create && <Checkbox id="updatePassword" checked={model.get('updatePassword') || false} onChange={onCheckboxChange}><strong>Update Password</strong></Checkbox>}
          <PasswordInput id="password" label="Password" onChange={onFieldChange} value={model.get('password')} disabled={!create && !model.get('updatePassword')} formValidationErrors={formValidationErrors} data-lpignore="true" />
          <Select id="status" label="Status" value={model.get('status')} options={kronosEndpointStatuses} onChange={onFieldChange} formValidationErrors={formValidationErrors} />
          <HiddenSubmitButton />
        </fieldset>
      </form>
    );
  }
}

EndpointForm.propTypes = {
  model: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  primaryInputRef: PropTypes.func.isRequired,
  formValidationErrors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  kronosEndpointStatuses: PropTypes.array,
  disabled: PropTypes.bool,
};

export default withAutoFocusOnEdit()(EndpointForm);
