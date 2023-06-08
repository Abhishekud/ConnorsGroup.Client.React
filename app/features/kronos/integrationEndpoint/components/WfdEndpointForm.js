import React from 'react';
import {PropTypes} from 'prop-types';
import {Checkbox} from 'react-bootstrap';
import {
  TextInput,
  PasswordInput,
  withAutoFocusOnEdit,
  HiddenSubmitButton,
  Select,
} from '../../../forms/components';

const WfdEndpointForm = ({
  primaryInputRef,
  onFieldChange,
  onCheckboxChange,
  kronosEndpointStatuses,
  model,
  formValidationErrors,
  create,
  disabled,
}) =>
  (<form autoComplete="off">
    <fieldset disabled={disabled}>
      <TextInput id="name" inputRef={primaryInputRef} label="Name" onChange={onFieldChange} value={model.get('name')} formValidationErrors={formValidationErrors} />
      <TextInput id="url" label="Url" onChange={onFieldChange} value={model.get('url')} formValidationErrors={formValidationErrors} />
      <TextInput id="userName" label="User Name" onChange={onFieldChange} value={model.get('userName')} formValidationErrors={formValidationErrors} />
      {!create && <Checkbox id="updatePassword" checked={model.get('updatePassword') || false} onChange={onCheckboxChange}><strong>Update Password</strong></Checkbox>}
      <PasswordInput id="password" label="Password" onChange={onFieldChange} value={model.get('password')} disabled={!create && !model.get('updatePassword')} formValidationErrors={formValidationErrors} data-lpignore="true" />
      <Select id="status" label="Status" value={model.get('status')} options={kronosEndpointStatuses} onChange={onFieldChange} formValidationErrors={formValidationErrors} />
      {!create && <Checkbox id="updateWfdAppKey" checked={model.get('updateWfdAppKey') || false} onChange={onCheckboxChange}><strong>Update WFD App Key</strong></Checkbox>}
      <PasswordInput id="wfdAppKey" label="WFD App Key" onChange={onFieldChange} value={model.get('wfdAppKey')} disabled={!create && !model.get('updateWfdAppKey')} formValidationErrors={formValidationErrors} data-lpignore="true" />
      {!create && <Checkbox id="updateWfdClientId" checked={model.get('updateWfdClientId') || false} onChange={onCheckboxChange}><strong>Update WFD Client Id</strong></Checkbox>}
      <TextInput id="wfdClientId" label="WFD Client ID" onChange={onFieldChange} value={model.get('wfdClientId')} disabled={!create && !model.get('updateWfdClientId')} formValidationErrors={formValidationErrors} />
      {!create && <Checkbox id="updateWfdClientSecret" checked={model.get('updateWfdClientSecret') || false} onChange={onCheckboxChange}><strong>Update WFD Client Secret</strong></Checkbox>}
      <PasswordInput id="wfdClientSecret" label="WFD Client Secret" onChange={onFieldChange} value={model.get('wfdClientSecret')} disabled={!create && !model.get('updateWfdClientSecret')} formValidationErrors={formValidationErrors} data-lpignore="true" />
      <HiddenSubmitButton />
    </fieldset>
  </form>);

WfdEndpointForm.propTypes = {
  model: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func,
  primaryInputRef: PropTypes.func.isRequired,
  formValidationErrors: PropTypes.object,
  kronosEndpointStatuses: PropTypes.array,
  disabled: PropTypes.bool,
};

export default withAutoFocusOnEdit()(WfdEndpointForm);
