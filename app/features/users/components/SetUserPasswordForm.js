import {HiddenSubmitButton, PasswordInput, TextInput} from '../../forms/components';
import {Map} from 'immutable';
import React from 'react';
import {PropTypes} from 'prop-types';

export default function SetUserPasswordForm({model, onFieldChange, onSubmit, saving, validationErrors}) {
  return (
    <form method="POST" onSubmit={onSubmit}>
      <fieldset disabled={saving}>
        <TextInput id="email" label="Email" value={model.get('email')} readOnly />
        <PasswordInput id="password" label="Password" maxLength={50} onChange={onFieldChange}
          value={model.get('password')} autoFocus
          formValidationErrors={validationErrors} />
        <PasswordInput id="confirmPassword" label="Confirm Password" maxLength={50} onChange={onFieldChange}
          value={model.get('confirmPassword')}
          formValidationErrors={validationErrors} />
        <HiddenSubmitButton />
      </fieldset>
    </form>
  );
}

SetUserPasswordForm.propTypes = {
  model: PropTypes.instanceOf(Map).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
};
